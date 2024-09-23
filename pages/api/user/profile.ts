import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { firebase_uid } = req.query;

    if (!firebase_uid) {
        return res.status(400).json({ message: 'Chưa truyền tham số uid' });
    }

    try {
        const user = await User.findOne({ firebase_uid: firebase_uid });
        res.status(200).json({ message: 'Lấy dữ liệu thành công', data: user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load users' });
    }
}