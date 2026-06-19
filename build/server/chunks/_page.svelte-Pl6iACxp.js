import { a6 as escape_html, a2 as ensure_array_like, a1 as stringify, $ as attr_class } from './dev-CaPlrGUY.js';
import './client-BoiIEGkd.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { C as Circle_check } from './circle-check-C7FH6Bqa.js';
import { C as Coins } from './coins-C5crq7M4.js';
import { H as History } from './history-B7FIAMSl.js';
import { K as Key_round } from './key-round-DpBMRo95.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { T as Ticket } from './ticket-Rmcru2W5.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { f as formatGameTime } from './datetime-B0KKqfXg.js';
import { B as Badge } from './badge-Cl7OJJ39.js';
import './internal2-BO6BJIyN.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';
import './Icon-Bxs3Ke_h.js';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';

//#region src/routes/admin/users/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let isSubmitting = false;
		let activeTab = "bets";
		const getStatusClass = (status) => {
			switch (status) {
				case "COMPLETED":
				case "WON": return "bg-emerald-950/40 text-emerald-400 border-emerald-800/80";
				case "PENDING": return "bg-amber-950/40 text-amber-400 border-amber-800/80";
				default: return "bg-red-950/40 text-red-400 border-red-800/80";
			}
		};
		$$renderer.push(`<div class="space-y-6"><a href="/admin/users" class="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-foreground transition">`);
		Chevron_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span>Back to Users</span></a> `);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold max-w-lg">`);
			Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.success) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-green-950/40 border border-green-800/80 px-4 py-3 text-xs text-green-400 font-bold max-w-lg">`);
			Circle_check($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.message)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="rounded-2xl border border-border bg-background/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div><span class="text-[9px] font-black tracking-widest text-neutral-500 uppercase">Player Account Console</span> <h2 class="text-xl font-black text-neutral-100 mt-1">${escape_html(data.targetProfile.username)}</h2> <p class="text-xs text-neutral-500 font-medium">${escape_html(data.targetProfile.email)}</p></div> <div class="text-right shrink-0"><span class="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Active Wallet Balance</span> <div class="text-2xl font-black text-amber-500 tracking-tight">${escape_html(formatCurrency(data.balance, data.targetProfile.currency))}</div></div></div> <div class="grid grid-cols-1 gap-6 lg:grid-cols-3"><div class="space-y-6"><div class="rounded-xl border border-border bg-background/20 p-5 space-y-4"><h3 class="text-xs font-black text-foreground uppercase tracking-widest border-b border-border pb-2">Modify Status</h3> <form method="POST" action="?/updateProfile" class="space-y-3.5"><div class="space-y-1"><label for="role" class="text-xs font-bold text-neutral-500">System Role</label> `);
		$$renderer.select({
			id: "role",
			name: "role",
			value: data.targetProfile.user.role,
			class: "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
		}, ($$renderer) => {
			$$renderer.option({ value: "PLAYER" }, ($$renderer) => {
				$$renderer.push(`PLAYER`);
			});
			$$renderer.option({ value: "SUPPORT" }, ($$renderer) => {
				$$renderer.push(`SUPPORT`);
			});
			$$renderer.option({ value: "ADMIN" }, ($$renderer) => {
				$$renderer.push(`ADMIN`);
			});
		});
		$$renderer.push(`</div> <div class="space-y-1"><label for="vipTierId" class="text-xs font-bold text-neutral-500">VIP Loyalty Level</label> `);
		$$renderer.select({
			id: "vipTierId",
			name: "vipTierId",
			value: data.targetProfile.vipTierId,
			class: "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none"
		}, ($$renderer) => {
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(data.vipTiers);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tier = each_array[$$index];
				$$renderer.option({ value: tier.id }, ($$renderer) => {
					$$renderer.push(`${escape_html(tier.name)} (Min: ${escape_html(tier.minPoints)})`);
				});
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`</div> `);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full bg-red-600 hover:bg-red-500 text-foreground font-bold h-10 rounded-lg text-xs",
			children: ($$renderer) => {
				$$renderer.push(`<!---->Save Status`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form></div> <div class="rounded-xl border border-border bg-background/20 p-5 space-y-4"><h3 class="text-xs font-black text-foreground uppercase tracking-widest border-b border-border pb-2 flex items-center gap-1.5">`);
		Key_round($$renderer, { class: "h-4 w-4 text-red-500" });
		$$renderer.push(`<!----> <span>Reset Password</span></h3> <form method="POST" action="?/resetPassword" class="space-y-3.5"><div class="space-y-1.5"><label for="newPassword" class="text-xs font-bold text-neutral-500">New Password</label> `);
		Input($$renderer, {
			id: "newPassword",
			name: "newPassword",
			type: "password",
			required: true,
			placeholder: "••••••••",
			disabled: isSubmitting,
			class: "bg-background border-border focus:border-red-500 text-xs h-10 font-medium text-foreground"
		});
		$$renderer.push(`<!----></div> `);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full bg-red-600 hover:bg-red-500 text-foreground font-bold h-10 rounded-lg text-xs",
			children: ($$renderer) => {
				$$renderer.push(`<!---->Reset Password`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form></div> <div class="rounded-xl border border-border bg-background/20 p-5 space-y-4"><h3 class="text-xs font-black text-foreground uppercase tracking-widest border-b border-border pb-2 flex items-center gap-1.5">`);
		Coins($$renderer, { class: "h-4 w-4 text-red-500" });
		$$renderer.push(`<!----> <span>Balance Adjustment</span></h3> <form method="POST" action="?/manualAdjustment" class="space-y-3.5"><div class="space-y-1"><label for="type" class="text-xs font-bold text-neutral-500">Adjustment Type</label> <select id="type" name="type" required="" class="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground focus:border-red-500 focus:outline-none">`);
		$$renderer.option({ value: "DEPOSIT" }, ($$renderer) => {
			$$renderer.push(`DEPOSIT (Add Credit)`);
		});
		$$renderer.option({ value: "WITHDRAWAL" }, ($$renderer) => {
			$$renderer.push(`WITHDRAWAL (Deduct Debit)`);
		});
		$$renderer.push(`</select></div> <div class="space-y-1.5"><label for="amount" class="text-xs font-bold text-neutral-500">Amount</label> `);
		Input($$renderer, {
			id: "amount",
			name: "amount",
			type: "number",
			step: "0.01",
			required: true,
			placeholder: "500",
			disabled: isSubmitting,
			class: "bg-background border-border focus:border-red-500 text-xs h-10 font-medium text-foreground"
		});
		$$renderer.push(`<!----></div> `);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full bg-red-600 hover:bg-red-500 text-foreground font-bold h-10 rounded-lg text-xs",
			children: ($$renderer) => {
				$$renderer.push(`<!---->Process Adjustment`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form></div></div> <div class="lg:col-span-2 space-y-4"><div class="flex items-center gap-1.5 rounded-xl border border-border bg-background/20 p-1.5 w-full sm:w-auto">`);
		Button($$renderer, {
			variant: "ghost",
			onclick: () => activeTab = "bets",
			class: `h-9 flex-1 sm:flex-initial rounded-lg px-4 text-xs font-bold transition-all duration-150 gap-1.5
            ${activeTab === "bets" ? "bg-background text-red-500" : "text-muted-foreground hover:text-foreground"}`,
			children: ($$renderer) => {
				Ticket($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----> Bets History`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Button($$renderer, {
			variant: "ghost",
			onclick: () => activeTab = "transactions",
			class: `h-9 flex-1 sm:flex-initial rounded-lg px-4 text-xs font-bold transition-all duration-150 gap-1.5
            ${activeTab === "transactions" ? "bg-background text-red-500" : "text-muted-foreground hover:text-foreground"}`,
			children: ($$renderer) => {
				History($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----> Transactions Ledger`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> `);
		if (activeTab === "bets") {
			$$renderer.push("<!--[0-->");
			if (data.bets.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">No registered wagers logged for this player.</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="space-y-3"><!--[-->`);
				const each_array_1 = ensure_array_like(data.bets);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let bet = each_array_1[$$index_1];
					$$renderer.push(`<div class="rounded-xl border border-border bg-background/40 p-4 flex justify-between items-center gap-4"><div class="space-y-1"><div class="flex items-center gap-2"><span class="text-xs font-bold text-foreground">${escape_html(bet.game.homeTeam)} vs ${escape_html(bet.game.awayTeam)}</span> `);
					Badge($$renderer, {
						class: `border text-[8px] font-bold px-1.5 py-0 rounded ${stringify(getStatusClass(bet.status))}`,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(bet.status)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> <div class="text-[10px] text-neutral-500">Selection: <span class="text-amber-500 font-bold">${escape_html(bet.market.selection)}</span> • 
                    Odds: ${escape_html(bet.odds.toFixed(2))} • 
                    Placed ${escape_html(formatGameTime(bet.createdAt))}</div> <div class="text-[10px] text-muted-foreground font-bold">Stake: ${escape_html(formatCurrency(bet.stake, "USD"))} • 
                    Payout: <span class="text-emerald-500">${escape_html(formatCurrency(bet.potentialWin, "USD"))}</span></div></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (data.transactions.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="text-center text-xs font-semibold text-neutral-600 py-16 border border-dashed border-border rounded-lg">No transaction records in this player's ledger.</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="space-y-2"><!--[-->`);
				const each_array_2 = ensure_array_like(data.transactions);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let tx = each_array_2[$$index_2];
					$$renderer.push(`<div class="flex items-center justify-between border border-border bg-background/40 p-3.5 rounded-xl"><div><div class="text-xs font-bold text-foreground">${escape_html(tx.type)}</div> <div class="text-[10px] text-neutral-500 mt-1">Ref: ${escape_html(tx.reference)} • ${escape_html(formatGameTime(tx.createdAt))}</div></div> <div class="flex items-center gap-4"><span${attr_class(`text-xs font-black ${tx.type === "DEPOSIT" || tx.type === "PAYOUT" ? "text-emerald-500" : "text-red-500"}`)}>${escape_html(tx.type === "DEPOSIT" || tx.type === "PAYOUT" ? "+" : "-")}${escape_html(formatCurrency(tx.amount, tx.currency))}</span> `);
					Badge($$renderer, {
						class: `border text-[9px] font-bold px-2 py-0.5 rounded ${stringify(getStatusClass(tx.status))}`,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(tx.status)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Pl6iACxp.js.map
