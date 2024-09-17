import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
        const { userId } = req;
        const { author, document, rating, comment } = req.body;

        if (!userId || !document || !rating) {
        return res.status(400).json({ message: 'Author, document, and rating are required.' });
      }

      try {
        const newFeedback = new Feedback({
          author: userId,
          document,
          rating,
          comment,
          feedback_date: new Date(),
        });

        await newFeedback.save();

        return res.status(200).json({ message: 'Đã thêm bình luận', data: newFeedback });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi thêm tag', error: e });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
