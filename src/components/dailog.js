import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

export default function DialogBox({ open, handleOpen, handleClose, cal_api }) {
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

	//state
	const [title, setTitle] = React.useState('')

	// const handleClickOpen = () => {
	// 	setOpen(true)
	// }

	// const handleClose = () => {
	// 	setOpen(false)
	// }

	const formSubmitHandler = e => {
		e.preventDefault()

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
	}

	return (
		<div>
			{/* <Button variant='outlined' color='primary' onClick={handleOpen}>
				Open responsive dialog
			</Button> */}
			<Dialog
				// fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby='responsive-dialog-title'>
				<DialogTitle id='responsive-dialog-title'>
					{'Add New Event'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<form className='addEventForm' onSubmit={formSubmitHandler}>
							<input
								value={title}
								onChange={e => setTitle(e.target.value)}
								placeholder='Enter an event title'
							/>
							<button type='submit'>Add Event</button>
						</form>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	)
}
