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
	const [towerValue, setTowerValue] = useState("");
	const [towerValueDirty, setTowerValueDirty] = useState(false);
	const [towerValueError, setTowerValueError] = useState(
		"Пожалуйста, выберите башню"
	);

    const tower = useInput("")

	const [floorValue, setFloorValue] = useState("");
	const [floorValueDirty, setFloorValueDirty] = useState(false);
	const [floorValueError, setFloorValueError] = useState(
		"Пожалуйста, выберите этаж"
	);

	const [conferenceRoomValue, setConferenceRoomValue] = useState("");
	const [conferenceValueDirty, setConferenceValueDirty] = useState(false);
	const [conferenceValueError, setConferenceValueError] = useState(
		"Пожалуйста, выберите номер переговорки"
	);

	const [timeStartValue, setTimeStartValue] = useState("");
	const [timeFinishValue, setTimeFinishValue] = useState("");
	const [commentValue, setCommentValue] = useState("");
	const [isValidForm, setIsValidForm] = useState(false);

	useEffect(() => {
		if (towerValueError || floorValueError || conferenceValueError) {
			setIsValidForm(false);
		} else {
			setIsValidForm(true);
		}
	}, [towerValueError, floorValueError, conferenceValueError]);

	const handleChangeTowerValue = (e) => {
		setTowerValue(e.target.value);
		setTowerValueError("");
	};

	const handleChangeFloorValue = (e) => {
		setFloorValue(e.target.value);
		setFloorValueError("");
	};

	const handleChangeConferenceRoomValue = (e) => {
		setConferenceRoomValue(e.target.value);
		setConferenceValueError("");
	};

	const handleChangeTimeStartValue = (newValue) => {
		setTimeStartValue(newValue);
	};

	const handleChangeTimeFinishValue = (newValue) => {
		setTimeFinishValue(newValue);
	};

	const handleChangeCommentValue = (e) => {
		setCommentValue(e.target.value);
	};

	const postForm = (e) => {
		e.preventDefault();
		if (isValidForm) {
			const bookingData = {
				towerValue: towerValue,
				floorValue: floorValue,
				conferenceRoomValue: conferenceRoomValue,
				commentValue: commentValue,
				timeStart: timeStartValue,
				timeFinish: timeFinishValue,
			};

			console.log(JSON.stringify(bookingData, null, 2));
		} else {
			if (!towerValueDirty) setTowerValueDirty(true);
			if (!floorValueDirty) setFloorValueDirty(true);
			if (!conferenceValueDirty) setConferenceValueDirty(true);
		}
	};

	const clearForm = () => {
		setTowerValue("");
		setTowerValueDirty(false);
		setTowerValueError("Пожалуйста, выберите башню");

		setFloorValue("");
		setFloorValueDirty(false);
		setFloorValueError("Пожалуйста, выберите этаж");

		setConferenceRoomValue("");
		setConferenceValueDirty(false);
		setConferenceValueError("Пожалуйста, выберите номер переговорки");

		setCommentValue("");
		setTimeStartValue("");
		setTimeFinishValue("");
	};

	const handleBlur = (e) => {
		switch (e.target.name) {
			case "tower":
				setTowerValueDirty(true);
				break;
			case "floor":
				setFloorValueDirty(true);
				break;
			case "conferenceRoom":
				setConferenceValueDirty(true);
				break;
			default:
				break;
		}
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
					error={towerValueDirty && Boolean(towerValueError.length)}
				>
					<InputLabel>Выберите башню</InputLabel>
					<Select
						name="tower"
						value={towerValue}
						label="Выберите башню"
						onBlur={(e) => handleBlur(e)}
						onChange={(e) => handleChangeTowerValue(e)}
						MenuProps={MenuProps}
					>
						<MenuItem value={"А"}>А</MenuItem>
						<MenuItem value={"Б"}>Б</MenuItem>
					</Select>
					{towerValueError && towerValueDirty && (
						<Alert className="error_field" severity="error">
							{towerValueError}
						</Alert>
					)}
				</FormControl>

				<FormControl
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					error={floorValueDirty && Boolean(floorValueError.length)}
				>
					<InputLabel>Выберите этаж</InputLabel>
					<Select
						name="floor"
						value={floorValue}
						label="Выберите этаж"
						onBlur={(e) => handleBlur(e)}
						onChange={(e) => handleChangeFloorValue(e)}
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
					{floorValueError && floorValueDirty && (
						<Alert className="error_field" severity="error">
							{floorValueError}
						</Alert>
					)}
				</FormControl>

				<FormControl
					sx={{
						margin: "10px 0",
					}}
					fullWidth
					error={
						conferenceValueDirty &&
						Boolean(conferenceValueError.length)
					}
				>
					<InputLabel>Выберите номер переговорки</InputLabel>
					<Select
						value={conferenceRoomValue}
						label="Выберите номер переговорки"
						onBlur={(e) => handleBlur(e)}
						onChange={(e) => handleChangeConferenceRoomValue(e)}
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
					{conferenceValueError && conferenceValueDirty && (
						<Alert className="error_field" severity="error">
							{conferenceValueError}
						</Alert>
					)}
				</FormControl>

				<div className="date_time_block">
					<div className="datestart">
						<DatePicker
							label="Дата старт"
							value={timeStartValue}
							onChange={(newValue) =>
								handleChangeTimeStartValue(newValue)
							}
						/>

						<TimePicker label="время старт" />
					</div>
					<div className="datefinish">
						<DatePicker
							label="Дата финиш"
							value={timeFinishValue}
							onChange={(newValue) =>
								handleChangeTimeFinishValue(newValue)
							}
						/>

						<TimePicker label="время финиш" />
					</div>
				</div>

				<TextField
					value={undefined || commentValue}
					onChange={(e) => handleChangeCommentValue(e)}
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
