import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Layer, Stage} from 'react-konva';
import Background from './Background/Background';

interface Props {
    children: ReactNode
}

const Container: FC<Props> = ({
   children
}) => {

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

    return (
        <Stage
            width={width}
            height={height}
        >
            <Layer>
                <Background width={width} height={height} />
            </Layer>
            {children}
        </Stage>
    )
}

export default Container