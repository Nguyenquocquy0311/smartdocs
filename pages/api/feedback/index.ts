import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const feedbacks = await Feedback.find({});

      return res.status(200).json({ message: 'Lấy dữ liệu thành công', data: feedbacks });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error: e });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
