import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/models/Feedback';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { documentId } = req.query;

  if (!documentId) {
    return res.status(400).json({ message: 'Yêu cầu cung cấp ID của tài liệu.' });
  }

  try {
    const feedbacks = await Feedback.find({ document: documentId })
      .sort({ feedback_date: -1 });

    const feedbacksWithAuthor = await Promise.all(
      feedbacks.map(async (feedback) => {
        const user = await User.findOne({ firebase_uid: feedback.author }, 'full_name profile_picture');
        return {
          ...feedback._doc,
          authorName: user?.full_name || 'Người dùng ẩn danh',
          authorAva: user?.profile_picture || ''
        };
      })
    );


    return res.status(200).json({ message: 'Lấy dữ liệu thành công', data: feedbacksWithAuthor });
  } catch (error) {
    console.error('Lỗi khi lấy feedback:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}