import dotenv from 'dotenv';
import fs from 'fs';
import axios from 'axios';

const redColor = '\x1b[31m%s\x1b[0m';
const greenColor = '\x1b[32m%s\x1b[0m';
const yellowColor = '\x1b[33m%s\x1b[0m';
const magentaColor = '\x1b[35m%s\x1b[0m';
const cyanColor = '\x1b[36m%s\x1b[0m';

dotenv.config({
	path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const ENDPOINT = process.env.SWAGGER_ENDPOINT; // Your .env variable
const OUTPUT_PATH = './openapi.json';

console.log(cyanColor, 'generating swagger from: ', ENDPOINT);

void (async () => {
	if (!ENDPOINT) {
		console.error('❌ ENDPOINT_URL not set in .env');
		process.exit(1);
	}

	try {
		const response = await axios.get(ENDPOINT);

		const data = response.data;

		fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
		console.log(greenColor, `openapi.json generated successfully!`);
	} catch (err) {
		console.error('❌ Error:', err);
	}
})();
