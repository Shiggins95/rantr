import { z } from 'zod';

type NumberFieldOptions = {
	min?: number;
	max?: number;
};

const getNumberField = (
	fieldLabel: string,
	fieldOptions?: NumberFieldOptions,
) => {
	let field = z.coerce.number({
		required_error: `${fieldLabel} is required`,
		invalid_type_error: `${fieldLabel} must be a valid number`,
	});
	const { min, max } = fieldOptions || {};
	if (min !== undefined) {
		field = field.min(min);
	}

	if (max !== undefined) {
		field = field.max(max);
	}
	return field;
};

export const zNumberFieldRequired = (
	fieldLabel: string,
	fieldOptions?: NumberFieldOptions,
) => {
	return getNumberField(fieldLabel, fieldOptions);
};

export const zNumberFieldOptional = (
	fieldLabel: string,
	fieldOptions?: NumberFieldOptions,
) => {
	return getNumberField(fieldLabel, fieldOptions).optional();
};

type StringFieldOptions = {
	minLength?: number;
	maxLength?: number;
	type?: 'email' | 'date' | 'time';
};

const getStringField = (
	fieldLabel: string,
	fieldOptions?: StringFieldOptions,
) => {
	let field = z.string({
		required_error: `${fieldLabel} is required`,
	});

	const { minLength, maxLength, type } = fieldOptions || {};

	switch (type) {
		case 'email':
			field = field.email();
			break;
		case 'date':
			field = field.date();
			break;
		case 'time':
			field = field.time();
			break;
		default:
			break;
	}

	if (minLength) {
		field = field.min(minLength);
	}

	if (maxLength) {
		field = field.max(maxLength);
	}

	return field;
};

export const zStringFieldRequired = (
	fieldLabel: string,
	fieldOptions?: StringFieldOptions,
) => {
	const field = getStringField(fieldLabel, {
		...fieldOptions,
	});

	if (!fieldOptions?.minLength) {
		return field.min(1, {
			message: `${fieldLabel} is required`,
		});
	}

	return field;
};

export const zStringFieldOptional = (
	fieldLabel: string,
	fieldOptions?: StringFieldOptions,
) => {
	return getStringField(fieldLabel, fieldOptions).optional();
};

export const zStringArrayFieldRequired = (fieldLabel: string) => {
	return z.array(z.string()).min(1, {
		message: `${fieldLabel} is required`,
	});
};
export const zStringArrayFieldOptional = () => {
	return z.array(z.string());
};
