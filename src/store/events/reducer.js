import { combineReducers } from 'redux'
import { hashById } from '../../utils'

//redux persist reducer
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const eventsById = (eventsById = {}, action) => {
	switch (action.type) {
		case 'RECEIVE_EVENTS':
			return hashById(action.plainEventObjects)

		case 'CREATE_EVENT':
		case 'UPDATE_EVENT':
			return {
				...eventsById,
				[action.plainEventObject.id]: action.plainEventObject,
			}

		case 'DELETE_EVENT':
			eventsById = { ...eventsById } // copy
			delete eventsById[action.eventId]
			return eventsById

		default:
			return eventsById
	}
}

//persisting config
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['eventsById'],
}

const rootReducer = combineReducers({
	eventsById,
})

export const reducerRoot = persistReducer(persistConfig, rootReducer)
