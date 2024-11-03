import { useEffect, useState } from 'react'

export const useDebouncer = <T>(value: T, time: number) => {

    const [debouncer, setDebouncer] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncer(value)
        }, time);

        return () => clearTimeout(timeoutId)
    }, [value, time])

    return debouncer
}
