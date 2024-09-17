import { routes } from '@/constant/routes';
import { useDocument } from '@/context/DocumentContext';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DocumentDetail: React.FC = () => {
  const { selectedDocument } = useDocument();
  const router = useRouter();

  useEffect(() => {
    if (!selectedDocument) {
      router.push(routes.documents);
    }
  }, [selectedDocument, router]);

  if (!selectedDocument) return <p>Đang tải...</p>;

  console.log(selectedDocument)

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg font-thin relative">
      <h1 className="text-2xl font-bold mb-4">{selectedDocument.title}</h1>
      {/* <p>Tác giả: {selectedDocument.author}</p> */}
      <p className="mt-4">Thể loại: {selectedDocument.category}</p>
      <p>Ngày đăng: {new Date(selectedDocument.createdAt).toLocaleDateString()}</p>
      <p>Số lượt xem: {selectedDocument.view}</p>
      <p>Số lượt tải: {selectedDocument.downloadCount}</p>
      <p>Điểm tải về: {selectedDocument.downloadPoints}</p>
      <p>Định dạng file: {selectedDocument.fileType}</p>
      <p className="mt-4">{selectedDocument.description}</p>

      {/* Button tải xuống */}
      <Button type="primary" className="mt-6">
        Tải xuống tài liệu
      </Button>

      <p className='absolute right-8 top-5 font-serif font-bold rainbow-text'>Tài liệu VIP</p>
    </div>
  );
};

export default DocumentDetail;
