import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
	const [isEmpty, setIsEmpty] = useState(false);
	const [inputValid, setInputValid] = useState(false);

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case "isEmpty":
					value ? setIsEmpty(false) : setIsEmpty(true);
					break;
			}
		}
	}, [value]);

	useEffect(() => {
		if (isEmpty) setInputValid(false);
		else setInputValid(true);
	}, [isEmpty]);

	return { isEmpty, inputValid };
};
