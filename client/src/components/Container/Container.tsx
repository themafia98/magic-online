import React, {FC, ReactNode} from 'react';
import {Layer, Stage} from 'react-konva';
import Background from '../Background/Background';
import useResize from '../../hooks/useResize';

interface Props {
    children?: ReactNode
};

const Container: FC<Props> = ({
   children
}) => {
    const [width, height] =  useResize()

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

export default Container;