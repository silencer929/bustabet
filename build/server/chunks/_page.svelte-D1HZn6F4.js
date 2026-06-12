import { a6 as escape_html, a2 as ensure_array_like, a0 as attr, a1 as stringify, V as derived } from './dev-CaPlrGUY.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { C as Chevron_right } from './chevron-right-B_iJr5sk.js';
import { S as Search } from './search-BoMM9cGn.js';
import { U as Users } from './users-C9CYHkYc.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/admin/users/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let searchQuery = "";
		const filteredProfiles = derived(() => data.profiles.filter((profile) => {
			return profile.username.toLowerCase().includes(searchQuery.toLowerCase()) || profile.email.toLowerCase().includes(searchQuery.toLowerCase()) || profile.fullName && profile.fullName.toLowerCase().includes(searchQuery.toLowerCase());
		}));
		const getRoleClass = (role) => {
			switch (role) {
				case "ADMIN": return "bg-red-950/40 text-red-400 border-red-800/80";
				case "SUPPORT": return "bg-blue-950/40 text-blue-400 border-blue-800/80";
				default: return "bg-background text-muted-foreground border-neutral-700";
			}
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="space-y-6"><div class="flex items-center gap-2 border-b border-border/80 pb-3">`);
			Users($$renderer, { class: "h-5 w-5 text-red-500" });
			$$renderer.push(`<!----> <h1 class="text-base font-black uppercase tracking-wider text-neutral-100">User Directory</h1></div> <div class="relative w-full">`);
			Search($$renderer, { class: "absolute left-3 top-3 h-4 w-4 text-neutral-500" });
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				type: "text",
				placeholder: "Search by username, email, or full name...",
				class: "h-10 w-full pl-9 bg-background/40 border-border focus:border-red-500 text-xs font-semibold text-foreground",
				get value() {
					return searchQuery;
				},
				set value($$value) {
					searchQuery = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <div class="space-y-3"><div class="flex items-center justify-between"><h3 class="text-xs font-black tracking-widest text-neutral-500 uppercase">Accounts Registry</h3> <span class="text-[10px] font-bold text-neutral-600">Showing ${escape_html(filteredProfiles().length)} of ${escape_html(data.profiles.length)} entries</span></div> `);
			if (filteredProfiles().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">No registered player accounts match your active search filters.</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="space-y-2"><!--[-->`);
				const each_array = ensure_array_like(filteredProfiles());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let profile = each_array[$$index];
					$$renderer.push(`<a${attr("href", `/admin/users/${stringify(profile.id)}`)} class="flex items-center justify-between border border-border/80 bg-background/40 p-4 rounded-xl transition duration-150 hover:border-neutral-700"><div class="flex items-center gap-4"><div class="rounded-lg bg-background p-2.5 border border-border text-muted-foreground">`);
					Users($$renderer, { class: "h-4 w-4 text-red-500" });
					$$renderer.push(`<!----></div> <div><div class="text-xs font-bold text-foreground">${escape_html(profile.username)} <span class="text-neutral-500">(${escape_html(profile.email)})</span></div> <div class="text-[10px] text-neutral-500 mt-1">Country: ${escape_html(profile.country || "Not Set")} • Registered ${escape_html(formatGameTime(profile.createdAt))}</div></div></div> <div class="flex items-center gap-3">`);
					Badge($$renderer, {
						class: "bg-amber-500/10 border border-amber-500/20 text-[8px] font-black tracking-widest px-2 py-0 h-5 text-amber-500 uppercase",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(profile.vipTier?.name || "BRONZE")}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Badge($$renderer, {
						class: `border text-[9px] font-bold px-2.5 py-0.5 rounded ${stringify(getRoleClass(profile.user.role))}`,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(profile.user.role)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Chevron_right($$renderer, { class: "h-4 w-4 text-neutral-500" });
					$$renderer.push(`<!----></div></a>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D1HZn6F4.js.map
