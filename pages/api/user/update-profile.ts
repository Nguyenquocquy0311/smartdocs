import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { firebase_uid, full_name, email, photoUrl } = req.body;

    try {
        const updateUser = await User.updateOne({ firebase_uid: firebase_uid },
            {
                $set: {
                    displayName: full_name,
                    email: email,
                    photoURL: photoUrl,
                },
            }, { new: true });
        res.status(200).json({ message: 'Cập nhật dữ liệu thành công', data: updateUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load users' });
    }
}