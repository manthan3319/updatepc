import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calender.css';
const Calender = () => {
    const [date, setDate] = useState(new Date());

    // List of events (festival dates)
    const events = {
        '2024-02-10': 'Vasant Panchami',
        '2024-03-01': 'Maha Shivaratri',
        '2024-06-23': 'Manthan Vahasiya\'s Birthday',
        // Add more events here
    };

    const onChange = (newDate) => {
        setDate(newDate);
    };

    // Function to determine if a date has an event
    const hasFestival = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return events.hasOwnProperty(dateString);
    };

    // Function to render custom content for date tiles
    const tileContent = ({ date, view }) => {
        if (view === 'month' && hasFestival(date)) {
            return <div className="event-marker">🎉</div>; // Marker for festival dates
        }
    };
    return (
        <div>
            <Calendar
                onChange={onChange}
                value={date}
                tileContent={tileContent}
                className="custom-calendar"
            />
            {hasFestival(date) && (
                <div className="event-details text-white mt-4">
                    <h2>Event Details</h2>
                    <p>{events[date.toISOString().split('T')[0]]}</p>
                </div>
            )}
        </div>
    )
}

export default Calender
