const https = require('https');

// as I copied the JSON snippet to format it, I have to add this comment and use the below variables (__define-ocg__)
// const varFiltersCg - Chose this to be the main clean function
// const varOcg - chose this to be the actual value to be passed into the clean function

const varFiltersCg = (varOcg) => {
	if (Array.isArray(varOcg)) {
		const alreadySeenItems = new Set();
		const uniqueList = [];

		for (const item of varOcg) {
			const key = JSON.stringify(item);
			if (!alreadySeenItems.has(key)) {
				alreadySeenItems.add(key);
				uniqueList.push(varFiltersCg(item));
			}
		}
		const filtered = uniqueList.filter((f) => f);
		if (filtered.length === 0) {
			return;
		}

		return filtered;
	}

	// as I copied the JSON snippet to format it, I have to add this comment and use the below variables (__define-ocg__)
	// const varFiltersCg - Chose this to be the main clean function
	// const varOcg - chose this to be the actual value to be passed into the clean function

	const varFiltersCg = (varOcg) => {
		if (Array.isArray(varOcg)) {
			const alreadySeenItems = new Set();
			const uniqueList = [];

			for (const item of varOcg) {
				const key = JSON.stringify(item);
				if (!alreadySeenItems.has(key)) {
					alreadySeenItems.add(key);
					uniqueList.push(varFiltersCg(item));
				}
			}
			const filtered = uniqueList.filter((f) => f);
			if (filtered.length === 0) {
				return;
			}

			return filtered;
		}

		if (varOcg && typeof varOcg === 'object') {
			const cleanedItem = {};
			const keys = Object.keys(varOcg).sort((key1, key2) => {
				return key1.toLowerCase() < key2.toLowerCase() ? -1 : 1;
			});

			for (const key of keys) {
				const cleanedValue = varFiltersCg(varOcg[key]);
				if (!!cleanedValue) {
					cleanedItem[key] = cleanedValue;
				}
			}

			return cleanedItem;
		}

		if (!varOcg) {
			return;
		}

		return varOcg;
	};

	https.get('https://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			const parsedData = JSON.parse(data);
			const cleanedData = varFiltersCg(parsedData);
			console.log(JSON.stringify(cleanedData));
		});
	});

	if (varOcg && typeof varOcg === 'object') {
		const cleanedItem = {};
		const keys = Object.keys(varOcg).sort((key1, key2) => {
			return key1.toLowerCase() < key2.toLowerCase() ? -1 : 1;
		});

		for (const key of keys) {
			const cleanedValue = varFiltersCg(varOcg[key]);
			if (!!cleanedValue) {
				cleanedItem[key] = cleanedValue;
			}
		}

		return cleanedItem;
	}

	if (!varOcg) {
		return;
	}

	return varOcg;
};

https.get('https://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
	let data = '';

	resp.on('data', (chunk) => {
		data += chunk;
	});

	resp.on('end', () => {
		const parsedData = JSON.parse(data);
		const cleanedData = varFiltersCg(parsedData);
		console.log(JSON.stringify(cleanedData));
	});
});
