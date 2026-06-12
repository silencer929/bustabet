import { V as derived } from './dev-CaPlrGUY.js';

//#region src/lib/stores/auth.svelte.ts
var AuthStore = class {
	user = null;
	#isAuthenticated = derived(() => this.user !== null);
	get isAuthenticated() {
		return this.#isAuthenticated();
	}
	set isAuthenticated($$value) {
		return this.#isAuthenticated($$value);
	}
	#isAdmin = derived(() => this.user?.user?.role === "ADMIN");
	get isAdmin() {
		return this.#isAdmin();
	}
	set isAdmin($$value) {
		return this.#isAdmin($$value);
	}
	#isSupport = derived(() => this.user?.user?.role === "SUPPORT");
	get isSupport() {
		return this.#isSupport();
	}
	set isSupport($$value) {
		return this.#isSupport($$value);
	}
	setUser(profile) {
		this.user = profile;
	}
	logout() {
		this.user = null;
	}
};
var auth = new AuthStore();

export { auth as a };
//# sourceMappingURL=auth.svelte-5dfylw8x.js.map
