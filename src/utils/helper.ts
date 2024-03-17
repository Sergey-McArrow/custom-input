import { acceptableSymbols } from '@/const'
import { TAcceptableSymbols, TInputItem } from '@/types/input'

export const getBaseURL = () => {
	if (typeof window !== 'undefined') {
		return ''
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}
	return 'http://localhost:3000'
}

export const getUniqueItemsByName = (array: TInputItem[]) =>
	Array.from(new Map(array.map(item => [item.name, item])).values())

export const isAcceptableSymbol = (char: string) =>
	acceptableSymbols.includes(char as TAcceptableSymbols)
