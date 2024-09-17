import { Category } from "@/types/Category";
import { Table, Button, Space, Popconfirm } from "antd";

interface CategoryTableProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (tagId: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'index',
            key: 'index',
            render: (text: string, record: Category, index: number) => index + 1,
            align: 'center',
        },
        {
            title: "Tên thể loại",
            dataIndex: "name",
            key: "name",
            align: 'center',
        },
        {
            title: "Hành động",
            key: "action",
            align: 'center',
            render: (text: string, record: Category) => (
                <Space size="middle">
                    <Button onClick={() => onEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn xóa?"
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

    return <Table columns={columns} dataSource={categories} rowKey="_id" loading={loading} pagination={{ pageSize: 7 }} />;
};

export default CategoryTable;
