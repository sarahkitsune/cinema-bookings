import Button from '../../components/Button'

function Home() {
	return  (
		<div className="App">
			<h1 className='text-7xl text-cyan-800'>Home Cinema Bookings by Kitsune</h1>
			<p>Welcome to the cinema booking system!</p>
			<Button text="Book Now" onClick={() => alert('Booking functionality coming soon!')} />
		</div>
	)
}

export default Home