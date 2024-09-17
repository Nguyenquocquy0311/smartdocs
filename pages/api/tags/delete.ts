import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Tag from '@/models/Tag';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'DELETE') {
    // Xử lý xóa tag
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Cần cung cấp id của tag để xóa' });
      }

      const deletedTag = await Tag.findByIdAndDelete(id);

      if (!deletedTag) {
        return res.status(404).json({ message: 'Không tìm thấy tag với id này' });
      }

      return res.status(200).json({ message: 'Xóa tag thành công', data: deletedTag });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi xóa tag', error: e });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
