import { LocalizationProvider } from "@mui/x-date-pickers";
import "./App.css";
import { BookingForm } from "./components/BookingForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BookingForm2 } from "./components/BookingForm2";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="App">
				<h1>Форма бронирования переговорной</h1>
				<BookingForm2 />
			</div>
		</LocalizationProvider>
	);
}

export default App;
