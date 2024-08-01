import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import { useState } from "react";
import useSWR from 'swr';
import EventForm from '~/components/event';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then(res => res.json());


export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedDate, setSelectedDate] = useState('');

  const { data, error } = useSWR('/api/event', fetcher );

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
    await fetch('/api/event', {
      body: JSON.stringify(event),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setOpenModal(false);
  }

  console.log('44 ', data);

  return (
    <div className="flex justify-center bg-slate-300 items-center h-screen">
      <Image className={"fixed z-0 h-screen w-full"} loading='lazy' src={'/images/background.jpeg'} alt="background" width={2880} height={1920}/>
      <div className="w-9/12 h-4/5 bg-white p-6 rounded-md z-10">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">Schedule</h1>
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-slate-300 mb-4"></div>
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
    </div>
  );
}
