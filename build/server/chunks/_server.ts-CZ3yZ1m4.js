import { O as OddsSyncService } from './oddsSync.service-DnxNgkZ7.js';
import { j as json } from './index-BQZSrJq2.js';
import './db-CF_k3vJ4.js';
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
import './oddsApi.service-bKwp7aEE.js';
import './index-DBqjc0Yf.js';

//#region src/routes/api/sync-odds/+server.ts
var GET = async ({ url }) => {
	if (url.searchParams.get("secret") !== "cronsecret123") return json({
		success: false,
		message: "Unauthorized access"
	}, { status: 401 });
	const eventId = url.searchParams.get("eventId");
	const sport = url.searchParams.get("sport");
	try {
		if (eventId && sport) return json({
			success: true,
			message: `Deep harvest sync requested for event: ${eventId}`
		});
		else return json({
			success: true,
			message: "Standard famous leagues sync execution complete",
			synced: await OddsSyncService.syncFamousLeaguesStandard()
		});
	} catch (error) {
		console.error("[API Sync Odds Error]:", error);
		return json({
			success: false,
			message: error.message || "An unexpected error occurred during sync"
		}, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-CZ3yZ1m4.js.map
