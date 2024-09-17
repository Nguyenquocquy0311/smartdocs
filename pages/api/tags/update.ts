import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Tag from '@/models/Tag';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const { id, name } = req.body;

      if (!id || !name) {
        return res.status(400).json({ message: 'Cần cung cấp id và tên tag' });
      }

      // Tìm và cập nhật tag theo id
      const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });

      if (!updatedTag) {
        return res.status(404).json({ message: 'Không tìm thấy tag với id này' });
      }

      return res.status(200).json({ message: 'Cập nhật tag thành công', data: updatedTag });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi cập nhật tag', error: e.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
