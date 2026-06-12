import { W as WalletService } from './wallet.service-C5RxSAXO.js';
import { j as json } from './index-BQZSrJq2.js';
import './db-CT_Sl39P.js';
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

//#region src/routes/api/payhero/callback/+server.ts
var POST = async ({ request }) => {
	try {
		const payload = await request.json();
		if (!payload || !payload.external_reference || !payload.status || !payload.amount) return json({
			success: false,
			message: "Invalid payload parameters"
		}, { status: 400 });
		if (await WalletService.handleMpesaCallback({
			status: payload.status,
			amount: Number(payload.amount),
			external_reference: payload.external_reference,
			MpesaCode: payload.MpesaCode
		})) return json({
			success: true,
			message: "Transaction reconciled successfully"
		});
		else return json({
			success: false,
			message: "Transaction reference not found or already settled"
		}, { status: 404 });
	} catch (error) {
		console.error("[PayHero Webhook Process Error]:", error);
		return json({
			success: false,
			message: "Internal server processing error"
		}, { status: 500 });
	}
};

export { POST };
//# sourceMappingURL=_server.ts-CfFIqHYf.js.map
