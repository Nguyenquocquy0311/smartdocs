import Footer from "@/components/common/Footer";
import DocumentDetail from "@/components/composite/document/DocumentDetail";
import Header from "@/components/composite/header/Header";
import { routes } from "@/constant/routes";
import { useDocument } from "@/context/DocumentContext";
import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FileSearchOutlined, FileTextOutlined, HomeOutlined } from "@ant-design/icons"
import DocumentsList from "@/components/composite/document/DocumentsList";
import { getDocumentWithCategory } from "@/services/editorDocument";
import Auth from "@/context/AuthContext";
import FeedbackComponent from "@/components/composite/Feedback";
import { Document } from '@/types/Document';
import { LoadingOutlined } from '@ant-design/icons';

export default function DocumentDetailPage() {
    const { selectedDocument } = useDocument();
    const router = useRouter();
    const [documentsData, setDocumentsData] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { userInfo } = Auth.useContainer();

    useEffect(() => {
        if (!selectedDocument) {
            router.push(routes.documents);
        }
    }, [selectedDocument, router]);

    useEffect(() => {
        const fetchDocuments = async () => {
        try {
            if (selectedDocument) {
                const documents = await getDocumentWithCategory(selectedDocument.category, selectedDocument._id);
                setDocumentsData(documents);
                setLoading(false);
            }
        } catch (error) {
            console.error('Không thể lấy dữ liệu tài liệu');
            setLoading(false);
        }
        };

        fetchDocuments();
    }, []);

    if (!selectedDocument) return <p>Đang tải...</p>;
    if (!userInfo) return <p>Lỗi người dùng, đang sửa...</p>;

    return (
        <>
            <Header />

            <div className="p-6 pt-6 container">
                {/* Breadcrumb */}
                <Breadcrumb
                className="pt-20 mb-0 p-6 container"
                items={[
                    {
                        href: routes.home,
                        title: (
                            <>
                                <HomeOutlined />
                                <span>Trang chủ</span>
                            </>),
                    },
                    {
                        href: routes.documents,
                        title: (
                            <>
                                <FileTextOutlined />
                                <span>Danh sách tài liệu</span>
                            </>
                        ),
                    },
                    {
                        title: (
                            <>
                                <FileSearchOutlined />
                                <span>{selectedDocument.title}</span>
                            </>
                        ),
                    },
                ]}
            />
                <DocumentDetail selectedDocument={selectedDocument} userId={userInfo?.uid}/>
                <div className="grid grid-flow-col space-x-16 mt-6 border-t-2">
                    <FeedbackComponent document={selectedDocument._id} />
                    <div className="">
                        <h2 className="mt-6 mb-4 text-xl font-bold">Tài liệu liên quan</h2>
                        {loading ? <div className='flex justify-center items-center min-h-[50vh]'><LoadingOutlined /></div> : <DocumentsList documentsData={documentsData}/>}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}