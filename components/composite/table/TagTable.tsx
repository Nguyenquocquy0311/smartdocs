import { Tag } from "@/types/Tag";
import { Table, Button, Space, Popconfirm } from "antd";

interface TagTableProps {
  tags: Tag[];
  loading: boolean;
  onEdit: (tag: Tag) => void;
  onDelete: (tagId: string) => void;
}

const TagTable: React.FC<TagTableProps> = ({ tags, loading, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'index',
            key: 'index',
            render: (text: string, record: Tag, index: number) => index + 1,
            align: 'center',
        },
        {
            title: "Tên tag",
            dataIndex: "name",
            key: "name",
            align: 'center',
        },
        {
            title: "Hành động",
            key: "action",
            align: 'center',
            render: (text: string, record: Tag) => (
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

    return <Table columns={columns} dataSource={tags} rowKey="_id" loading={loading} pagination={{ pageSize: 7 }} />;
};

export default TagTable;
