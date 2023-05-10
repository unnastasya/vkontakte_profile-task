import {
	Alert,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { conferenceRoomOptions, floorOptions } from "../data/options.js";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

import "./BookingForm.css";
import { useInput } from "../hooks/useInput.js";
import dayjs from "dayjs";
import { useValidation } from "@mui/x-date-pickers/internals";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export function BookingForm() {
	const tower = useInput("", { isEmpty: true });
	const floor = useInput("", { isEmpty: true });
	const conferenceRoom = useInput("", { isEmpty: true });
	const dateStart = useInput(dayjs(), { isEmpty: true });
	const timeStart = useInput(dayjs(), { isEmpty: true });
	const dateFinish = useInput(dayjs(), { isEmpty: true });
	const timeFinish = useInput(dayjs(), { isEmpty: true });
	const comment = useInput("", { isEmpty: true });
	const [isValid, setIsValid] = useState(true);

	useEffect(() => {
		setIsValid(
			tower.inputValid &&
				floor.inputValid &&
				conferenceRoom.inputValid &&
				comment.inputValid &&
				dateStart.inputValid &&
				timeStart.inputValid &&
				dateFinish.inputValid &&
				timeFinish.inputValid
		);
	}, [
		tower.inputValid,
		floor.inputValid,
		conferenceRoom.inputValid,
		comment.inputValid,
		dateStart.inputValid,
		timeStart.inputValid,
		dateFinish.inputValid,
		timeFinish.inputValid,
	]);

	const postForm = (e) => {
		e.preventDefault();
		if (isValid) {
			const bookingData = {
				towerValue: tower.value,
				floorValue: floor.value,
				conferenceRoomValue: conferenceRoom.value,
				commentValue: comment.value,
				dateStart: dateStart.value,
				dateFinish: dateFinish.value,
				timeStart: timeStart.value,
				timeFinish: timeFinish.value,
			};

			console.log(JSON.stringify(bookingData));
		}
	};

	const clearForm = () => {
		tower.clear();
		floor.clear();
		conferenceRoom.clear();
		comment.clear();
		dateStart.clear();
		timeStart.clear();
		dateFinish.clear();
		timeFinish.clear();
	};

	return (
		<Paper
			sx={{ backgroundColor: "rgb(220, 220, 220)" }}
			elevation={3}
			className="form_container"
		>
			<form onSubmit={postForm} onReset={clearForm}>
				<FormControl
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					error={tower.isDirty && Boolean(tower.value == "")}
				>
					<InputLabel>Выберите башню</InputLabel>
					<Select
						name="tower"
						value={tower.value}
						label="Выберите башню"
						onBlur={(e) => tower.onBlur(e)}
						onChange={(e) => tower.onChange(e)}
						MenuProps={MenuProps}
					>
						<MenuItem value={"А"}>А</MenuItem>
						<MenuItem value={"Б"}>Б</MenuItem>
					</Select>
					{tower.isDirty && tower.isEmpty && (
						<Alert className="error_field" severity="error">
							Пожалуйста, выберите башню
						</Alert>
					)}
				</FormControl>

				<FormControl
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					error={floor.isDirty && Boolean(floor.value == "")}
				>
					<InputLabel>Выберите этаж</InputLabel>
					<Select
						name="floor"
						value={floor.value}
						label="Выберите этаж"
						onBlur={(e) => floor.onBlur(e)}
						onChange={(e) => floor.onChange(e)}
						MenuProps={MenuProps}
					>
						{floorOptions.map((floor) => {
							return (
								<MenuItem key={floor} value={floor}>
									{floor}
								</MenuItem>
							);
						})}
					</Select>
					{floor.isDirty && floor.isEmpty && (
						<Alert className="error_field" severity="error">
							Пожалуйста, выберите этаж
						</Alert>
					)}
				</FormControl>

				<FormControl
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					error={
						conferenceRoom.isDirty &&
						Boolean(conferenceRoom.value == "")
					}
				>
					<InputLabel>Выберите номер переговорки</InputLabel>
					<Select
						value={conferenceRoom.value}
						label="Выберите номер переговорки"
						onBlur={(e) => conferenceRoom.onBlur(e)}
						onChange={(e) => conferenceRoom.onChange(e)}
						MenuProps={MenuProps}
					>
						{conferenceRoomOptions.map((room) => {
							return (
								<MenuItem key={room} value={room}>
									{room}
								</MenuItem>
							);
						})}
					</Select>
					{conferenceRoom.isDirty && conferenceRoom.isEmpty && (
						<Alert className="error_field" severity="error">
							Пожалуйста, выберите номер переговорки
						</Alert>
					)}
				</FormControl>

				<div className="date_time_block">
					<div className="datestart">
						<DatePicker
							label="Дата начала"
							value={dateStart.value}
							onBlur={(e) => dateStart.onBlur(e)}
							onChange={(newValue) =>
								dateStart.onChange(newValue)
							}
						/>
						{dateStart.isDirty && dateStart.isEmpty && (
							<Alert className="error_field" severity="error">
								Пожалуйста, выберите дату начала
							</Alert>
						)}

						<TimePicker
							label="время начала"
							value={timeStart.value}
							onBlur={(e) => timeStart.onBlur(e)}
							onChange={(newValue) =>
								timeStart.onChange(newValue)
							}
						/>
						{timeStart.isDirty && timeStart.isEmpty && (
							<Alert className="error_field" severity="error">
								Пожалуйста, выберите время начала
							</Alert>
						)}
					</div>
					<div className="datefinish">
						<DatePicker
							label="Дата окончания"
							value={dateFinish.value}
							onBlur={(e) => dateFinish.onBlur(e)}
							onChange={(newValue) =>
								dateFinish.onChange(newValue)
							}
						/>
						{dateFinish.isDirty && dateFinish.isEmpty && (
							<Alert className="error_field" severity="error">
								Пожалуйста, выберите дату окончания
							</Alert>
						)}

						<TimePicker
							label="время окончания"
							value={timeFinish.value}
							onBlur={(e) => timeFinish.onBlur(e)}
							onChange={(newValue) =>
								timeFinish.onChange(newValue)
							}
						/>
						{timeFinish.isDirty && timeFinish.isEmpty && (
							<Alert className="error_field" severity="error">
								Пожалуйста, выберите время окончания
							</Alert>
						)}
					</div>
				</div>

				<TextField
					value={comment.value}
					onChange={(e) => comment.onChange(e)}
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					label="Комментарий"
					variant="outlined"
				/>

				<div className="buttons_block">
					<Button
						className="BookingForm__button"
						type="submit"
						variant="contained"
						disabled={!isValid}
					>
						Отправить
					</Button>
					<Button
						className="BookingForm__button"
						type="reset"
						variant="outlined"
					>
						Отменить
					</Button>
				</div>
			</form>
		</Paper>
	);
}
