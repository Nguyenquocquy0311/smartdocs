import { Modal, Input } from "antd";
import { useEffect, useState } from "react";

interface TagModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (name: string) => void;
    currentTag?: { name: string } | null;
}

const TagModal: React.FC<TagModalProps> = ({ visible, onCancel, onSubmit, currentTag }) => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (currentTag) {
            setName(currentTag.name);
        } else {
            setName("");
        }
    }, [currentTag]);

    const handleSubmit = () => {
        onSubmit(name);
    };

    return (
        <Modal
            visible={visible}
            title={currentTag ? "Cập nhật tag" : "Thêm tag mới"}
            onCancel={onCancel}
            onOk={handleSubmit}
            centered
        >
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên tag" />
        </Modal>
    );
};

export default TagModal;
