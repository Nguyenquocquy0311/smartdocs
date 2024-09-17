import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { documentId } = req.body;

  if (!documentId) {
    return res.status(400).json({ message: 'Yêu cầu cung cấp ID của tài liệu.' });
  }

  try {
    const feedbacks = await Feedback.find({ document: documentId })
      .populate('author', 'full_name')
      .sort({ feedback_date: -1 });

    return res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Lỗi khi lấy feedback:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}