import React, { useCallback, useEffect, useState } from 'react';
import { FileOutlined, FilePptOutlined, EyeOutlined, DownloadOutlined,FileWordOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { getApprovedDocument } from '@/services/editorDocument';
import { Document } from '@/types/Document';
import { useDocument } from '@/context/DocumentContext';
import { routes } from '@/constant/routes';
import { useRouter } from 'next/router';

const NewDocuments = () => {
  const [documentsData, setDocumentsData] = useState<Document[]>([]);
  const { setSelectedDocument } = useDocument();
  const router = useRouter()

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await getApprovedDocument();
        setDocumentsData(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchDocs();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdfOutlined className="text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileWordOutlined className="text-blue-500" />;
      case 'pptx':
      case 'ppt':
        return <FilePptOutlined className="text-blue-500" />;
      default:
        return <FileOutlined />;
    }
  };

  const WatchDetail = useCallback((item: Document) => {
    setSelectedDocument(item);
    router.push(routes.documentDetail)
  },[])

  return (
    <section className="py-8 mt-10 mb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Tài liệu mới đăng</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {documentsData.map((doc, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
              <div className="flex items-center mb-4">
                {getIcon(doc.fileType)}
                <span className="ml-2 text-lg font-semibold">{doc.title}</span>
              </div>
              <p className='mb-4 text-slate-500'>{doc.description}</p>
              <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
                <span className="flex items-center">
                  <EyeOutlined className="mr-1" /> {doc.views}
                </span>
                <span className="flex items-center">
                  <DownloadOutlined className="mr-1" /> {doc.downloadCount}
                </span>
                <span className="flex items-center">
                  ❤️ {doc.likes}
                </span>
              </div>
              <div className="text-center mt-4 absolute bottom-4">
                <Button type='primary' onClick={() => WatchDetail(doc)}>
                  Xem tài liệu
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewDocuments;
