import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Cần cung cấp id của thể loại để xóa' });
      }

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ message: 'Không tìm thấy thể loại với id này' });
      }

      return res.status(200).json({ message: 'Xóa thể loại thành công', data: deletedCategory });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi xóa thể loại', error: e });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
