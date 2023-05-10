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

export function BookingForm2() {
	const tower = useInput("", { isEmpty: true });

	const postForm = (e) => {
		e.preventDefault();
		if (tower.inputValid) {
			const bookingData = {
				towerValue: tower.value,
			};

			console.log(JSON.stringify(bookingData));
		} else {
			if (!tower.isDirty) tower.isDirty = true;
		}
	};

	const clearForm = () => {
		tower.value = "";
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
						<p style={{ color: "red" }}>
							Поле не может быть пустым
						</p>
					)}
					{/* {towerValueError && towerValueDirty && (
						<Alert className="error_field" severity="error">
							{towerValueError}
						</Alert>
					)} */}
				</FormControl>

				<FormControl
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					// error={floorValueDirty && Boolean(floorValueError.length)}
				>
					<InputLabel>Выберите этаж</InputLabel>
					<Select
						name="floor"
						// value={floorValue}
						label="Выберите этаж"
						// onBlur={(e) => handleBlur(e)}
						// onChange={(e) => handleChangeFloorValue(e)}
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
					{/* {floorValueError && floorValueDirty && (
						<Alert className="error_field" severity="error">
							{floorValueError}
						</Alert>
					)} */}
				</FormControl>

				<FormControl
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					// error={
					// 	conferenceValueDirty &&
					// 	Boolean(conferenceValueError.length)
					// }
				>
					<InputLabel>Выберите номер переговорки</InputLabel>
					<Select
						// value={conferenceRoomValue}
						label="Выберите номер переговорки"
						// onBlur={(e) => handleBlur(e)}
						// onChange={(e) => handleChangeConferenceRoomValue(e)}
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
					{/* {conferenceValueError && conferenceValueDirty && (
						<Alert className="error_field" severity="error">
							{conferenceValueError}
						</Alert>
					)} */}
				</FormControl>

				<div className="date_time_block">
					<div className="datestart">
						<DatePicker
							label="Дата старт"
							// value={timeStartValue}
							// onChange={(newValue) =>
							// 	handleChangeTimeStartValue(newValue)
							// }
						/>

						<TimePicker label="время старт" />
					</div>
					<div className="datefinish">
						<DatePicker
							label="Дата финиш"
							// value={timeFinishValue}
							// onChange={(newValue) =>
							// 	handleChangeTimeFinishValue(newValue)
							// }
						/>

						<TimePicker label="время финиш" />
					</div>
				</div>

				<TextField
					// value={undefined || commentValue}
					// onChange={(e) => handleChangeCommentValue(e)}
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
