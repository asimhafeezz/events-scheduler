import './App.css'
import EventsCalender from './components/ShowCalender'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducerRoot } from './store/events/reducer'
//redux persist
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let store = createStore(reducerRoot, applyMiddleware(thunk))
const persistor = persistStore(store)

function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<div className='App'>
					<EventsCalender />
				</div>
			</PersistGate>
		</Provider>
	)
}

export default App
