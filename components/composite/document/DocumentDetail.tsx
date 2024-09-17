import { Button } from 'antd';
import { Document } from '@/types/Document';
import { useState } from 'react';
import { useDownloadDocument } from '@/hooks/useDocumentDownload';
import ConfirmDownloadModal from '../modal/ConfirmDownloadModal';

interface DocumentSelectedProps {
  selectedDocument: Document;
  userId: string;
}

const DocumentDetail: React.FC<DocumentSelectedProps> = ({ selectedDocument, userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { handleDownloadClick, handleConfirmDownload, loading } = useDownloadDocument(userId, selectedDocument, setIsModalVisible);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg font-thin relative">
      <h2 className="text-2xl font-bold mb-4">{selectedDocument.title}</h2>
      <p className="mt-4">Thể loại: {selectedDocument.category}</p>
      <p>Ngày đăng: {new Date(selectedDocument.createdAt).toLocaleDateString()}</p>
      <p>Số lượt xem: {selectedDocument.views}</p>
      <p>Số lượt tải: {selectedDocument.downloadCount}</p>
      <p>Điểm tải về: {selectedDocument.downloadPoints}</p>
      <p>Định dạng file: {selectedDocument.fileType}</p>
      <p className="mt-4">{selectedDocument.description}</p>

      {/* Button tải xuống */}
      <Button type="primary" className="mt-6" onClick={handleDownloadClick}>
        Tải xuống tài liệu
      </Button>

      {/* Popup xác nhận tải tài liệu VIP */}
      <ConfirmDownloadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        loading={loading}
        handleConfirmDownload={handleConfirmDownload}
        downloadPoints={selectedDocument.downloadPoints}
      />

      {selectedDocument.downloadPoints > 0 && (
        <p className="absolute right-8 top-5 font-serif font-bold rainbow-text">Tài liệu VIP</p>
      )}
    </div>
  );
};

export default DocumentDetail;
