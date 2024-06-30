import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import Modal from 'react-modal';
import { Event } from '@/app/lib/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import FloatingAddButton from '@/app/user/(routes)/photographer/[userId]/(routes)/bookings/components/floatingAddButton';

interface FullCalendarProps {
    events: Event[];
}
const mapEventToEventInput = (event: Event): EventInput => ({
    id: event.id,
    title: event.title,
    start: event.start ? new Date(event.start)?.toISOString() : undefined,
    end: event.end ? new Date(event.end)?.toISOString() : undefined,
    allDay: event.allDay,
    description: event.description,
});

const FullCalendarComp: React.FC<FullCalendarProps> = ({ events }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    const eventInputs: EventInput[] = events.map(mapEventToEventInput);

    const handleDateClick = (arg: { dateStr: string }) => {
        const clickedDate = arg.dateStr;
        const eventsOnClickedDate = events.filter((event) => {
            const eventStart = event.start ? new Date(event.start).toISOString().slice(0, 10) : "";
            const eventEnd = event.end ? new Date(event.end).toISOString().slice(0, 10) : eventStart;
            return clickedDate >= eventStart && clickedDate <= eventEnd;
        });

        if (eventsOnClickedDate.length === 0) {
            setModalContent(`No events on ${clickedDate}`);
        } else {
            const eventDetails = eventsOnClickedDate.map((event) =>
                `Title: ${event.title}\nDescription: ${event.description}\nStart: ${event.start}\nEnd: ${event.end}`
            ).join('\n\n');
            setModalContent(`Events on ${clickedDate}:\n\n${eventDetails}`);
        }
        setModalIsOpen(true);
    };

    // const handleAddEvent = () => {
    //     setIsDialogOpen(true); 
    // };

    return (
        <div className="relative">
            <div className={modalIsOpen ? 'hidden' : ''}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    events={eventInputs}
                    dateClick={handleDateClick}
                />

                {/* <FloatingAddButton onClick={handleAddEvent} setIsDialogOpen={setIsDialogOpen} /> */}

            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Event Details"
                className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                    <h2 className="text-2xl mb-4">Event Details</h2>
                    <pre>{modalContent}</pre>
                    <button
                        className="mt-4 bg-black text-white py-2 px-4 rounded"
                        onClick={() => setModalIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </Modal>
                

        </div>
    );
};

export default FullCalendarComp;
