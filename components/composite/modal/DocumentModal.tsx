import { getAllTags } from "@/services/editorTag";
import { Modal, Input, Form, Select } from "antd";
import { useEffect, useState } from "react";

interface DocumentModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (document: {
        title: string;
        description: string;
        category: string;
        tags: string[];
    }) => void;
    currentDocument?: {
        title: string;
        description: string;
        category: string;
        tags: string[];
    } | null;
}

const { Option } = Select;

const DocumentModal: React.FC<DocumentModalProps> = ({ visible, onCancel, onSubmit, currentDocument }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagsApi, setTagsApi] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
        try {
            const allTags = await getAllTags();
            setTagsApi(allTags.map((tag: any) => tag.name));
        } catch (error) {
            console.error('Failed to fetch tags', error);
        }
        };

        fetchTags();
    }, []);

    useEffect(() => {
        if (currentDocument) {
            setTitle(currentDocument.title);
            setDescription(currentDocument.description);
            setCategory(currentDocument.category);
            setTags(currentDocument.tags);
        } else {
            setTitle("");
            setDescription("");
            setCategory("");
            setTags([]);
        }
    }, [currentDocument]);

    const handleSubmit = () => {
        onSubmit({ title, description, category, tags });
    };

    return (
        <Modal
            visible={visible}
            title='Cập nhật tài liệu'
            onCancel={onCancel}
            onOk={handleSubmit}
            centered
        >
            <Form layout="vertical">
                <Form.Item label="Tiêu đề">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tiêu đề"
                    />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input.TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả"
                    />
                </Form.Item>
                <Form.Item label="Thể loại">
                    <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Nhập thể loại"
                    />
                </Form.Item>
                <Form.Item label="Tag">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        value={tags}
                        onChange={(value) => setTags(value)}
                        placeholder="Nhập tag"
                    >
                        {tagsApi.map((tag) => (
                            <Option key={tag} value={tag}>
                                {tag}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DocumentModal;
