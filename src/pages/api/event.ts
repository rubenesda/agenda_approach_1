import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    console.log('6 Hello!', req.body);
    const eventData = req.body as EventData;

    try {
      await db.event.create({ data: eventData });
      await db.$disconnect();
    } catch (error) {
      console.log(error);
      await db.$disconnect();
      return res.status(400).json({ sucess: true, message: error });
    }

    return res.status(200).json({
      sucess: true,
      message: 'Successfully created'
    });
  } else if (req.method === 'GET') {
    try {
      const events = await db.event.findMany({
        select: {
          title: true,
          start: true,
          time: true,
          color: true,
        }
      });
      await db.$disconnect();
      return res.status(200).json(events);
    } catch (error) {
      console.log(error);
      await db.$disconnect();
      return res.status(400).json({ sucess: false, message: error });
    }
  }
}