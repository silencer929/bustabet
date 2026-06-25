import { $ as attr_class, a0 as attr, a1 as stringify, a2 as ensure_array_like, a3 as attributes, a4 as clsx$1, V as derived, a5 as store_get, a6 as escape_html, a7 as unsubscribe_stores, a8 as bind_props, a9 as run, aa as attr_style, ab as spread_props, ac as sanitize_props, ad as slot } from './dev-CaPlrGUY.js';
import { g as goto } from './client-BcEoK9sU.js';
import { p as page } from './stores-BYSQHgpu.js';
import { a as auth } from './auth.svelte-5dfylw8x.js';
import { I as Input } from './input-B-sfv3Ac.js';
import { f as formatCurrency } from './currency-CNh5wguG.js';
import { I as Icon } from './Icon-Bxs3Ke_h.js';
import { B as Bell } from './bell-Dw-NPsQW.js';
import { C as Chevron_left } from './chevron-left-BtVIPuBr.js';
import { C as Circle_question_mark } from './circle-question-mark-BkPuALat.js';
import { C as Coins } from './coins-C5crq7M4.js';
import { C as Crown } from './crown-DoXYmSdZ.js';
import { G as Gift } from './gift-MDqly1n4.js';
import { S as Search } from './search-BoMM9cGn.js';
import { s as sonnerContext, S as SonnerState, t as toastState, a as Share_2, c as cn, b as toast } from './toast-state.svelte-CsisbiTl.js';
import { S as Shield_alert } from './shield-alert-CZsJYw_o.js';
import { S as Shield_check } from './shield-check-BmDz_VIG.js';
import { T as Ticket } from './ticket-Rmcru2W5.js';
import { T as Trash_2 } from './trash-2-BUMxecEK.js';
import { T as Trophy } from './trophy-sfIAIiBq.js';
import { T as Tv } from './tv-DfW4MwCL.js';
import { U as User } from './user-lk2iYgH7.js';
import { W as Wallet } from './wallet-CAywWlao.js';
import { X } from './x-B7X57umf.js';
import { B as Button } from './button-Dgrh7fPh.js';
import { b as betslip } from './betslip.svelte-vgv1pvag.js';
import './internal2-Bg-Zk9-q.js';
import './index-DBqjc0Yf.js';
import './index-Bai2VLr5.js';

//#region src/lib/stores/wallet.svelte.ts
var WalletStore = class {
	balance = 0;
	currency = "USD";
	setWallet(balance, currency) {
		this.balance = balance;
		this.currency = currency;
	}
	deductStake(amount) {
		this.balance = Number((this.balance - amount).toFixed(2));
	}
	addFunds(amount) {
		this.balance = Number((this.balance + amount).toFixed(2));
	}
	reset() {
		this.balance = 0;
		this.currency = "USD";
	}
};
var wallet = new WalletStore();
//#endregion
//#region src/lib/stores/notifications.svelte.ts
var NotificationsStore = class {
	list = [];
	#unreadCount = derived(() => this.list.length);
	get unreadCount() {
		return this.#unreadCount();
	}
	set unreadCount($$value) {
		return this.#unreadCount($$value);
	}
	setList(notifications) {
		this.list = notifications;
	}
	markAsReadLocally(id) {
		this.list = this.list.filter((n) => n.id !== id);
	}
	reset() {
		this.list = [];
	}
};
var notificationsStore = new NotificationsStore();
//#endregion
//#region src/lib/stores/theme.svelte.ts
function createThemeStore() {
	let current = "dark";
	function toggle() {
		current = current === "dark" ? "light" : "dark";
	}
	return {
		get current() {
			return current;
		},
		toggle
	};
}
var theme = createThemeStore();
//#endregion
//#region node_modules/lucide-svelte/dist/icons/flame.svelte
function Flame($$renderer, $$props) {
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
		{ name: "flame" },
		sanitize_props($$props),
		{
			/**
			* @component @name Flame
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM3ExIDQgNCA2LjV0MyA1LjVhMSAxIDAgMCAxLTE0IDAgNSA1IDAgMCAxIDEtMyAxIDEgMCAwIDAgNSAwYzAtMi0xLjUtMy0xLjUtNXEwLTIgMi41LTQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/flame
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" }]],
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
//#region node_modules/lucide-svelte/dist/icons/folder-closed.svelte
function Folder_closed($$renderer, $$props) {
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
		{ name: "folder-closed" },
		sanitize_props($$props),
		{
			/**
			* @component @name FolderClosed
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMjBhMiAyIDAgMCAwIDItMlY4YTIgMiAwIDAgMC0yLTJoLTcuOWEyIDIgMCAwIDEtMS42OS0uOUw5LjYgMy45QTIgMiAwIDAgMCA3LjkzIDNINGEyIDIgMCAwIDAtMiAydjEzYTIgMiAwIDAgMCAyIDJaIiAvPgogIDxwYXRoIGQ9Ik0yIDEwaDIwIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/folder-closed
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }], ["path", { "d": "M2 10h20" }]],
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
//#region node_modules/lucide-svelte/dist/icons/folder-up.svelte
function Folder_up($$renderer, $$props) {
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
		{ name: "folder-up" },
		sanitize_props($$props),
		{
			/**
			* @component @name FolderUp
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMjBhMiAyIDAgMCAwIDItMlY4YTIgMiAwIDAgMC0yLTJoLTcuOWEyIDIgMCAwIDEtMS42OS0uOUw5LjYgMy45QTIgMiAwIDAgMCA3LjkzIDNINGEyIDIgMCAwIDAtMiAydjEzYTIgMiAwIDAgMCAyIDJaIiAvPgogIDxwYXRoIGQ9Ik0xMiAxMHY2IiAvPgogIDxwYXRoIGQ9Im05IDEzIDMtMyAzIDMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/folder-up
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }],
				["path", { "d": "M12 10v6" }],
				["path", { "d": "m9 13 3-3 3 3" }]
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
//#region node_modules/lucide-svelte/dist/icons/house.svelte
function House($$renderer, $$props) {
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
		{ name: "house" },
		sanitize_props($$props),
		{
			/**
			* @component @name House
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiIC8+CiAgPHBhdGggZD0iTTMgMTBhMiAyIDAgMCAxIC43MDktMS41MjhsNy02YTIgMiAwIDAgMSAyLjU4MiAwbDcgNkEyIDIgMCAwIDEgMjEgMTB2OWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/house
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }], ["path", { "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }]],
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
//#region node_modules/lucide-svelte/dist/icons/loader-circle.svelte
function Loader_circle($$renderer, $$props) {
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
		{ name: "loader-circle" },
		sanitize_props($$props),
		{
			/**
			* @component @name LoaderCircle
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgMTJhOSA5IDAgMSAxLTYuMjE5LTguNTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/loader-circle
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M21 12a9 9 0 1 1-6.219-8.56" }]],
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
//#region node_modules/lucide-svelte/dist/icons/log-out.svelte
function Log_out($$renderer, $$props) {
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
		{ name: "log-out" },
		sanitize_props($$props),
		{
			/**
			* @component @name LogOut
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTYgMTcgNS01LTUtNSIgLz4KICA8cGF0aCBkPSJNMjEgMTJIOSIgLz4KICA8cGF0aCBkPSJNOSAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/log-out
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "m16 17 5-5-5-5" }],
				["path", { "d": "M21 12H9" }],
				["path", { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }]
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
//#region node_modules/lucide-svelte/dist/icons/menu.svelte
function Menu($$renderer, $$props) {
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
		{ name: "menu" },
		sanitize_props($$props),
		{
			/**
			* @component @name Menu
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCA1aDE2IiAvPgogIDxwYXRoIGQ9Ik00IDEyaDE2IiAvPgogIDxwYXRoIGQ9Ik00IDE5aDE2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/menu
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M4 5h16" }],
				["path", { "d": "M4 12h16" }],
				["path", { "d": "M4 19h16" }]
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
//#region node_modules/lucide-svelte/dist/icons/moon.svelte
function Moon($$renderer, $$props) {
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
		{ name: "moon" },
		sanitize_props($$props),
		{
			/**
			* @component @name Moon
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAuOTg1IDEyLjQ4NmE5IDkgMCAxIDEtOS40NzMtOS40NzJjLjQwNS0uMDIyLjYxNy40Ni40MDIuODAzYTYgNiAwIDAgMCA4LjI2OCA4LjI2OGMuMzQ0LS4yMTUuODI1LS4wMDQuODAzLjQwMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/moon
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]],
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
//#region node_modules/lucide-svelte/dist/icons/shield.svelte
function Shield($$renderer, $$props) {
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
		{ name: "shield" },
		sanitize_props($$props),
		{
			/**
			* @component @name Shield
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMTNjMCA1LTMuNSA3LjUtNy42NiA4Ljk1YTEgMSAwIDAgMS0uNjctLjAxQzcuNSAyMC41IDQgMTggNCAxM1Y2YTEgMSAwIDAgMSAxLTFjMiAwIDQuNS0xLjIgNi4yNC0yLjcyYTEuMTcgMS4xNyAwIDAgMSAxLjUyIDBDMTQuNTEgMy44MSAxNyA1IDE5IDVhMSAxIDAgMCAxIDEgMXoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/shield
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }]],
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
//#region node_modules/lucide-svelte/dist/icons/smartphone.svelte
function Smartphone($$renderer, $$props) {
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
		{ name: "smartphone" },
		sanitize_props($$props),
		{
			/**
			* @component @name Smartphone
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMjAiIHg9IjUiIHk9IjIiIHJ4PSIyIiByeT0iMiIgLz4KICA8cGF0aCBkPSJNMTIgMThoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/smartphone
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["rect", {
				"width": "14",
				"height": "20",
				"x": "5",
				"y": "2",
				"rx": "2",
				"ry": "2"
			}], ["path", { "d": "M12 18h.01" }]],
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
//#region node_modules/lucide-svelte/dist/icons/sun.svelte
function Sun($$renderer, $$props) {
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
		{ name: "sun" },
		sanitize_props($$props),
		{
			/**
			* @component @name Sun
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiAvPgogIDxwYXRoIGQ9Ik0xMiAydjIiIC8+CiAgPHBhdGggZD0iTTEyIDIwdjIiIC8+CiAgPHBhdGggZD0ibTQuOTMgNC45MyAxLjQxIDEuNDEiIC8+CiAgPHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJNMiAxMmgyIiAvPgogIDxwYXRoIGQ9Ik0yMCAxMmgyIiAvPgogIDxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJtMTkuMDcgNC45My0xLjQxIDEuNDEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/sun
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "4"
				}],
				["path", { "d": "M12 2v2" }],
				["path", { "d": "M12 20v2" }],
				["path", { "d": "m4.93 4.93 1.41 1.41" }],
				["path", { "d": "m17.66 17.66 1.41 1.41" }],
				["path", { "d": "M2 12h2" }],
				["path", { "d": "M20 12h2" }],
				["path", { "d": "m6.34 17.66-1.41 1.41" }],
				["path", { "d": "m19.07 4.93-1.41 1.41" }]
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
//#region node_modules/lucide-svelte/dist/icons/target.svelte
function Target($$renderer, $$props) {
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
		{ name: "target" },
		sanitize_props($$props),
		{
			/**
			* @component @name Target
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI2IiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/target
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "10"
				}],
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "6"
				}],
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "2"
				}]
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
//#region node_modules/lucide-svelte/dist/icons/user-round.svelte
function User_round($$renderer, $$props) {
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
		{ name: "user-round" },
		sanitize_props($$props),
		{
			/**
			* @component @name UserRound
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiIC8+CiAgPHBhdGggZD0iTTIwIDIxYTggOCAwIDAgMC0xNiAwIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/user-round
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["circle", {
				"cx": "12",
				"cy": "8",
				"r": "5"
			}], ["path", { "d": "M20 21a8 8 0 0 0-16 0" }]],
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
//#region src/lib/components/sportsbook/SportsScroll.svelte
function SportsScroll($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		function isActive(sportPath) {
			return store_get($$store_subs ??= {}, "$page", page).url.pathname === sportPath;
		}
		const sports = [
			{
				name: "All",
				path: "/sportsbook",
				icon: Flame
			},
			{
				name: "Football",
				path: "/sportsbook/football",
				icon: Trophy
			},
			{
				name: "NBA",
				path: "/sportsbook/nba",
				icon: Trophy
			},
			{
				name: "Hockey",
				path: "/sportsbook/nhl",
				icon: Tv
			},
			{
				name: "MMA",
				path: "/sportsbook/mma",
				icon: Flame
			},
			{
				name: "NFL",
				path: "/sportsbook/nfl",
				icon: Trophy
			},
			{
				name: "MLB",
				path: "/sportsbook/mlb",
				icon: Folder_closed
			},
			{
				name: "Tennis",
				path: "/sportsbook/tennis-atp",
				icon: Target
			},
			{
				name: "Boxing",
				path: "/sportsbook/boxing",
				icon: Target
			},
			{
				name: "Cricket",
				path: "/sportsbook/cricket",
				icon: Trophy
			}
		];
		$$renderer.push(`<div class="w-full border-b border-border/60 bg-background px-4 py-2.5"><div class="no-scrollbar flex items-center gap-2 overflow-x-auto scroll-smooth svelte-100t0tx"><!--[-->`);
		const each_array = ensure_array_like(sports);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let sport = each_array[$$index];
			$$renderer.push(`<a${attr("href", sport.path)}${attr_class(`flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 py-1 text-xs font-bold transition-all duration-150 ${isActive(sport.path) ? "bg-amber-500 border-amber-500 text-neutral-950 font-black shadow-sm" : "border-border bg-background/30 text-muted-foreground hover:border-neutral-700 hover:text-foreground"}`)}>`);
			if (sport.icon) {
				$$renderer.push("<!--[-->");
				sport.icon($$renderer, { class: "h-3.5 w-3.5" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <span>${escape_html(sport.name)}</span></a>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/layout/Header.svelte
function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let searchQuery = "";
		let isSearchOpen = false;
		const isDark = derived(() => theme.current === "dark");
		const isAdminRoute = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin"));
		function handleSearchKeyDown(event) {
			if (event.key === "Enter" && searchQuery.trim().length > 0) {
				goto();
				searchQuery = "";
				isSearchOpen = false;
			}
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<header class="sticky top-0 z-40 w-full border-b border-border bg-background shadow-sm transition-colors duration-150"><div class="flex h-14 items-center justify-between px-2 sm:px-4 gap-1 sm:gap-3"><div class="flex items-center gap-1 sm:gap-2 shrink-0"><button class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground md:hidden cursor-pointer" aria-label="Toggle Menu">`);
			Menu($$renderer, { class: "h-4.5 w-4.5" });
			$$renderer.push(`<!----></button> <a href="/" class="flex items-center"><img src="/logos/logo.png" alt="BUSTA Bet" class="h-8 w-8 sm:h-9 sm:w-9 object-contain rounded-lg"/></a> <button class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground md:hidden cursor-pointer">`);
			Search($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----></button></div> <div class="hidden flex-1 max-w-xs lg:max-w-sm mx-4 md:block relative">`);
			Search($$renderer, { class: "absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" });
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				type: "text",
				onkeydown: handleSearchKeyDown,
				placeholder: "Search matches... (Press Enter)",
				class: "h-9 w-full pl-9 pr-4 bg-muted/40 border-border text-[11px] font-semibold focus:border-primary rounded-lg text-foreground",
				get value() {
					return searchQuery;
				},
				set value($$value) {
					searchQuery = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div> <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">`);
			if (auth.isAuthenticated) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex h-8 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1">`);
				Wallet($$renderer, { class: "h-3.5 w-3.5 text-primary" });
				$$renderer.push(`<!----> <span class="text-[11px] font-black text-foreground tracking-tight">${escape_html(formatCurrency(wallet.balance, wallet.currency))}</span></div> <button class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition cursor-pointer">`);
				if (isDark()) {
					$$renderer.push("<!--[0-->");
					Sun($$renderer, { class: "h-3.5 w-3.5" });
				} else {
					$$renderer.push("<!--[-1-->");
					Moon($$renderer, { class: "h-3.5 w-3.5" });
				}
				$$renderer.push(`<!--]--></button> <a href="/wallet/deposit"><button class="h-8 px-3.5 bg-primary text-[11px] font-black text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm transition active:scale-95 cursor-pointer">Deposit</button></a> <div class="relative"><button class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition cursor-pointer">`);
				if (notificationsStore.unreadCount > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-destructive rounded-full text-[8px] font-black text-white flex items-center justify-center">${escape_html(notificationsStore.unreadCount)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				Bell($$renderer, { class: "h-3.5 w-3.5" });
				$$renderer.push(`<!----></button> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <button class="h-8 flex items-center justify-center gap-1.5 border border-border bg-muted/20 px-2 text-muted-foreground hover:text-foreground rounded-lg cursor-pointer transition">`);
				User_round($$renderer, { class: "h-3.5 w-3.5 text-primary" });
				$$renderer.push(`<!----> <span class="hidden md:inline text-[11px] font-bold text-foreground">${escape_html(auth.user?.username)}</span></button>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<button class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition cursor-pointer">`);
				if (isDark()) {
					$$renderer.push("<!--[0-->");
					Sun($$renderer, { class: "h-3.5 w-3.5" });
				} else {
					$$renderer.push("<!--[-1-->");
					Moon($$renderer, { class: "h-3.5 w-3.5" });
				}
				$$renderer.push(`<!--]--></button> <a href="/auth/login" class="text-[11px] font-bold text-muted-foreground hover:text-foreground px-2 py-1.5">Log In</a> <a href="/auth/register"><button class="h-8 px-3.5 bg-primary text-[11px] font-black text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm cursor-pointer">Register</button></a>`);
			}
			$$renderer.push(`<!--]--></div></div> `);
			if (isSearchOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex items-center px-3 py-2 border-t border-border bg-background md:hidden relative">`);
				Search($$renderer, { class: "absolute left-6 top-5 h-3.5 w-3.5 text-muted-foreground" });
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					type: "text",
					onkeydown: handleSearchKeyDown,
					placeholder: "Search matches... (Press Enter)",
					class: "h-9 w-full pl-9 pr-10 bg-muted/40 border-border text-[11px] font-semibold focus:border-primary rounded-lg text-foreground",
					get value() {
						return searchQuery;
					},
					set value($$value) {
						searchQuery = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <button class="absolute right-6 top-5 text-muted-foreground hover:text-foreground">`);
				X($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----></button></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (!isAdminRoute()) {
				$$renderer.push("<!--[0-->");
				SportsScroll($$renderer);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></header>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/layout/Sidebar.svelte
function Sidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		function isActive(sportPath) {
			return store_get($$store_subs ??= {}, "$page", page).url.pathname === sportPath;
		}
		const sportsList = [
			{
				name: "All Sports",
				path: "/sportsbook",
				icon: Flame
			},
			{
				name: "Football",
				path: "/sportsbook/football",
				icon: Trophy
			},
			{
				name: "NBA",
				path: "/sportsbook/nba",
				icon: Trophy
			},
			{
				name: "Euroleague",
				path: "/sportsbook/euroleague",
				icon: Trophy
			},
			{
				name: "NHL",
				path: "/sportsbook/nhl",
				icon: Tv
			},
			{
				name: "NFL",
				path: "/sportsbook/nfl",
				icon: Trophy
			},
			{
				name: "MLB",
				path: "/sportsbook/mlb",
				icon: Folder_closed
			},
			{
				name: "MMA",
				path: "/sportsbook/mma",
				icon: Flame
			},
			{
				name: "Tennis ATP",
				path: "/sportsbook/tennis-atp",
				icon: Trophy
			},
			{
				name: "Tennis WTA",
				path: "/sportsbook/tennis-wta",
				icon: Trophy
			},
			{
				name: "Rugby NRL",
				path: "/sportsbook/rugby-nrl",
				icon: Trophy
			},
			{
				name: "AFL",
				path: "/sportsbook/afl",
				icon: Trophy
			}
		];
		$$renderer.push(`<aside class="fixed top-16 bottom-0 left-0 z-30 hidden w-64 border-r border-border/80 bg-background px-4 py-6 lg:block"><div class="mb-4 px-3 text-[10px] font-black tracking-widest text-neutral-500 uppercase">Sports</div> <nav class="space-y-1 overflow-y-auto max-h-[calc(100vh-10rem)] custom-scrollbar"><!--[-->`);
		const each_array = ensure_array_like(sportsList);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let sport = each_array[$$index];
			$$renderer.push(`<a${attr("href", sport.path)}${attr_class(`flex h-10 items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-150 ${isActive(sport.name.toLowerCase().replace(" ", "-")) ? "bg-amber-500 text-neutral-950 font-black" : "text-muted-foreground hover:bg-background/60 hover:text-foreground"}`)}>`);
			if (sport.icon) {
				$$renderer.push("<!--[-->");
				sport.icon($$renderer, { class: "h-4 w-4 shrink-0" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <span class="truncate">${escape_html(sport.name)}</span></a>`);
		}
		$$renderer.push(`<!--]--></nav></aside>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/layout/MenuDrawer.svelte
function MenuDrawer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { isOpen = false } = $$props;
		const isActive = (path) => store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(path);
		const navItems = [
			{
				name: "My Account",
				path: "/profile",
				icon: User_round
			},
			{
				name: "Sportsbook",
				path: "/sportsbook",
				icon: House
			},
			{
				name: "Wallet",
				path: "/wallet",
				icon: Wallet
			},
			{
				name: "Promotions",
				path: "/promotions",
				icon: Gift
			},
			{
				name: "VIP Rewards",
				path: "/vip",
				icon: Crown
			},
			{
				name: "Referrals",
				path: "/referrals",
				icon: Share_2
			},
			{
				name: "Support",
				path: "/support",
				icon: Circle_question_mark
			}
		];
		if (isOpen) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" aria-label="Close Navigation"></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <aside${attr_class(`fixed top-0 bottom-0 right-0 z-50 w-72 border-l border-border bg-background px-5 py-6 shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`)}><div class="flex items-center justify-between border-b border-border pb-4 mb-6"><span class="text-xs font-black tracking-widest text-muted-foreground uppercase">Navigation</span> <button class="text-neutral-500 hover:text-foreground transition">`);
		X($$renderer, { class: "h-5 w-5" });
		$$renderer.push(`<!----></button></div> <div class="flex h-[calc(100vh-8rem)] flex-col justify-between"><nav class="space-y-1.5"><!--[-->`);
		const each_array = ensure_array_like(navItems);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<a${attr("href", item.path)}${attr_class(`flex h-11 items-center justify-between rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${isActive(item.path) ? "bg-amber-500 text-neutral-950 font-black" : "text-muted-foreground hover:bg-background/60 hover:text-foreground"}`)}><div class="flex items-center gap-3">`);
			if (item.icon) {
				$$renderer.push("<!--[-->");
				item.icon($$renderer, { class: "h-4 w-4" });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <span>${escape_html(item.name)}</span></div> `);
			Chevron_left($$renderer, { class: "h-3.5 w-3.5 opacity-60" });
			$$renderer.push(`<!----></a>`);
		}
		$$renderer.push(`<!--]--> `);
		if (auth.isAdmin) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="border-t border-border my-4 pt-4"><div class="px-3 mb-2 text-[10px] font-black tracking-widest text-neutral-500 uppercase">Management</div> <a href="/admin/dashboard"${attr_class(`flex h-11 items-center justify-between rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${isActive("/admin") ? "bg-red-600 text-foreground" : "text-red-400 hover:bg-red-950/20 hover:text-red-300"}`)}><div class="flex items-center gap-3">`);
			Shield($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----> <span>Admin Panel</span></div> `);
			Chevron_left($$renderer, { class: "h-3.5 w-3.5 opacity-60" });
			$$renderer.push(`<!----></a></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></nav> `);
		if (auth.isAuthenticated) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form action="/auth?/logout" method="POST" class="border-t border-border pt-4">`);
			Button($$renderer, {
				type: "submit",
				variant: "ghost",
				class: "flex h-11 w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-xs font-bold text-muted-foreground hover:bg-red-950/10 hover:text-red-400 transition",
				children: ($$renderer) => {
					Log_out($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> <span>Log Out</span>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></aside>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { isOpen });
	});
}
//#endregion
//#region src/lib/components/layout/MobileNav.svelte
function MobileNav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { isBetslipOpen = false } = $$props;
		function isActive(path) {
			return store_get($$store_subs ??= {}, "$page", page).url.pathname === path;
		}
		$$renderer.push(`<div class="fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t border-border/80 bg-background/95 shadow-lg backdrop-blur-md md:hidden"><a href="/sportsbook"${attr_class(`flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive("/sportsbook") ? "text-amber-500" : "text-neutral-500 hover:text-neutral-300"}`)}>`);
		House($$renderer, { class: "h-5 w-5" });
		$$renderer.push(`<!----> <span class="text-[9px] font-bold tracking-wide">Sports</span></a> <a href="/wallet"${attr_class(`flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive("/wallet") ? "text-amber-500" : "text-neutral-500 hover:text-neutral-300"}`)}>`);
		Wallet($$renderer, { class: "h-5 w-5" });
		$$renderer.push(`<!----> <span class="text-[9px] font-bold tracking-wide">Wallet</span></a> <button${attr_class(`relative flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200 ${isBetslipOpen ? "text-amber-500" : "text-neutral-500 hover:text-neutral-300"}`)}>`);
		if (betslip.count > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="absolute top-2.5 right-7 rounded-full bg-amber-500 px-1.5 py-0.5 text-[8px] font-black leading-none text-neutral-950 animate-bounce">${escape_html(betslip.count)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		Ticket($$renderer, { class: "h-5 w-5" });
		$$renderer.push(`<!----> <span class="text-[9px] font-bold tracking-wide">Betslip</span></button> <a href="/support"${attr_class(`flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive("/support") ? "text-amber-500" : "text-neutral-500 hover:text-neutral-300"}`)}>`);
		Circle_question_mark($$renderer, { class: "h-5 w-5" });
		$$renderer.push(`<!----> <span class="text-[9px] font-bold tracking-wide">Support</span></a> <a href="/profile"${attr_class(`flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive("/profile") ? "text-amber-500" : "text-neutral-500 hover:text-neutral-300"}`)}>`);
		User($$renderer, { class: "h-5 w-5" });
		$$renderer.push(`<!----> <span class="text-[9px] font-bold tracking-wide">Profile</span></a></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { isBetslipOpen });
	});
}
//#endregion
//#region src/lib/components/layout/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		$$renderer.push(`<footer class="border-t border-border/80 bg-background px-6 py-12 text-muted-foreground pb-24 md:pb-12"><div class="mx-auto max-w-7xl space-y-8"><div class="grid grid-cols-1 gap-8 md:grid-cols-3"><div class="space-y-4"><span class="text-base font-black tracking-wider text-foreground">Busta<span class="text-amber-500">BET</span></span> <p class="text-xs leading-relaxed text-neutral-500">Busta BET is a fast, secure betting platform designed to offer competitive odds across premier global sports leagues with instant payouts via mobile money, PayPal, and cryptocurrencies.</p></div> <div class="space-y-3"><h4 class="text-xs font-black tracking-widest text-neutral-300 uppercase">Information</h4> <ul class="space-y-2 text-xs font-semibold"><li><a href="/promotions" class="hover:text-amber-500 transition">Promotions &amp; Bonuses</a></li> <li><a href="/vip" class="hover:text-amber-500 transition">VIP Loyalty Rewards</a></li> <li><a href="/referrals" class="hover:text-amber-500 transition">Referral Commissions</a></li> <li><a href="/support" class="hover:text-amber-500 transition">Customer Help Center</a></li></ul></div> <div class="space-y-3"><h4 class="text-xs font-black tracking-widest text-neutral-300 uppercase">Security &amp; Licensing</h4> <div class="space-y-3 text-xs leading-relaxed text-neutral-500"><div class="flex items-start gap-2.5">`);
		Shield_check($$renderer, { class: "h-4 w-4 text-emerald-500 shrink-0 mt-0.5" });
		$$renderer.push(`<!----> <span>Fully licensed and regulated under regional sports betting frameworks. All user data is encrypted.</span></div> <div class="flex items-start gap-2.5">`);
		Shield_alert($$renderer, { class: "h-4 w-4 text-amber-500 shrink-0 mt-0.5" });
		$$renderer.push(`<!----> <span class="text-muted-foreground">Strictly 18+. Responsible gaming is highly encouraged. Gambling can be addictive.</span></div></div></div></div> <div class="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"><div class="flex flex-wrap items-center gap-4 text-xs font-bold text-neutral-600"><span class="uppercase tracking-widest">Supported Gateways:</span> <span class="hover:text-muted-foreground transition">M-PESA</span> <span class="hover:text-muted-foreground transition">PAYPAL</span> <span class="hover:text-muted-foreground transition">USDT / BTC</span></div> <div class="text-[10px] font-bold text-neutral-600 tracking-wider">© ${escape_html(currentYear)} Busta BET. All rights reserved.</div></div></div></footer>`);
	});
}
//#endregion
//#region node_modules/svelte-sonner/dist/Loader.svelte
var bars = Array(12).fill(0);
function Loader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { visible, class: className } = $$props;
		$$renderer.push(`<div${attr_class(clsx$1(["sonner-loading-wrapper", className].filter(Boolean).join(" ")))}${attr("data-visible", visible)}><div class="sonner-spinner"><!--[-->`);
		const each_array = ensure_array_like(bars);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			each_array[i];
			$$renderer.push(`<div class="sonner-loading-bar"></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region node_modules/svelte-sonner/dist/types.js
function isAction(action) {
	return action.label !== void 0;
}
var GAP$1 = 14;
var TIME_BEFORE_UNMOUNT = 200;
var DEFAULT_TOAST_CLASSES = {
	toast: "",
	title: "",
	description: "",
	loader: "",
	closeButton: "",
	cancelButton: "",
	actionButton: "",
	action: "",
	warning: "",
	error: "",
	success: "",
	default: "",
	info: "",
	loading: ""
};
function Toast($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { toast, index, expanded, invert: invertFromToaster, position, visibleToasts, expandByDefault, closeButton: closeButtonFromToaster, interacting, cancelButtonStyle = "", actionButtonStyle = "", duration: durationFromToaster, descriptionClass = "", classes: classesProp, unstyled = false, loadingIcon, successIcon, errorIcon, warningIcon, closeIcon, infoIcon, defaultRichColors = false, swipeDirections: swipeDirectionsProp, closeButtonAriaLabel, pauseWhenPageIsHidden, $$slots, $$events, ...restProps } = $$props;
		const defaultClasses = { ...DEFAULT_TOAST_CLASSES };
		let mounted = false;
		let removed = false;
		let swiping = false;
		let swipeOut = false;
		let isSwiped = false;
		let offsetBeforeRemove = 0;
		let initialHeight = 0;
		toast.duration;
		let swipeOutDirection = null;
		const isFront = derived(() => index === 0);
		const isVisible = derived(() => index + 1 <= visibleToasts);
		const toastType = derived(() => toast.type);
		const dismissible = derived(() => toast.dismissible !== void 0 ? toast.dismissible !== false : toast.dismissable !== false);
		const toastClass = derived(() => toast.class || "");
		const toastDescriptionClass = derived(() => toast.descriptionClass || "");
		const heightIndex = derived(() => toastState.heights.findIndex((height) => height.toastId === toast.id) || 0);
		const closeButton = derived(() => toast.closeButton ?? closeButtonFromToaster);
		const coords = derived(() => position.split("-"));
		const toastsHeightBefore = derived(() => toastState.heights.reduce((prev, curr, reducerIndex) => {
			if (reducerIndex >= heightIndex()) return prev;
			return prev + curr.height;
		}, 0));
		const invert = derived(() => toast.invert || invertFromToaster);
		const disabled = derived(() => toastType() === "loading");
		const classes = derived(() => ({
			...defaultClasses,
			...classesProp
		}));
		const offset = derived(() => Math.round(heightIndex() * GAP$1 + toastsHeightBefore()));
		function deleteToast() {
			removed = true;
			offsetBeforeRemove = offset();
			toastState.removeHeight(toast.id);
			setTimeout(() => {
				toastState.remove(toast.id);
			}, TIME_BEFORE_UNMOUNT);
		}
		const icon = derived(() => {
			if (toast.icon) return toast.icon;
			if (toastType() === "success") return successIcon;
			if (toastType() === "error") return errorIcon;
			if (toastType() === "warning") return warningIcon;
			if (toastType() === "info") return infoIcon;
			if (toastType() === "loading") return loadingIcon;
			return null;
		});
		function LoadingIcon($$renderer) {
			if (loadingIcon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(clsx$1(cn(classes()?.loader, toast?.classes?.loader, "sonner-loader")))}${attr("data-visible", toastType() === "loading")}>`);
				loadingIcon($$renderer);
				$$renderer.push(`<!----></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				Loader($$renderer, {
					class: cn(classes()?.loader, toast.classes?.loader),
					visible: toastType() === "loading"
				});
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<li${attr("tabindex", 0)}${attr_class(clsx$1(cn(restProps.class, toastClass(), classes()?.toast, toast?.classes?.toast, classes()?.[toastType()], toast?.classes?.[toastType()])))}${attr("aria-live", toast.important ? "assertive" : "polite")} aria-atomic="true" data-sonner-toast=""${attr("data-rich-colors", toast.richColors ?? defaultRichColors)}${attr("data-styled", !(toast.component || toast.unstyled || unstyled))}${attr("data-mounted", mounted)}${attr("data-promise", Boolean(toast.promise))}${attr("data-swiped", isSwiped)}${attr("data-removed", removed)}${attr("data-visible", isVisible())}${attr("data-y-position", coords()[0])}${attr("data-x-position", coords()[1])}${attr("data-index", index)}${attr("data-front", isFront())}${attr("data-swiping", swiping)}${attr("data-dismissible", dismissible())}${attr("data-type", toastType())}${attr("data-invert", invert())}${attr("data-swipe-out", swipeOut)}${attr("data-swipe-direction", swipeOutDirection)}${attr("data-expanded", Boolean(expanded || expandByDefault && mounted))}${attr_style(`${restProps.style} ${toast.style}`, {
			"--index": index,
			"--toasts-before": index,
			"--z-index": toastState.toasts.length - index,
			"--offset": `${removed ? offsetBeforeRemove : offset()}px`,
			"--initial-height": expandByDefault ? "auto" : `${initialHeight}px`
		})}>`);
		if (closeButton() && !toast.component && toastType() !== "loading" && closeIcon !== null) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button${attr("aria-label", closeButtonAriaLabel)}${attr("data-disabled", disabled())} data-close-button=""${attr_class(clsx$1(cn(classes()?.closeButton, toast?.classes?.closeButton)))}>`);
			closeIcon?.($$renderer);
			$$renderer.push(`<!----></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (toast.component) {
			$$renderer.push("<!--[0-->");
			const Component = toast.component;
			if (Component) {
				$$renderer.push("<!--[-->");
				Component($$renderer, spread_props([toast.componentProps, { closeToast: deleteToast }]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		} else {
			$$renderer.push("<!--[-1-->");
			if ((toastType() || toast.icon || toast.promise) && toast.icon !== null && (icon() !== null || toast.icon)) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div data-icon=""${attr_class(clsx$1(cn(classes()?.icon, toast?.classes?.icon)))}>`);
				if (toast.promise || toastType() === "loading") {
					$$renderer.push("<!--[0-->");
					if (toast.icon) {
						$$renderer.push("<!--[0-->");
						if (toast.icon) {
							$$renderer.push("<!--[-->");
							toast.icon($$renderer, {});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					} else {
						$$renderer.push("<!--[-1-->");
						LoadingIcon($$renderer);
					}
					$$renderer.push(`<!--]-->`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (toast.type !== "loading") {
					$$renderer.push("<!--[0-->");
					if (toast.icon) {
						$$renderer.push("<!--[0-->");
						if (toast.icon) {
							$$renderer.push("<!--[-->");
							toast.icon($$renderer, {});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					} else if (toastType() === "success") {
						$$renderer.push("<!--[1-->");
						successIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else if (toastType() === "error") {
						$$renderer.push("<!--[2-->");
						errorIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else if (toastType() === "warning") {
						$$renderer.push("<!--[3-->");
						warningIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else if (toastType() === "info") {
						$$renderer.push("<!--[4-->");
						infoIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div data-content=""${attr_class(clsx$1(cn(classes()?.content, toast?.classes?.content)))}><div data-title=""${attr_class(clsx$1(cn(classes()?.title, toast?.classes?.title)))}>`);
			if (toast.title) {
				$$renderer.push("<!--[0-->");
				if (typeof toast.title !== "string") {
					$$renderer.push("<!--[0-->");
					const Title = toast.title;
					if (Title) {
						$$renderer.push("<!--[-->");
						Title($$renderer, spread_props([toast.componentProps]));
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`${escape_html(toast.title)}`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (toast.description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div data-description=""${attr_class(clsx$1(cn(descriptionClass, toastDescriptionClass(), classes()?.description, toast.classes?.description)))}>`);
				if (typeof toast.description !== "string") {
					$$renderer.push("<!--[0-->");
					const Description = toast.description;
					if (Description) {
						$$renderer.push("<!--[-->");
						Description($$renderer, spread_props([toast.componentProps]));
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`${escape_html(toast.description)}`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (toast.cancel) {
				$$renderer.push("<!--[0-->");
				if (typeof toast.cancel === "function") {
					$$renderer.push("<!--[0-->");
					if (toast.cancel) {
						$$renderer.push("<!--[-->");
						toast.cancel($$renderer, {});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else if (isAction(toast.cancel)) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<button data-button="" data-cancel=""${attr_style(toast.cancelButtonStyle ?? cancelButtonStyle)}${attr_class(clsx$1(cn(classes()?.cancelButton, toast?.classes?.cancelButton)))}>${escape_html(toast.cancel.label)}</button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (toast.action) {
				$$renderer.push("<!--[0-->");
				if (typeof toast.action === "function") {
					$$renderer.push("<!--[0-->");
					if (toast.action) {
						$$renderer.push("<!--[-->");
						toast.action($$renderer, {});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else if (isAction(toast.action)) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<button data-button=""${attr_style(toast.actionButtonStyle ?? actionButtonStyle)}${attr_class(clsx$1(cn(classes()?.actionButton, toast?.classes?.actionButton)))}>${escape_html(toast.action.label)}</button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></li>`);
	});
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/SuccessIcon.svelte
function SuccessIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/ErrorIcon.svelte
function ErrorIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/WarningIcon.svelte
function WarningIcon($$renderer) {
	$$renderer.push(`<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/InfoIcon.svelte
function InfoIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/CloseIcon.svelte
function CloseIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/Toaster.svelte
var VISIBLE_TOASTS_AMOUNT = 3;
var VIEWPORT_OFFSET = "24px";
var MOBILE_VIEWPORT_OFFSET = "16px";
var TOAST_LIFETIME = 4e3;
var TOAST_WIDTH = 356;
var GAP = 14;
var DARK = "dark";
var LIGHT = "light";
function getOffsetObject(defaultOffset, mobileOffset) {
	const styles = {};
	[defaultOffset, mobileOffset].forEach((offset, index) => {
		const isMobile = index === 1;
		const prefix = isMobile ? "--mobile-offset" : "--offset";
		const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
		function assignAll(offset) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((key) => {
				styles[`${prefix}-${key}`] = typeof offset === "number" ? `${offset}px` : offset;
			});
		}
		if (typeof offset === "number" || typeof offset === "string") assignAll(offset);
		else if (typeof offset === "object") [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((key) => {
			const value = offset[key];
			if (value === void 0) styles[`${prefix}-${key}`] = defaultValue;
			else styles[`${prefix}-${key}`] = typeof value === "number" ? `${value}px` : value;
		});
		else assignAll(defaultValue);
	});
	return styles;
}
function Toaster($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		function getInitialTheme(t) {
			if (t !== "system") return t;
			if (typeof window !== "undefined") {
				if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return DARK;
				return LIGHT;
			}
			return LIGHT;
		}
		let { invert = false, position = "bottom-right", hotkey = ["altKey", "KeyT"], expand = false, closeButton = false, offset = VIEWPORT_OFFSET, mobileOffset = MOBILE_VIEWPORT_OFFSET, theme = "light", richColors = false, duration = TOAST_LIFETIME, visibleToasts = VISIBLE_TOASTS_AMOUNT, toastOptions = {}, dir = "auto", gap = GAP, pauseWhenPageIsHidden = false, loadingIcon: loadingIconProp, successIcon: successIconProp, errorIcon: errorIconProp, warningIcon: warningIconProp, closeIcon: closeIconProp, infoIcon: infoIconProp, containerAriaLabel = "Notifications", class: className, closeButtonAriaLabel = "Close toast", onblur, onfocus, onmouseenter, onmousemove, onmouseleave, ondragend, onpointerdown, onpointerup, $$slots, $$events, ...restProps } = $$props;
		function getDocumentDirection() {
			if (dir !== "auto") return dir;
			if (typeof window === "undefined") return "ltr";
			if (typeof document === "undefined") return "ltr";
			const dirAttribute = document.documentElement.getAttribute("dir");
			if (dirAttribute === "auto" || !dirAttribute) {
				run(() => dir = window.getComputedStyle(document.documentElement).direction ?? "ltr");
				return dir;
			}
			run(() => dir = dirAttribute);
			return dirAttribute;
		}
		const possiblePositions = derived(() => Array.from(new Set([position, ...toastState.toasts.filter((toast) => toast.position).map((toast) => toast.position)].filter(Boolean))));
		let expanded = false;
		let interacting = false;
		let actualTheme = getInitialTheme(theme);
		const hotkeyLabel = derived(() => hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, ""));
		sonnerContext.set(new SonnerState());
		$$renderer.push(`<section${attr("aria-label", `${stringify(containerAriaLabel)} ${stringify(hotkeyLabel())}`)}${attr("tabindex", -1)} aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-nbs0zk">`);
		if (toastState.toasts.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(possiblePositions());
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let position = each_array[index];
				const [y, x] = position.split("-");
				const offsetObject = getOffsetObject(offset, mobileOffset);
				$$renderer.push(`<ol${attributes({
					tabindex: -1,
					dir: getDocumentDirection(),
					class: clsx$1(className),
					"data-sonner-toaster": true,
					"data-sonner-theme": actualTheme,
					"data-y-position": y,
					"data-x-position": x,
					style: restProps.style,
					...restProps
				}, "svelte-nbs0zk", void 0, {
					"--front-toast-height": `${toastState.heights[0]?.height}px`,
					"--width": `${TOAST_WIDTH}px`,
					"--gap": `${gap}px`,
					"--offset-top": offsetObject["--offset-top"],
					"--offset-right": offsetObject["--offset-right"],
					"--offset-bottom": offsetObject["--offset-bottom"],
					"--offset-left": offsetObject["--offset-left"],
					"--mobile-offset-top": offsetObject["--mobile-offset-top"],
					"--mobile-offset-right": offsetObject["--mobile-offset-right"],
					"--mobile-offset-bottom": offsetObject["--mobile-offset-bottom"],
					"--mobile-offset-left": offsetObject["--mobile-offset-left"]
				})}><!--[-->`);
				const each_array_1 = ensure_array_like(toastState.toasts.filter((toast) => !toast.position && index === 0 || toast.position === position));
				for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
					let toast = each_array_1[index];
					{
						function successIcon($$renderer) {
							if (successIconProp) {
								$$renderer.push("<!--[0-->");
								successIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (successIconProp !== null) {
								$$renderer.push("<!--[1-->");
								SuccessIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function errorIcon($$renderer) {
							if (errorIconProp) {
								$$renderer.push("<!--[0-->");
								errorIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (errorIconProp !== null) {
								$$renderer.push("<!--[1-->");
								ErrorIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function warningIcon($$renderer) {
							if (warningIconProp) {
								$$renderer.push("<!--[0-->");
								warningIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (warningIconProp !== null) {
								$$renderer.push("<!--[1-->");
								WarningIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function infoIcon($$renderer) {
							if (infoIconProp) {
								$$renderer.push("<!--[0-->");
								infoIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (infoIconProp !== null) {
								$$renderer.push("<!--[1-->");
								InfoIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function closeIcon($$renderer) {
							if (closeIconProp) {
								$$renderer.push("<!--[0-->");
								closeIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (closeIconProp !== null) {
								$$renderer.push("<!--[1-->");
								CloseIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						Toast($$renderer, {
							index,
							toast,
							defaultRichColors: richColors,
							duration: toastOptions?.duration ?? duration,
							class: toastOptions?.class ?? "",
							descriptionClass: toastOptions?.descriptionClass || "",
							invert,
							visibleToasts,
							closeButton,
							interacting,
							position,
							style: toastOptions?.style ?? "",
							classes: toastOptions.classes || {},
							unstyled: toastOptions.unstyled ?? false,
							cancelButtonStyle: toastOptions?.cancelButtonStyle ?? "",
							actionButtonStyle: toastOptions?.actionButtonStyle ?? "",
							closeButtonAriaLabel: toastOptions?.closeButtonAriaLabel ?? closeButtonAriaLabel,
							expandByDefault: expand,
							expanded,
							pauseWhenPageIsHidden,
							loadingIcon: loadingIconProp,
							successIcon,
							errorIcon,
							warningIcon,
							infoIcon,
							closeIcon,
							$$slots: {
								successIcon: true,
								errorIcon: true,
								warningIcon: true,
								infoIcon: true,
								closeIcon: true
							}
						});
					}
				}
				$$renderer.push(`<!--]--></ol>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
//#region src/lib/components/sportsbook/BetSlip.svelte
function BetSlip($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let isSubmitting = false;
		let isSharing = false;
		let errorMessage = null;
		let successMessage = null;
		let shareCodeResult = null;
		let betMode = "COMBO";
		const minDeposit = derived(() => store_get($$store_subs ??= {}, "$page", page).data.minDeposit || 200);
		const minStake = derived(() => store_get($$store_subs ??= {}, "$page", page).data.minStake || 10);
		const stakeIsValid = derived(() => betslip.stake >= minStake());
		const totalRequiredStake = derived(() => betMode === "SINGLE" ? Number((betslip.stake * betslip.count).toFixed(2)) : betslip.stake);
		const needsTopup = derived(() => wallet.balance < totalRequiredStake());
		const potentialWin = derived(() => {
			if (betslip.count === 0 || betslip.stake <= 0) return 0;
			if (betMode === "COMBO") return Number((betslip.stake * betslip.totalOdds).toFixed(2));
			else return Number(betslip.selections.reduce((sum, s) => sum + betslip.stake * s.odds, 0).toFixed(2));
		});
		const deficit = derived(() => needsTopup() ? Number((totalRequiredStake() - wallet.balance).toFixed(2)) : 0);
		const depositAmount = derived(() => needsTopup() ? Math.max(deficit(), minDeposit()) : 0);
		const excessRefund = derived(() => needsTopup() ? Number((depositAmount() - deficit()).toFixed(2)) : 0);
		async function handleShareSlip() {
			if (betslip.selections.length === 0) return;
			isSharing = true;
			shareCodeResult = null;
			try {
				const response = await fetch("/api/betslip/share", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ selections: betslip.selections })
				});
				const result = await response.json();
				if (response.ok && result.success) {
					shareCodeResult = result.code;
					toast.success(`Slip shared! Code: ${result.code}`);
				} else toast.error(result.message || "Failed to generate share code");
			} catch {
				toast.error("An unexpected connection error occurred");
			} finally {
				isSharing = false;
			}
		}
		async function handleAction() {
			if (betslip.selections.length === 0 || !stakeIsValid()) return;
			isSubmitting = true;
			errorMessage = null;
			successMessage = null;
			try {
				if (needsTopup()) {
					if (!auth.isAuthenticated || !auth.user?.phone) throw new Error("Please log in and register a mobile number to deposit");
					const formData = new FormData();
					formData.append("amount", depositAmount().toString());
					formData.append("phone", auth.user.phone);
					const response = await fetch("/wallet/deposit", {
						method: "POST",
						body: formData
					});
					const result = await response.json();
					if (!response.ok || result.type === "failure") throw new Error(result.data?.error || "STK Push failed to initiate");
					successMessage = `STK prompt sent for ${formatCurrency(depositAmount(), wallet.currency)}! Once approved, your bet will place.`;
				} else {
					const selectionsPayload = betslip.selections.map((s) => ({
						marketId: s.marketId,
						odds: s.odds
					}));
					const response = await fetch("/api/place-bet", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							type: betMode,
							selections: selectionsPayload,
							stake: betslip.stake
						})
					});
					const result = await response.json();
					if (!response.ok || !result.success) throw new Error(result.message || "Wager processing failed");
					wallet.deductStake(totalRequiredStake());
					successMessage = "All wagers placed successfully!";
					betslip.clear();
				}
			} catch (err) {
				errorMessage = err.message || "An unexpected error occurred";
			} finally {
				isSubmitting = false;
			}
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="flex h-full w-full flex-col bg-background border-l border-border text-foreground transition-colors duration-150"><div class="flex h-12 items-center justify-between border-b border-border px-4 py-3 bg-muted/20 shrink-0"><div class="flex items-center gap-2">`);
			Ticket($$renderer, { class: "h-4 w-4 text-primary" });
			$$renderer.push(`<!----> <span class="text-xs font-bold uppercase tracking-wider">Bet Slip</span> `);
			if (betslip.count > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="rounded-full bg-primary px-2 py-0.5 text-[10px] font-black text-primary-foreground">${escape_html(betslip.count)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (betslip.count > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button class="text-muted-foreground hover:text-destructive transition cursor-pointer" title="Clear All">`);
				Trash_2($$renderer, { class: "h-4 w-4" });
				$$renderer.push(`<!----></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-between pb-20 sm:pb-0"><div class="p-4 space-y-3">`);
			{
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<button class="w-full h-10 border border-dashed border-border bg-muted/10 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition cursor-pointer">`);
				Folder_up($$renderer, { class: "h-4 w-4 text-primary" });
				$$renderer.push(`<!----> <span>Load betslip code</span></button>`);
			}
			$$renderer.push(`<!--]--> `);
			if (betslip.count === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex h-full flex-col items-center justify-center text-center py-12"><div class="rounded-full bg-muted/40 p-4 mb-3 border border-border">`);
				Ticket($$renderer, { class: "h-8 w-8 text-muted-foreground" });
				$$renderer.push(`<!----></div> <p class="text-sm font-bold text-muted-foreground">Your betslip is empty</p> <p class="text-xs text-muted-foreground mt-1 font-semibold">Select odds from any match to add selection</p></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--[-->`);
				const each_array = ensure_array_like(betslip.selections);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let selection = each_array[$$index];
					$$renderer.push(`<div class="relative rounded-lg border border-border bg-muted/20 p-3 shadow-sm"><button class="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground transition cursor-pointer">`);
					X($$renderer, { class: "h-3.5 w-3.5" });
					$$renderer.push(`<!----></button> <div class="text-[10px] font-bold text-primary uppercase tracking-wide mb-1">Single Bet</div> <div class="text-xs font-bold text-foreground">${escape_html(selection.selection)}</div> <div class="text-[10px] text-muted-foreground mt-0.5">Market: ${escape_html(selection.marketName.toUpperCase().replace("_", " "))}</div> <div class="text-xs font-semibold text-muted-foreground mt-1.5">${escape_html(selection.homeTeam)} vs ${escape_html(selection.awayTeam)}</div> <div class="mt-2.5 flex items-center justify-between border-t border-border pt-2"><span class="text-xs text-muted-foreground font-semibold">Odds</span> <span class="text-xs font-black text-primary">${escape_html(selection.odds.toFixed(2))}</span></div></div>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (betslip.count > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="border-t border-border p-4 bg-muted/10 space-y-4 mt-auto shrink-0"><div class="flex items-center gap-1 rounded-lg border border-border bg-muted/20 p-1 w-full">`);
				Button($$renderer, {
					variant: "ghost",
					onclick: () => betMode = "SINGLE",
					class: `h-8 flex-1 rounded-md text-[10px] font-black tracking-wider uppercase transition
              ${betMode === "SINGLE" ? "bg-background text-primary" : "text-muted-foreground"}`,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Single Bets`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Button($$renderer, {
					variant: "ghost",
					onclick: () => {
						betMode = "COMBO";
						betslip.setStake(minStake());
					},
					class: `h-8 flex-1 rounded-md text-[10px] font-black tracking-wider uppercase transition
              ${betMode === "COMBO" ? "bg-background text-primary" : "text-muted-foreground"}`,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Combo / Multibet`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> `);
				if (errorMessage) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="rounded bg-red-950/40 border border-red-800/80 px-3 py-2 text-xs text-red-400 font-bold leading-relaxed">${escape_html(errorMessage)}</div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (successMessage) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="rounded bg-green-950/40 border border-green-800/80 px-3 py-2 text-xs text-green-400 font-bold leading-relaxed">${escape_html(successMessage)}</div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (needsTopup() && stakeIsValid() && deficit() < minDeposit()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-left text-[10px] font-bold text-amber-500 leading-normal flex items-start gap-2">`);
					Coins($$renderer, { class: "h-4 w-4 shrink-0 mt-0.5" });
					$$renderer.push(`<!----> <span>Note: Your balance deficit is ${escape_html(formatCurrency(deficit(), wallet.currency))}, but the minimum deposit is ${escape_html(formatCurrency(minDeposit(), wallet.currency))}. 
              You will be prompted to deposit ${escape_html(minDeposit())}. The excess (${escape_html(formatCurrency(excessRefund(), wallet.currency))}) will remain in your wallet.</span></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (shareCodeResult) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-center text-xs font-bold text-amber-500">Share Code: <span class="font-mono text-sm font-black underline select-all">${escape_html(shareCodeResult)}</span></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="space-y-2"><div class="flex justify-between items-center"><span class="text-xs font-bold text-muted-foreground">Stake ${escape_html(betMode === "SINGLE" ? "per Bet" : "Amount")}</span> <span class="text-[10px] font-bold text-neutral-500">Balance: ${escape_html(formatCurrency(wallet.balance, wallet.currency))}</span></div> <div class="relative">`);
				Input($$renderer, {
					type: "number",
					placeholder: "0.00",
					disabled: isSubmitting,
					class: "h-10 border-border bg-background text-foreground pr-12 font-bold focus:border-primary",
					get value() {
						return betslip.stake;
					},
					set value($$value) {
						betslip.stake = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <span class="absolute right-3 top-2.5 text-xs font-bold text-muted-foreground">${escape_html(wallet.currency)}</span></div> <div class="flex justify-between items-center text-[10px] font-bold"><span class="text-neutral-500">Min Bet: ${escape_html(formatCurrency(minStake(), wallet.currency))}</span> `);
				if (betslip.stake > 0 && !stakeIsValid()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-red-400">Stake is below the minimum limit</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div> <div class="space-y-1.5 text-xs font-semibold text-neutral-400"><div class="flex justify-between"><span>${escape_html(betMode === "SINGLE" ? "Total Required Stake" : "Overall Odds")}</span> <span class="text-foreground font-black">${escape_html(betMode === "SINGLE" ? formatCurrency(totalRequiredStake(), wallet.currency) : betslip.totalOdds.toFixed(2))}</span></div> <div class="flex justify-between border-t border-border pt-1.5"><span class="text-foreground font-bold">Potential Payout</span> <span class="text-primary font-black text-sm">${escape_html(formatCurrency(potentialWin(), wallet.currency))}</span></div></div> <div class="flex gap-2">`);
				Button($$renderer, {
					onclick: handleShareSlip,
					disabled: isSharing || isSubmitting,
					variant: "outline",
					class: "h-11 px-4 border-border bg-background text-foreground hover:bg-muted font-bold rounded-lg cursor-pointer",
					title: "Share Selections",
					children: ($$renderer) => {
						Share_2($$renderer, { class: "h-4 w-4 text-primary" });
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Button($$renderer, {
					onclick: handleAction,
					disabled: isSubmitting || !stakeIsValid(),
					class: `flex-1 h-11 text-neutral-950 font-black rounded-lg transition shadow-md gap-2 cursor-pointer
              ${needsTopup() ? "bg-emerald-500 hover:bg-emerald-400" : "bg-primary hover:bg-primary/95"}
              disabled:bg-neutral-800 disabled:text-neutral-500`,
					children: ($$renderer) => {
						if (isSubmitting) {
							$$renderer.push("<!--[0-->");
							Loader_circle($$renderer, { class: "h-4 w-4 animate-spin" });
							$$renderer.push(`<!----> <span>Processing...</span>`);
						} else {
							$$renderer.push("<!--[-1-->");
							if (needsTopup()) {
								$$renderer.push("<!--[0-->");
								Smartphone($$renderer, { class: "h-4 w-4" });
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> <span>${escape_html(needsTopup() ? "Place Bet" : "Place Bets")}</span>`);
						}
						$$renderer.push(`<!--]-->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/ui/Preloader.svelte
function Preloader($$renderer, $$props) {
	let { active = false } = $$props;
	if (active) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"><div class="relative flex items-center justify-center"><div class="h-40 w-40 rounded-full border-2 border-neutral-900 border-t-2 border-t-amber-500 animate-spin"></div> <img src="/logos/logo.png" alt="Bustar Bet Loading" class="absolute h-30 w-30 object-contain rounded-lg shadow-sm" onerror="this.__e=event"/></div></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data, children } = $$props;
		let isMenuOpen = false;
		let isBetslipOpen = false;
		let isLoading = true;
		const isAdminRoute = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin"));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			Toaster($$renderer, {
				theme: "light",
				position: "top-right",
				richColors: true
			});
			$$renderer.push(`<!----> `);
			Preloader($$renderer, { active: isLoading });
			$$renderer.push(`<!----> <div class="min-h-screen bg-background text-foreground flex flex-col font-sans">`);
			Header($$renderer);
			$$renderer.push(`<!----> <div class="flex flex-1 relative overflow-hidden">`);
			if (!isAdminRoute()) {
				$$renderer.push("<!--[0-->");
				Sidebar($$renderer);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <main${attr_class(`flex-1 overflow-y-auto pb-24 md:pb-12 transition-all duration-150 ${isAdminRoute() ? "px-6 py-8" : "px-4 py-6 md:pl-68 md:pr-84 min-h-[calc(100vh-8rem)]"}`)}><div class="mx-auto max-w-7xl space-y-6">`);
			children($$renderer);
			$$renderer.push(`<!----></div> `);
			if (!isAdminRoute()) {
				$$renderer.push("<!--[0-->");
				Footer($$renderer);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></main> `);
			if (!isAdminRoute()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(`fixed top-28 bottom-0 right-0 z-30 w-80 border-l border-border bg-background transition-transform duration-300 ${isBetslipOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`)}>`);
				BetSlip($$renderer);
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			MenuDrawer($$renderer, {
				get isOpen() {
					return isMenuOpen;
				},
				set isOpen($$value) {
					isMenuOpen = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (isBetslipOpen && !isAdminRoute()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden" aria-label="Close Betslip"></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (!isAdminRoute()) {
				$$renderer.push("<!--[0-->");
				MobileNav($$renderer, {
					get isBetslipOpen() {
						return isBetslipOpen;
					},
					set isBetslipOpen($$value) {
						isBetslipOpen = $$value;
						$$settled = false;
					}
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-VYXtcK3b.js.map
