import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const composeHook = create(
	persist(
		(set) => ({
			isOpen: false,
			isDelay: false,
			imgURL: '',
			composeTitle: 'Sample title',
			composeContent: 'Sample content',
			isSubmitSucess: false,
			onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
			onDelay: () => {
				set({ isDelay: true });
				setTimeout(() => {
					set({ isOpen: false });
					set({ isDelay: false });
				}, 400);
			},
			onChangeTitle: (payload) => {
				set(() => ({ composeTitle: payload }));
			},
			onChangeContent: (payload) => {
				set(() => ({ composeContent: payload }));
			},
			onImgUpload: (payload) => {
				set({ imgURL: payload });
			},
			onDelaySubmit: () => {
				set({ isDelay: true });
				setTimeout(() => {
					set({ isSubmitSucess: false });
					set({ isDelay: false });
				}, 400);
			},
		}),
		{
			name: 'compose-hook', // unique name
			storage: createJSONStorage(() => localStorage),
			// storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
		}
	)
);

export default composeHook;
