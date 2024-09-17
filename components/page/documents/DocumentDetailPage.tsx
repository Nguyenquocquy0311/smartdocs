import Footer from "@/components/common/Footer";
import DocumentDetail from "@/components/composite/document/DocumentDetail";
import Feedback from "@/components/composite/Feedback";
import Header from "@/components/composite/header/Header";
import { routes } from "@/constant/routes";
import { useDocument } from "@/context/DocumentContext";
import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FileSearchOutlined, FileTextOutlined, HomeOutlined } from "@ant-design/icons"

export default function DocumentDetailPage() {
    const { selectedDocument } = useDocument();
    const router = useRouter();

    useEffect(() => {
        if (!selectedDocument) {
            router.push(routes.documents);
        }
    }, [selectedDocument, router]);

    if (!selectedDocument) return <p>Đang tải...</p>;

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
                <DocumentDetail />
                <Feedback />
            </div>

            <Footer />
        </>
    );
}