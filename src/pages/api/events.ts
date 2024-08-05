import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from "@upstash/qstash";
import { db } from '~/server/db';
import { env } from "~/env";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const eventData = req.body as EventServer;
    const { start, time, title } = eventData;

    try {
      // Save the event in the database
      const eventDB = await db.event.create({ data: eventData });

      // Set a new date-time
      const newDate = new Date(`${start}T${time}`);
      newDate.setHours(newDate.getHours() + 5);
      const cron = `${newDate.getMinutes()} ${newDate.getHours()} ${newDate.getDate()} ${newDate.getMonth() + 1} *`;

      // Create the Qstash schedule
      const client = new Client({ token: env.QSTASH_TOKEN });
      const schedules = client.schedules;

      const schedule = await schedules.create({
        destination: `${env.BACKEND_URL}/api/notifications`,
        cron,
        body: JSON.stringify({
          email: 'rubenesda@gmail.com',
          date: start,
          time,
          event: title,
          eventId: eventDB.id,
        }),
      });

      // Update the recent even created with scheduleId
      await db.event.update({
        where: {
          id: eventDB.id,
        },
        data: {
          scheduleId: schedule.scheduleId,
        },
      });

    } catch (error) {
      await db.$disconnect();
      return res.status(400).json({ sucess: true, message: error });
    }

    await db.$disconnect();
    return res.status(200).json({
      sucess: true,
      message: 'Successfully created'
    });
  } else if (req.method === 'GET') {
    // Get all events
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
      await db.$disconnect();
      return res.status(400).json({ sucess: false, message: error });
    }
  }
}