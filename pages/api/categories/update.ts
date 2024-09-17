import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const { id, name } = req.body;

      if (!id || !name) {
        return res.status(400).json({ message: 'Cần cung cấp id và tên thể loại' });
      }

      const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Không tìm thấy tag với id này' });
      }

      return res.status(200).json({ message: 'Cập nhật thể loại thành công', data: updatedCategory });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi cập nhật thể loại', error: e });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
