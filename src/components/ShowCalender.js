import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

//action creater
import actionCreators from '../store/events/actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getHashValues } from '../utils'

//dialog box
import DialogBox from './dailog'

//render events
const renderEventContent = eventInfo => {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	)
}

class EventsCalender extends React.Component {
	state = {
		open: false,
		cal_api: null,
		isAddEvent: false,
		clickInfo: null,
	}

	handleDateSelect = selectInfo => {
		let calendarApi = selectInfo.view.calendar
		// clear date selection
		calendarApi.unselect()
		this.setState({ isAddEvent: true, cal_api: selectInfo, open: true })
	}

	handleEventClick = clickInfo => {
		this.setState({ isAddEvent: false, open: true, clickInfo })
	}

	//handling events crud functionallity
	handleDates = rangeInfo => {
		this.props
			.requestEvents(rangeInfo.startStr, rangeInfo.endStr)
			.catch(err => console.log('err', err))
	}

	handleEventAdd = addInfo => {
		this.props.createEvent(addInfo.event.toPlainObject()).catch(err => {
			console.log('err', err)
			addInfo.revert()
		})
	}

	handleEventChange = changeInfo => {
		this.props.updateEvent(changeInfo.event.toPlainObject()).catch(err => {
			console.log('err', err)
			changeInfo.revert()
		})
	}

	handleEventRemove = removeInfo => {
		this.props.deleteEvent(removeInfo.event.id).catch(err => {
			console.log('err', err)
			removeInfo.revert()
		})
	}

	render() {
		return (
			<>
				<DialogBox
					open={this.state.open}
					handleClose={() => this.setState({ open: false })}
					isAddEvent={this.state.isAddEvent}
					clickInfo={this.state.clickInfo}
					cal_api={this.state.cal_api}
				/>
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
							datesSet={this.handleDates}
							select={this.handleDateSelect}
							events={this.props.events}
							eventContent={renderEventContent}
							eventClick={this.handleEventClick}
							eventAdd={this.handleEventAdd}
							eventChange={this.handleEventChange}
							eventRemove={this.handleEventRemove}
						/>
					</div>
				</div>
			</>
		)
	}
}

function mapStateToProps() {
	const getEventArray = createSelector(state => state.eventsById, getHashValues)

	return state => {
		return {
			events: getEventArray(state),
			weekendsVisible: state.weekendsVisible,
		}
	}
}

export default connect(mapStateToProps, actionCreators)(EventsCalender)
