import { b as private_env } from './shared-server-9-2j12mp.js';
import { S as SettlementService } from './settlement.service-CS3TIz8T.js';
import { j as json } from './index-BQZSrJq2.js';
import './db-CF_k3vJ4.js';
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
import './oddsApi.service-bKwp7aEE.js';
import './index-DBqjc0Yf.js';

//#region src/routes/api/settle-bets/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== private_env.CRON_SECRET) return json({
		success: false,
		message: "Unauthorized access"
	}, { status: 401 });
	try {
		await SettlementService.settleSportBets("upcoming");
		await SettlementService.settleComboBets();
		return json({
			success: true,
			message: "All single and combo multibet wagers evaluated and settled successfully"
		});
	} catch (error) {
		console.error("[API Settle Bets Error]:", error);
		return json({
			success: false,
			message: error.message || "An unexpected error occurred during settlement"
		}, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-ChqZZxH_.js.map
