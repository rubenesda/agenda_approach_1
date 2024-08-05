import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';
import { Client } from '@upstash/qstash';
import Pusher from 'pusher';
import { db } from '~/server/db';
import { env } from '~/env';

sendgrid.setApiKey(env.SENDGRID_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request
    const { email, event, time, date, eventId } = req.body as QStashScheduleBody;

    try {
      // Send the notification
      await sendgrid.send({
        to: `${email}`, // Your email where you'll receive emails
        from: env.SENDGRID_VERIFIED_SENDER, // your website email address here
        subject: `Reminder: ${event}`,
        html: `<div>Reminder the next event ${event} at ${date}, ${time}</div>`,
      });

      // Find the record in the database
      const eventDB = await db.event.findUnique({
        select: {
          scheduleId: true,
        },
        where: {
          id: eventId,
        },
      });

      if (!eventDB) {
        return res.status(400).json({ success: false, message: `Event id: ${eventId} was not found` });
      }

      // Remove the Qstash schedule
      const client = new Client({ token: env.QSTASH_TOKEN });
      const schedules = client.schedules;
      await schedules.delete(eventDB.scheduleId ?? '');

      const pusher = new Pusher({
        appId: env.REALTIME_APP_ID,
        key: env.REALTIME_APP_KEY,
        secret: env.REALTIME_APP_SECRET,
        cluster: env.REALTIME_APP_CLUSTER,
        useTLS: true
      });

      await pusher.trigger(env.REALTIME_APP_CHANNEL, env.REALTIME_APP_EVENT, {
        title: `Scheduled: ${event}`,
        dateTime: `${date} at ${time}`,
      });

    } catch (error) {
      return res.status(400).json({ success: false, message: error });
    }

    return res.status(200).json({ success: true, message: 'Notification was sent' })
  }
}