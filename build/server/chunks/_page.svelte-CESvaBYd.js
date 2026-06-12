import { a6 as escape_html, ab as spread_props, ac as sanitize_props, ad as slot } from './dev-CaPlrGUY.js';
import './client-YXYsPZz3.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import './internal2-D_aDT98M.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';

//#region node_modules/lucide-svelte/dist/icons/log-in.svelte
function Log_in($$renderer, $$props) {
	/**
	* @license lucide-svelte v1.0.1 - ISC
	*
	* ISC License
	*
	* Copyright (c) 2026 Lucide Icons and Contributors
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	* ---
	*
	* The following Lucide icons are derived from the Feather project:
	*
	* airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out
	*
	* The MIT License (MIT) (for the icons listed above)
	*
	* Copyright (c) 2013-present Cole Bemis
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	*
	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	* SOFTWARE.
	*
	*/
	Icon($$renderer, spread_props([
		{ name: "log-in" },
		sanitize_props($$props),
		{
			/**
			* @component @name LogIn
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTAgMTcgNS01LTUtNSIgLz4KICA8cGF0aCBkPSJNMTUgMTJIMyIgLz4KICA8cGF0aCBkPSJNMTUgM2g0YTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMmgtNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/log-in
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "m10 17 5-5-5-5" }],
				["path", { "d": "M15 12H3" }],
				["path", { "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }]
			],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {});
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region src/routes/auth/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		let isSubmitting = false;
		$$renderer.push(`<div class="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8"><div class="w-full max-w-md rounded-2xl border border-border bg-background/60 p-6 shadow-xl backdrop-blur-md space-y-6"><div class="text-center space-y-1.5"><h2 class="text-2xl font-black tracking-tight text-neutral-100 flex items-center justify-center gap-2">`);
		Log_in($$renderer, { class: "h-5 w-5 text-amber-500" });
		$$renderer.push(`<!----> Log In</h2> <p class="text-xs text-neutral-500 font-semibold">Welcome back! Please enter your credentials</p></div> <form method="POST" class="space-y-4">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex items-start gap-2 rounded-lg bg-red-950/40 border border-red-800/80 px-4 py-3 text-xs text-red-400 font-bold">`);
			Shield_alert($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
			$$renderer.push(`<!----> <span>${escape_html(form.error)}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="space-y-1.5"><label for="email" class="text-xs font-bold text-muted-foreground">Email Address</label> `);
		Input($$renderer, {
			id: "email",
			name: "email",
			type: "email",
			required: true,
			placeholder: "name@example.com",
			disabled: isSubmitting,
			class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground"
		});
		$$renderer.push(`<!----></div> <div class="space-y-1.5"><div class="flex items-center justify-between"><label for="password" class="text-xs font-bold text-muted-foreground">Password</label> <a href="/auth/forgot-password" class="text-[10px] font-bold text-amber-500 hover:text-amber-400 transition">Forgot Password?</a></div> `);
		Input($$renderer, {
			id: "password",
			name: "password",
			type: "password",
			required: true,
			placeholder: "••••••••",
			disabled: isSubmitting,
			class: "bg-background border-border focus:border-amber-500 text-xs h-10 font-medium text-foreground"
		});
		$$renderer.push(`<!----></div> `);
		Button($$renderer, {
			type: "submit",
			disabled: isSubmitting,
			class: "w-full h-11 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black rounded-lg shadow-md transition disabled:bg-background disabled:text-neutral-500",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html("Sign In")}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></form> <div class="text-center border-t border-border/80 pt-4 text-xs font-semibold text-neutral-500">New to Busta Bet? <a href="/auth/register" class="text-amber-500 hover:text-amber-400 transition ml-1">Register Now</a></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CESvaBYd.js.map
