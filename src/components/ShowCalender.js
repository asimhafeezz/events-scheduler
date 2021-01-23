import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

class EventsCalender extends React.Component {
	render() {
		return (
			<div className='events-calender-app'>
				<div className='events-calender-app-main'>
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						headerToolbar={{
							left: 'prev,next',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay',
						}}
						initialView='dayGridMonth'
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						weekends={true}
					/>
				</div>
			</div>
		)
	}
}

export default EventsCalender
