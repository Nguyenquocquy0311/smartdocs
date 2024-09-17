import React, { useEffect, useState } from 'react';
import Footer from "@/components/common/Footer";
import DocumentsList from "@/components/composite/document/DocumentsList";
import Header from "@/components/composite/header/Header";
import { routes } from "@/constant/routes";
import { Breadcrumb, message } from "antd";
import { FileTextOutlined, HomeOutlined, LikeOutlined } from "@ant-design/icons";
import { getApprovedDocument, getUploadedDocument } from "@/services/editorDocument";
import { Document } from "@/types/Document";
import Auth from '@/context/AuthContext';

export default function DocumentsUploadedPage() {
  const [documentsData, setDocumentsData] = useState<Document[]>([]); // State để lưu dữ liệu tài liệu
  const [loading, setLoading] = useState<boolean>(true);
  const { userInfo } = Auth.useContainer()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        if (userInfo) {
          const documents = await getUploadedDocument(userInfo.uid);
          setDocumentsData(documents);
          setLoading(false);
        }
      } catch (error) {
        message.error('Không thể lấy dữ liệu tài liệu');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb
        className="pt-20 mb-0 p-6 container"
        items={[
          {
            href: routes.home,
            title: (
              <>
                <HomeOutlined />
                <span>Trang chủ</span>
              </>
            ),
          },
          {
            href: routes.documents,
            title: (
              <>
                <FileTextOutlined />
                <span>Danh sách tài liệu</span>
              </>
            ),
          },{
            title: (
              <>
                <LikeOutlined />
                <span>Tài liệu đã tải lên</span>
              </>
            ),
          },
        ]}
      />
      {/* Truyền dữ liệu documentsData cho DocumentsList */}
      <DocumentsList documentsData={documentsData} />
      <Footer />
    </>
  );
}
