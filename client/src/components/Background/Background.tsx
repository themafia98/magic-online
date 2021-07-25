import React, {FC} from 'react';
import {Rect} from 'react-konva';
import useImage from 'use-image';
import {IMAGE_BG} from './Background.constant';

interface Props {
    width: number
    height: number
};

const Background: FC<Props> = ({
    width,
    height
}) => {
    const [background, status] = useImage(IMAGE_BG);

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

export default Background;