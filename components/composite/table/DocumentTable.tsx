import { Document } from "@/types/Document";
import { Table, Button, Space, Popconfirm, Tag } from "antd";

interface DocumentTableProps {
  docs: Document[];
  loading: boolean;
  onEdit: (doc: Document) => void;
  onDelete: (docId: string) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ docs, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (text: string, record: Document, index: number) => index + 1,
            align: 'center',
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            align: 'center',
        },
        {
            title: "Thể loại",
            dataIndex: "category",
            key: "category",
            align: 'center',
        },
        {
            title: "Tag",
            dataIndex: "tags",
            key: "tags",
            align: 'center',
            render: (tags: string[]) => (
                <>
                    {tags.map(tag => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Điểm tải về",
            dataIndex: "downloadPoints",
            key: "downloadPoints",
            align: 'center',
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
            align: 'center',
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            align: 'center',
        },
        {
            title: "Đã duyệt",
            dataIndex: "approved",
            key: "approved",
            align: 'center',
        },
        {
            title: "Hành động",
            key: "action",
            align: 'center',
            render: (record: Document) => (
                <Space size="middle">
                    <Button onClick={() => onEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa bản tag này ?"
                        onConfirm={() => onDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={docs} rowKey="_id" loading={loading} pagination={{ pageSize: 5 }} />;
};

export default DocumentTable;
