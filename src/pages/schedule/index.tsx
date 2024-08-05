import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import { useState } from 'react';
import useSWR from 'swr';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Pusher from 'pusher-js';
import toast, { Toaster } from 'react-hot-toast';
import EventForm from '~/components/event';
import Image from 'next/image';
import Avatar from '~/components/avatar';
import Notification from '~/components/notification';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const realtimeChannel = process.env.NEXT_PUBLIC_REALTIME_APP_CHANNEL ?? '';
  const realtimeEvent = process.env.NEXT_PUBLIC_REALTIME_APP_EVENT ?? '';
  const { data: session, status } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedDate, setSelectedDate] = useState('');

  const pusher = new Pusher(process.env.NEXT_PUBLIC_REALTIME_APP_KEY ?? '', {
    cluster: process.env.NEXT_PUBLIC_REALTIME_APP_CLUSTER ?? '',
  });

  const handler = (data: NotificationData) => {
    toast.custom((t) => (
      <Notification t={t} data={data}/>
    ));
  };

  const channel = pusher.subscribe(realtimeChannel);
  channel.bind(realtimeEvent, handler);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, mutate } = useSWR(`/api/events/${session?.user?.email}`, fetcher );

  if (status === 'unauthenticated') return router.push('/');

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const handleDateClick = (arg: DateClickArg) => {
    setModalPosition({
      ...modalPosition,
      x: arg.jsEvent.clientX,
      y: arg.jsEvent.clientY,
    });
    setOpenModal(true);
    setSelectedDate(arg.dateStr);
  }

  const publishEvent = async (event: EventData) => {
    const eventInput: EventData = {
      ...event,
      email: session?.user?.email ?? '',
    };
    setOpenModal(false);

    await fetch('/api/events', {
      body: JSON.stringify(eventInput),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await mutate({ ...data });
  }

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  }

  return (
    <div className="flex justify-center bg-slate-300 items-center h-screen">
      <Image className={"fixed z-0 h-screen w-full"} loading='lazy' src={'/images/background.jpeg'} alt="background" width={2880} height={1920}/>
      <div className="w-9/12 h-4/5 bg-white p-6 rounded-md z-10">
        <div className="flex justify-between mb-4">
          <h1 className="font-semibold text-2xl">Schedule</h1>
          <Avatar handleLogOut={handleLogOut}/>
        </div>
        <div className="h-full">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
              start: 'prev',
              center: 'title',
              end: 'next'
            }}
            aspectRatio={2}
            fixedWeekCount={false}
            dayHeaderFormat={{
              weekday: 'long'
            }}
            dateClick={handleDateClick}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            events={data}
          />
        </div>
      </div>
      {openModal &&
        <EventForm
          modalPosition={modalPosition}
          date={selectedDate}
          publishEvent={publishEvent}
        />
      }
      <Toaster
        position='bottom-right'
        reverseOrder={false}
      />
    </div>
  );
}
