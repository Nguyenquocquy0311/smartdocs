import React, { useState } from 'react';
import { Button, Form, Input, List, notification, Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Auth from '@/context/AuthContext';

const { TextArea } = Input;

interface FeedbackItem {
  author: string; 
  content: string;
  rating: number;
  datetime: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [commentValue, setCommentValue] = useState<string>('');
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const { userInfo } = Auth.useContainer();

  const handleSubmit = () => {
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

    const newFeedback = {
      author: userInfo?.displayName,
      content: commentValue,
      rating: ratingValue ?? 0,
      datetime: new Date().toLocaleString(),
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setCommentValue('');
    setRatingValue(0);
    notification.success({
      message: 'Phản hồi thành công!',
      description: 'Phản hồi của bạn đã được thêm.',
    });
  };

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">Đánh giá tài liệu</h3>

      {feedbacks && <List
        className="mb-4"
        dataSource={feedbacks}
        header={`${feedbacks.length} lượt đánh giá`}
        itemLayout="horizontal"
        renderItem={(feedback) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={feedback.author}
              description={feedback.datetime}
            />
            <div>
              {feedback.rating && (
                <div>
                  <Rate disabled value={feedback.rating} />
                </div>
              )}
              {feedback.content && <p>{feedback.content}</p>}
            </div>
          </List.Item>
        )}
      />}

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

export default Feedback;
