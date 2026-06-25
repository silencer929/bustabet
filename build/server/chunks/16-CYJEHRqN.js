import { d as db } from './db-CF_k3vJ4.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
import fs from 'fs';
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

//#region src/routes/admin/verification/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const [rows] = await db.execute(`SELECT id, profile_id as profileId, document_type as documentType, file_url as fileUrl, status, reviewed_by as reviewedBy, submitted_at as submittedAt 
     FROM verification_documents 
     WHERE profile_id = ? 
     ORDER BY submitted_at DESC`, [locals.user.id]);
	return { documents: rows.map((doc) => ({
		id: doc.id,
		profileId: doc.profileId,
		documentType: doc.documentType,
		fileUrl: doc.fileUrl,
		status: doc.status,
		reviewedBy: doc.reviewedBy,
		submittedAt: new Date(doc.submittedAt)
	})) };
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	const formData = await request.formData();
	const documentType = formData.get("documentType");
	const file = formData.get("file");
	if (!file || file.size === 0) return fail(400, { error: "Please select a valid document file to upload" });
	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
		const uploadPath = `static/uploads/${fileName}`;
		if (!fs.existsSync("static/uploads")) fs.mkdirSync("static/uploads", { recursive: true });
		await fs.promises.writeFile(uploadPath, buffer);
		const fileUrl = `/uploads/${fileName}`;
		const docId = crypto.randomUUID();
		await db.execute(`INSERT INTO verification_documents (id, profile_id, document_type, file_url, status) 
         VALUES (?, ?, ?, ?, 'PENDING')`, [
			docId,
			locals.user.id,
			documentType,
			fileUrl
		]);
		return {
			success: true,
			message: "Your document was submitted successfully! Our compliance team will audit it shortly."
		};
	} catch (error) {
		console.error("[KYC Upload System Error]:", error);
		return fail(500, { error: "Failed to process document file upload" });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C0gBsxSQ.js')).default;
const server_id = "src/routes/admin/verification/+page.server.ts";
const imports = ["_app/immutable/nodes/16.D1D-6UHf.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/DTnltfDP.js","_app/immutable/chunks/BNzKY-Lz.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/4wvFbwq-.js","_app/immutable/chunks/BJhGESTH.js","_app/immutable/chunks/B7W6-iS0.js","_app/immutable/chunks/GsLKTv2l.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-CYJEHRqN.js.map
