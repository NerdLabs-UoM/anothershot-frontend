import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '@/app/lib/types';
import { EventInput } from '@fullcalendar/core/index.js';

interface FullCalendarProps {
    events: Event[];
}

const mapEventToEventInput = (event: Event): EventInput => ({
    id: event.id,
    title: event.title,
    start: event.start ? event.start.toISOString() : undefined,
    end: event.end ? event.end.toISOString() : undefined,
    allDay: event.allDay,
    description: event.description,
});

const FullCalendarComp: React.FC<FullCalendarProps> = ({ events }) => {
    const eventInputs: EventInput[] = events.map(mapEventToEventInput);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={eventInputs}
        />
    );
};

export default FullCalendarComp;
