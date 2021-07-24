import {useEffect, useMemo, useState} from 'react';

const useResize = (): number[] => {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const [height, setHeight] = useState<number>(window.innerHeight)

    useEffect(() => {

        const handleResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const value = useMemo(() => [
            width,
            height
        ], [width, height])

    return value
}

export default useResize