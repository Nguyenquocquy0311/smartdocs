import React from 'react';
import { FileOutlined, EyeOutlined, DownloadOutlined,FileWordOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const NewDocuments = () => {
  const documents = [
    {
      title: 'Nghiên cứu xây dựng dự án sản xuất giấy',
      typeFile: 'PDF',
      views: 117,
      downloads: 70,
      likes: 1,
    },
    {
      title: 'Luận văn thạc sỹ - Chất lượng nguồn nhân lực',
      typeFile: 'Word',
      views: 124,
      downloads: 90,
      likes: 2,
    },
    {
      title: 'Phát triển du lịch sinh thái tại khu bảo tồn',
      typeFile: 'PDF',
      views: 139,
      downloads: 90,
      likes: 5,
    },
    {
      title: 'Quản lý thu thuế tại chi cục thuế thành phố',
      typeFile: 'PDF',
      views: 108,
      downloads: 75,
      likes: 0,
    },
    {
      title: 'Đấu mạch điện sao - tam giác dùng rơ le',
      typeFile: 'Word',
      views: 20200,
      downloads: 74,
      likes: 11,
    },
    {
      title: 'Sáng kiến kinh nghiệm Đạo Đức lớp 1',
      typeFile: 'Word',
      views: 6500,
      downloads: 191,
      likes: 7,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FilePdfOutlined className="text-red-500" />;
      case 'Word':
        return <FileWordOutlined className="text-blue-500" />;
      default:
        return <FileOutlined />;
    }
  };

  return (
    <section className="py-8 mt-10 mb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Tài liệu mới đăng</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {getIcon(doc.typeFile)}
                <span className="ml-2 text-lg font-semibold">{doc.title}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
                <span className="flex items-center">
                  <EyeOutlined className="mr-1" /> {doc.views}
                </span>
                <span className="flex items-center">
                  <DownloadOutlined className="mr-1" /> {doc.downloads}
                </span>
                <span className="flex items-center">
                  ❤️ {doc.likes}
                </span>
              </div>
              <div className="text-center mt-4">
                <Button type='primary' className="">
                  Xem tài liệu
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewDocuments;
