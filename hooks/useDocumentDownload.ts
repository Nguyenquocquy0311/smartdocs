import { useState } from 'react';
import { message } from 'antd';
import { Document } from '@/types/Document';
import { downloadDocument } from '@/services/editorDocument';

export const useDownloadDocument = (userId: string, selectedDocument: Document, setIsModalVisible: (visible: boolean) => void) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadClick = () => {
    if (selectedDocument.downloadPoints > 0) {
      setIsModalVisible(true);
    } else {
      downloadDocument(selectedDocument._id);
    }
  };

  const handleConfirmDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/document/downloaded', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          documentId: selectedDocument._id,
          pointsToRedeem: selectedDocument.downloadPoints,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Tải tài liệu thành công!');
        downloadDocument(selectedDocument._id);
      } else {
        message.error(data.error || 'Bạn không đủ điểm để tải tài liệu này.');
      }
    } catch (error) {
      message.error('Lỗi hệ thống khi trừ điểm.');
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  return { handleDownloadClick, handleConfirmDownload, loading };
};
