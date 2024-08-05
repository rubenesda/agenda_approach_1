import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email: emailRequested } = req.query;
    // Get all events
    try {
      const events = await db.event.findMany({
        select: {
          title: true,
          start: true,
          time: true,
          color: true,
        },
        where: {
          email: {
            equals: emailRequested as string,
          }
        },
      });

      await db.$disconnect();
      return res.status(200).json(events);

    } catch (error) {
      await db.$disconnect();
      return res.status(400).json({ sucess: false, message: error });
    }
  }
}