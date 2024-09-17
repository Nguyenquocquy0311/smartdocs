import { Button, Input, notification } from "antd";
import { useEffect, useState } from "react";
import CategoryModal from "../modal/CategoryModal";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "@/services/editorCategory";
import { Category } from "@/types/Category";
import CategoryTable from "../table/CategoryTable";

export default function TagTab() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategories();
            setCategories(response);
        } catch (error) {
            console.error("Failed to load tags: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = () => {
        setCurrentCategory(null); // For add new mode
        setIsModalVisible(true);
    };

    const handleEditCategory = (category: Category) => {
        setCurrentCategory(category); 
        setIsModalVisible(true);
    };

    const handleDeleteCategory = async (Id: string) => {
        try {
            await deleteCategory(Id);
            notification.success({message:"Xóa tag thành công"});
            fetchCategories();
        } catch (error) {
            notification.error({message:"Đã có lỗi khi xóa tag"});
        }
    };

    const handleModalSubmit = async (name: string) => {
        try {
            if (currentCategory) {
                // Update existing tag
                await updateCategory(currentCategory._id, name );
                notification.success({message:"Cập nhật thể thành công"});
            } else {
                // Add new tag
                await addCategory(name);
                notification.success({ message:"Thêm thể loại mới thành công" });
            }
            fetchCategories();
            setIsModalVisible(false);
        } catch (error) {
            notification.error({ message: "Lỗi khi saved thể loại" });
        }
    };

    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <div className="bg-white px-10 h-full rounded-xl">
            {/* Header */}
            <div className="grid grid-flow-col justify-between py-5">
                <h1 className="font-sans mb-4">Có tất cả 10 bản ghi</h1>
                <Input.Search
                    placeholder="Tìm kiếm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <Button type="primary" onClick={handleAddCategory}>Thêm mới</Button>
            </div>
            <CategoryTable
                categories={filteredCategories}
                loading={loading}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
            />
            <CategoryModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={handleModalSubmit}
                currentCategory={currentCategory}
            />
        </div>
    );
}