import { d as db } from './db-CF_k3vJ4.js';
import { j as json } from './index-BQZSrJq2.js';
import './shared-server-9-2j12mp.js';
import 'node:buffer';
import 'events';
import 'process';
import 'net';
import 'tls';
import 'timers';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'crypto';
import 'zlib';
import 'util';
import 'url';
import './index-DBqjc0Yf.js';

//#region src/routes/api/betslip/share/+server.ts
var POST = async ({ request }) => {
	try {
		const { selections } = await request.json();
		if (!selections || !Array.isArray(selections)) return json({
			success: false,
			message: "Invalid selections data payload"
		}, { status: 400 });
		const code = "SLIP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
		const id = crypto.randomUUID();
		await db.execute("INSERT INTO betslip_codes (id, code, selections) VALUES (?, ?, ?)", [
			id,
			code,
			JSON.stringify(selections)
		]);
		return json({
			success: true,
			code
		});
	} catch (error) {
		return json({
			success: false,
			message: error.message || "Failed to share slip"
		}, { status: 500 });
	}
};

export { POST };
//# sourceMappingURL=_server.ts-BapH5XLf.js.map
