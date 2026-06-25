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

//#region src/routes/api/betslip/load/+server.ts
var GET = async ({ url }) => {
	const code = url.searchParams.get("code");
	if (!code) return json({
		success: false,
		message: "Missing slip code parameters"
	}, { status: 400 });
	try {
		const [rows] = await db.execute("SELECT selections FROM betslip_codes WHERE code = ? LIMIT 1", [code.toUpperCase().trim()]);
		if (rows.length === 0) return json({
			success: false,
			message: "This slip code has expired or does not exist"
		}, { status: 404 });
		return json({
			success: true,
			selections: typeof rows[0].selections === "string" ? JSON.parse(rows[0].selections) : rows[0].selections
		});
	} catch (error) {
		return json({
			success: false,
			message: error.message || "Failed to load slip"
		}, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-BBd9s15m.js.map
