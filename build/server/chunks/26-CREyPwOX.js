import { d as db } from './db-BcGa8hoB.js';
import { r as redirect, f as fail } from './index-BQZSrJq2.js';
import fs from 'fs';
import '@prisma/client';
import './index-DBqjc0Yf.js';

//#region src/routes/profile/verification/+page.server.ts
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/auth/login");
	return { documents: await db.verificationDoc.findMany({
		where: { profileId: locals.user.id },
		orderBy: { submittedAt: "desc" }
	}) };
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
		await db.verificationDoc.create({ data: {
			profileId: locals.user.id,
			documentType,
			fileUrl,
			status: "PENDING"
		} });
		return {
			success: true,
			message: "Document submitted successfully! Our compliance team will review it."
		};
	} catch (error) {
		console.error("[KYC Upload Error]:", error);
		return fail(500, { error: "Failed to process document file upload" });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-RhgY6vN-.js')).default;
const server_id = "src/routes/profile/verification/+page.server.ts";
const imports = ["_app/immutable/nodes/26.BnkLrwiF.js","_app/immutable/chunks/ByXn1zri.js","_app/immutable/chunks/1v0-xqgc.js","_app/immutable/chunks/DvwXlVgx.js","_app/immutable/chunks/BBHkplEh.js","_app/immutable/chunks/B_LFtwi-.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DucYbcZx.js","_app/immutable/chunks/Cq4mmvBv.js","_app/immutable/chunks/BJhGESTH.js","_app/immutable/chunks/OVKGRtIL.js","_app/immutable/chunks/BW2FEx7u.js","_app/immutable/chunks/B9nD8bUv.js","_app/immutable/chunks/B5xKPP2C.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-CREyPwOX.js.map
