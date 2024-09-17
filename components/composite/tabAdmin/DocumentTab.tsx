import { Button, Input, notification } from "antd";
import TagTable from "../table/TagTable";
import { useEffect, useState } from "react";
import { addTag, deleteTag, getAllTags, updateTag } from "@/services/editorTag";
import DocumentModal from "../modal/DocumentModal";
import { Document } from "@/types/Document";
import { getAllDocument } from "@/services/editorDocument";
import DocumentTable from "../table/DocumentTable";

export default function DocumentTab() {
    const [tags, setTags] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTag, setCurrentTag] = useState<Document | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await getAllDocument();
            setTags(response);
        } catch (error) {
            console.error("Failed to load tags: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTag = () => {
        setCurrentTag(null); // For add new mode
        setIsModalVisible(true);
    };


    const handleEditTag = (tag: Document) => {
        setCurrentTag(tag); 
        setIsModalVisible(true);
    };

    const handleDeleteTag = async (tagId: string) => {
        try {
            await deleteTag(tagId);
            notification.success({message:"Xóa tag thành công"});
            fetchTags();
        } catch (error) {
            notification.error({message:"Đã có lỗi khi xóa tag"});
        }
    };

    const handleModalSubmit = async (name: string) => {
        try {
            if (currentTag) {
                // Update existing tag
                await updateTag(currentTag._id, name );
                notification.success({message:"Cập nhật tag thành công"});
            } else {
                // Add new tag
                await addTag(name);
                notification.success({ message:"Thêm tag mới thành công" });
            }
            fetchTags();
            setIsModalVisible(false);
        } catch (error) {
            notification.error({ message: "Lỗi khi saved tag" });
        }
    };

    const filteredTags = tags.filter(tag => tag.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
                {/* <Button type="primary" onClick={handleAddTag}>Thêm mới</Button> */}
            </div>
            <DocumentTable
                docs={filteredTags}
                loading={loading}
                onEdit={handleEditTag}
                onDelete={handleDeleteTag}
            />
            <DocumentModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={handleModalSubmit}
                currentDocument={currentTag}
            />
        </div>
    );
}