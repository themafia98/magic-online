import React, {FC} from 'react';
import {Rect} from 'react-konva';
import useImage from 'use-image';

interface Props {
    width: number
    height: number
}

const Background: FC<Props> = ({
    width,
    height
}) => {
    const [background, status] = useImage('/bg.png')

    if (status !== 'loaded') {
        return null
    }

    return (
        <Rect
            width={width}
            height={height}
            fillPatternRepeat="repeat"
            fillPatternImage={background}
        />
    )
}

export default Background