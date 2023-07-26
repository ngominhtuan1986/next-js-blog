import { create } from 'zustand';

const menuHook = create((set) => ({
	isMenuOpen: false,
	isDelay: false,
	onToggle: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
	onDelay: () => {
		set({ isDelay: true });
		setTimeout(() => {
			set({ isMenuOpen: false });
			set({ isDelay: false });
		}, 400);
	},
}));

export default menuHook;
