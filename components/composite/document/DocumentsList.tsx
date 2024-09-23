import React, { useEffect, useState } from 'react';
import { Button, Input, List, Select, message } from 'antd';
import { LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDocument } from '@/context/DocumentContext';
import { routes } from '@/constant/routes';
import { getAllTags } from '@/services/editorTag';
import { getAllCategories } from '@/services/editorCategory';
import { Document } from '@/types/Document';

const { Option } = Select;

interface DocumentProps {
  documentsData: Document[];
}

const filterOptions = [
  { label: 'Chọn', value: 'Chọn' },
  { label: 'Lọc theo thể loại', value: 'category' },
  { label: 'Lọc theo tag', value: 'tag' },
];

const DocumentsList: React.FC<DocumentProps> = ({documentsData}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Chọn');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const { setSelectedDocument } = useDocument();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        setCategories(allCategories.map((tag: any) => tag.name).sort());
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();
        setTags(allTags.map((tag: any) => tag.name).sort());
      } catch (error) {
        console.error('Failed to fetch tags', error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setSelectedValue('');
    setCurrentPage(1);
  };

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setCurrentPage(1); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDocumentClick = (item: Document) => {
    setSelectedDocument(item);
    router.push(routes.documentDetail);
  };

  // Hàm xử lý sự kiện khi người dùng nhấn nút like
  const handleLike = (title: string) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.title === title
          ? {
              ...doc,
              likes: doc.liked ? doc.likes - 1 : doc.likes + 1, // Cập nhật số lượt thích
              liked: !doc.liked, // Đảo ngược trạng thái liked
            }
          : doc
      )
    );
  };

  const filteredDocuments = documentsData.filter((doc: Document) => {
    const matchesSearchQuery =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearchQuery) return false;

    if (selectedFilter === 'Chọn') {
      return true;
    }
    if (selectedValue === 'Tất cả' || !selectedValue) {
      return true;
    }
    if (selectedFilter === 'category') {
      return doc.category === selectedValue;
    }
    if (selectedFilter === 'tag') {
      return doc.tags.includes(selectedValue);
    }
    return false;
  });

  return (
    <div className="p-6 container">
      <div className='grid grid-flow-col justify-between mb-10'>
        <div>
          <span className='mr-3 text-sm font-sans'>Chọn tiêu chí lọc:</span>
          <Select
            defaultValue="Chọn"
            style={{ width: 200 }}
            onChange={handleFilterChange}
          >
            {filterOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
        {selectedFilter !== 'Chọn' && (
          <Select
            defaultValue={selectedValue || 'Tất cả'}
            style={{ width: 200 }}
            onChange={handleValueChange}
          >
            {selectedFilter === 'category'
              ? categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))
              : tags.map((tag) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
          </Select>
        )}
        <Input.Search 
          placeholder='Tìm kiếm tài liệu' 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          current: currentPage,
          onChange: (page) => {
            setCurrentPage(page);
          },
          pageSize: 5,
        }}
        dataSource={filteredDocuments}
        renderItem={(item: Document) => (
          <List.Item key={item.title} className='hover:bg-slate-100' style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', right: 10, top: 10 }}>
              {/* Nút like với icon */}
              <Button
                type="text"
                onClick={() => handleLike(item.title)}
                icon={item.liked ? <LikeTwoTone style={{ fontSize: '20px' }} /> : <LikeOutlined style={{ fontSize: '20px', color:'#91ccfa' }} />}
              />
              <span>{item.likes}</span> {/* Hiển thị số lượt like */}
            </div>
            <List.Item.Meta
              title={<a>{item.title}</a>}
              description={`Ngày đăng: ${new Date(item.createdAt).toLocaleDateString()} | Lượt xem: ${item.views} | Lượt tải: ${item.downloadCount}`}
            />
            <p>{item.description}</p>
            <Button type='primary' shape='round' onClick={() => handleDocumentClick(item)} className='my-4'>Xem chi tiết</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DocumentsList;
