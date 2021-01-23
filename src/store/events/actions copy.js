import {
	requestEventsInRange,
	requestEventCreate,
	requestEventUpdate,
	requestEventDelete,
} from '../../requests'

export const toggleWeekends = () => {
	return {
		type: 'TOGGLE_WEEKENDS',
	}
}

export const requestEvents = (startStr, endStr) => {
	return dispatch => {
		return requestEventsInRange(startStr, endStr).then(plainEventObjects => {
			dispatch({
				type: 'RECEIVE_EVENTS',
				plainEventObjects,
			})
		})
	}
}

export const createEvent = plainEventObject => {
	return dispatch => {
		return requestEventCreate(plainEventObject).then(newEventId => {
			dispatch({
				type: 'CREATE_EVENT',
				plainEventObject: {
					id: newEventId,
					...plainEventObject,
				},
			})
		})
	}
}

export const updateEvent = plainEventObject => {
	return dispatch => {
		return requestEventUpdate(plainEventObject).then(() => {
			dispatch({
				type: 'UPDATE_EVENT',
				plainEventObject,
			})
		})
	}
}

export const deleteEvent = eventId => {
	return dispatch => {
		return requestEventDelete(eventId).then(() => {
			dispatch({
				type: 'DELETE_EVENT',
				eventId,
			})
		})
	}
}
