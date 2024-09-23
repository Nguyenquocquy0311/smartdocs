import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, List, notification, Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Auth from '@/context/AuthContext';
import { addFeedback, getFeedbacksWithDocs } from '@/services/feedback';
import { Feedback } from '@/types/Feedback';
import { useFeedback } from '@/hooks/useFeedback';

const { TextArea } = Input;

interface FeedbackProps {
  document: string;
}

const FeedbackComponent: React.FC<FeedbackProps> = ({ document }) => {
  const [commentValue, setCommentValue] = useState<string>('');
  const [ratingValue, setRatingValue] = useState<number>(0);

  const { userInfo } = Auth.useContainer();
  const { feedbacks, fetchFeedbacks, submitFeedback } = useFeedback(document);

    useEffect(() => {
      fetchFeedbacks();
    }, [fetchFeedbacks]);

  const handleSubmit = async () => {
    if (!commentValue && ratingValue === null) {
      notification.error({
        message: 'Lỗi',
        description: 'Vui lòng nhập nội dung bình luận hoặc đánh giá!',
      });
      return;
    }

    if (!userInfo) {
      notification.error({
        message: 'Lỗi',
        description: 'Bạn phải đăng nhập để gửi phản hồi.',
      });
      return;
    }

    try {
      await submitFeedback(userInfo, ratingValue, commentValue);
      setCommentValue('');
      setRatingValue(0);
      notification.success({
        message: 'Phản hồi thành công!',
        description: 'Phản hồi của bạn đã được thêm.',
      });
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể gửi phản hồi. Vui lòng thử lại sau.',
      });
    }
  };

  return (
    <div className="my-6">
      <h3 className="text-xl font-bold mb-4">Đánh giá tài liệu</h3>

      {feedbacks && (
        <List
          className="mb-4"
          dataSource={feedbacks}
          header={`${feedbacks.length} lượt đánh giá`}
          itemLayout="horizontal"
          renderItem={(feedback) => (
            <List.Item>
              <List.Item.Meta
                avatar={feedback.authorAva === '' ? <Avatar icon={<UserOutlined/>} /> : <Avatar src={feedback.authorAva} />}
                title={feedback.authorName}
                // description={new Date(feedback.feedback_date).toLocaleDateString()}
                description={feedback.comment}
              />
              <div>
                {/* {feedback.comment && <p>{feedback.comment}</p>} */}
                {feedback.rating && (
                  <div className=''>
                    <Rate disabled value={feedback.rating} />
                  </div>
                )}
                <p className='opacity-50'>{new Date(feedback.feedback_date).toLocaleDateString()}</p>
              </div>
            </List.Item>
          )}
        />
      )}

      <Form.Item>
        <Rate onChange={(value) => setRatingValue(value)} value={ratingValue ?? 0} />
      </Form.Item>

      <Form.Item>
        <TextArea
          rows={4}
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          placeholder="Nhập bình luận của bạn (tuỳ chọn)..."
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" onClick={handleSubmit}>
          Gửi phản hồi
        </Button>
      </Form.Item>
    </div>
  );
};

export default FeedbackComponent;
