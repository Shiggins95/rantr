export const formatVoteCount = (n: number): string => {
	const absN = Math.abs(n);

	if (absN >= 1_000_000) {
		const floored = Math.floor(absN / 100_000) / 10;
		return (n < 0 ? '-' : '') + floored + 'M';
	}
	if (absN >= 1_000) {
		const floored = Math.floor(absN / 100) / 10;
		return (n < 0 ? '-' : '') + floored + 'K';
	}
	return n.toString();
};
