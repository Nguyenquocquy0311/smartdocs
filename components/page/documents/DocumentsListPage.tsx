import React, { useEffect, useState } from 'react';
import Footer from "@/components/common/Footer";
import DocumentsList from "@/components/composite/document/DocumentsList";
import Header from "@/components/composite/header/Header";
import { routes } from "@/constant/routes";
import { Breadcrumb, message } from "antd";
import { FileTextOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { getApprovedDocument } from "@/services/editorDocument";
import { Document } from "@/types/Document";

export default function DocumentsListPage() {
  const [documentsData, setDocumentsData] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documents = await getApprovedDocument();
        setDocumentsData(documents);
        setLoading(false);
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
            title: (
              <>
                <FileTextOutlined />
                <span>Danh sách tài liệu</span>
              </>
            ),
          },
        ]}
      />
      {loading ? <div className='flex justify-center items-center min-h-[50vh]'><LoadingOutlined /></div> : <DocumentsList documentsData={documentsData}/>}
      <Footer />
    </>
  );
}
