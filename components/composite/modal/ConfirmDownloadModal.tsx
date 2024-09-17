import { Modal } from 'antd';

interface ConfirmDownloadModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  loading: boolean;
  handleConfirmDownload: () => Promise<void>;
  downloadPoints: number;
}

const ConfirmDownloadModal: React.FC<ConfirmDownloadModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  loading,
  handleConfirmDownload,
  downloadPoints,
}) => {
  return (
    <Modal
      title="Xác nhận tải tài liệu VIP"
      visible={isModalVisible}
      onOk={handleConfirmDownload}
      onCancel={() => setIsModalVisible(false)}
      okText="OK"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <p>
        Tài liệu này yêu cầu <span className="font-bold">{downloadPoints}</span> điểm để tải xuống. Bạn có chắc chắn muốn sử dụng số điểm để tải tài liệu này không?
      </p>
    </Modal>
  );
};

export default ConfirmDownloadModal;
