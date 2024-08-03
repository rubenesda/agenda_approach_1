import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    console.log('8 Hello!', req.body);
    const { email, name, lastName, password } = req.body as AccountData;

    if (!email || !name || !lastName || !password) {
      return res.status(400).json({ success: false, message: 'Missing either name, lastname, email, or password' });
    }

    const exist = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exist) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        lastName,
        email,
        hashedPassword,
      },
    });

    await db.$disconnect();
    return res.status(200).json(user);
  }
}