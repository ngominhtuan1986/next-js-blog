import { create } from 'zustand';

const authHook = create((set) => ({
	isAuthOpen: false,
	isRegister: false,
	isDelay: false,
	onOpen: (payload) => {
		set({ isAuthOpen: true });
		set({ isRegister: payload });
	},
	onClose: (payload) => {
		set({ isAuthOpen: false });
		set({ isRegister: payload });
	},
	onDelay: (payload) => {
		set({ isDelay: true });
		setTimeout(() => {
			set({ isAuthOpen: false });
			set({ isDelay: false });
		}, 400);
	},
}));

export default authHook;
