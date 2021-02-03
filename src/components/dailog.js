import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function DialogBox({
	open,
	handleClose,
	cal_api,
	isAddEvent,
	clickInfo,
}) {
	//state
	const [title, setTitle] = React.useState('')

	const formSubmitHandler = e => {
		e.preventDefault()

		//is adding event or not??
		if (isAddEvent) {
			let calendarApi = cal_api.view.calendar

			if (title) {
				calendarApi.addEvent(
					{
						title,
						start: cal_api.startStr,
						end: cal_api.endStr,
						allDay: cal_api.allDay,
					},
					true
				)
				handleClose()
				setTitle('')
			}
		} else {
			// const isDel = e.target.getAttribute('del')
			// if (isDel) {
			// 	console.log(isDel, 'in removing')
			// }
			clickInfo.event.remove()
			handleClose()
		}
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='responsive-dialog-title'>
				<DialogTitle
					id='responsive-dialog-title'
					style={{ color: ' rgb(63, 63, 194)' }}>
					{isAddEvent ? 'Add New Event' : 'Delete Event'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<form className='addEventForm' onSubmit={formSubmitHandler}>
							{isAddEvent ? (
								<>
									<input
										value={title}
										onChange={e => setTitle(e.target.value)}
										placeholder='Enter an event title'
									/>
									<button type='submit'>Add Event</button>
								</>
							) : (
								<>
									{/* <input
										value={title}
										onChange={e => setTitle(e.target.value)}
										placeholder='Update an event title' */}
									{/* /> */}
									<button del={false} type='submit'>
										Delete Event
									</button>
									{/* <button del={true} type='submit'>
										Delete Event
									</button> */}
								</>
							)}
						</form>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	)
}
