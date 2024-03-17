import { TInputState } from './../types/input'
import { create } from 'zustand'

export const useInputStore = () =>
	create<TInputState>(set => ({
		input: '',
		setInput: value => set(() => ({ input: value })),

		foundItems: [],
		setFoundItems: items => set(() => ({ foundItems: items })),

		items: [],
		addItem: item =>
			set(state => ({ ...state, items: [...state.items, item] })),
		removeItem: item =>
			set(state => ({
				...state,
				items: state.items.filter(el => el !== item),
			})),
		removeLastItem: () =>
			set(state => ({ ...state, items: state.items.slice(0, -1) })),

		clearItems: () => set(() => ({ items: [] })),

		open: false,
		toggleOpen: () => set(state => ({ ...state, open: !state.open })),
		setOpen: open => set(() => ({ open })),
	}))
