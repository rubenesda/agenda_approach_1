import { useState } from "react";

type EventFormProps = {
  modalPosition: {
    x: number,
    y: number,
  };
  date: string;
  publishEvent: (event: EventData) => void;
}

export default function EventForm({ modalPosition, date, publishEvent } : EventFormProps) {
  const dateArray = date.split('-');
  const formatDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
  const initalDate: EventData = {
    title: '',
    date,
    time: '',
    color: '',
  };
  const [event, setEvent] = useState(initalDate);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.id === "title") {
      setEvent({
        ...event,
        title: e.target.value,
      });
    } else if (e.target.id === "color") {
      setEvent({
        ...event,
        color: e.target.value,
      });
    } else {
      setEvent({
        ...event,
        time: e.target.value,
      });
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-md w-64 shadow-md border z-10 absolute"
      style={{
        left: `${modalPosition.x}px`,
        top: `${modalPosition.y}px`,
      }}
    >
      <form onSubmit={(e) => {
          e.preventDefault();
          publishEvent(event);
        }}
        className="w-full"
      >
        <h1 className="mb-3 text-xl font-semibold">New Event</h1>
        <input id="title" className="text-sm w-full h-9 border rounded-sm mb-3 px-3" placeholder="Event title" value={event.title} onChange={handleChange}/>
        <div className="flex justify-between mb-3">
          <label className="text-sm flex items-center">Date</label>
          <input className="text-sm  h-9 border rounded-sm w-32 px-3" placeholder="date" value={formatDate} readOnly/>
        </div>
        <div className="flex justify-between mb-3">
          <label className="text-sm flex items-center">Time</label>
          <input id="time" className="text-sm  h-9 border rounded-sm w-32 px-3" placeholder="00:00 AM" value={event.time} onChange={handleChange}/>
        </div>
        <div className="flex justify-between mb-3">
          <label className="text-sm flex items-center">Color</label>
          <input id="color" className="text-sm  h-9 border rounded-sm w-32 px-3" placeholder="#22529A" value={event.color} onChange={handleChange}/>
        </div>
        <button className="h-10 w-full rounded-md bg-black text-white text-sm" type="submit">Save</button>
      </form>
    </div>
  );
}