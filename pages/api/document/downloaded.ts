import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Download from '@/models/Download';
import User from '@/models/User';
import Document from '@/models/Document';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { userId, documentId, pointsToRedeem } = req.body;

  if (!userId || !documentId || typeof pointsToRedeem !== 'number') {
    return res.status(400).json({ error: 'Yêu cầu không hợp lệ, dữ liệu bị thiếu hoặc không đúng.' });
  }

  try {
    const user = await User.findOne({ firebase_uid: userId });
    if (!user || user.points < pointsToRedeem) {
      return res.status(400).json({ error: 'Không đủ điểm để tải tài liệu.' });
    }

    // Trừ điểm của người dùng
    user.points -= pointsToRedeem;
    await user.save();

    // Kiểm tra tài liệu
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại.' });
    }

    // Lưu lần tải xuống vào collection Download
    const newDownload = new Download({
      userId: userId,
      documentId: documentId,
    });

    await newDownload.save();

    res.status(200).json({ message: 'Điểm đã được trừ và tài liệu đã được tải xuống.', data: newDownload, userCurrentPoints: user.points});
  } catch (error) {
    res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
}
