import { Modal, Input } from "antd";
import { useEffect, useState } from "react";

interface CategoryModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (name: string) => void;
    currentCategory?: { name: string } | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ visible, onCancel, onSubmit, currentCategory }) => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (currentCategory) {
            setName(currentCategory.name);
        } else {
            setName("");
        }
    }, [currentCategory]);

    const handleSubmit = () => {
        onSubmit(name);
    };

    return (
        <Modal
            visible={visible}
            title={currentCategory ? "Cập nhật thể loại" : "Thêm thể loại mới"}
            onCancel={onCancel}
            onOk={handleSubmit}
            centered
        >
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên thể loại" />
        </Modal>
    );
};

export default CategoryModal;
