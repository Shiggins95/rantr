import React from 'react';

export const useTimeout = (
	callback: () => void,
	delay: number,
	initialise = true,
	repeat = false,
): { reset: () => void; clear: () => void } => {
	const callbackRef = React.useRef<(() => void) | null>(callback);
	const timeoutRef = React.useRef<number | null>(null);

	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = React.useCallback(() => {
		timeoutRef.current = setTimeout(() => {
			callbackRef.current?.();
			if (repeat) {
				reset();
			}
		}, delay);
	}, [delay]);

	const clear = React.useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}, []);

	React.useEffect(() => {
		if (initialise) {
			set();
		}

		return clear;
	}, [delay, set, clear, initialise]);

	const reset = React.useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
};
