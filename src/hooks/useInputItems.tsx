import { API_ROUTE } from '@/const'
import { TInputItem } from '@/types/input'
import { useQuery } from '@tanstack/react-query'

export const UseInputItems = () => {
    return useQuery<TInputItem[]>({
        queryKey: ['items'],
        queryFn: () =>
            fetch(API_ROUTE).then((res) =>
                res.json(),
            ),
    })
}