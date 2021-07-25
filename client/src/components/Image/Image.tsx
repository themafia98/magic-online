import {FC} from 'react';
import { Image as ImageKonva } from 'react-konva';
import useImage from 'use-image';
import classes from './Image.module.css';

interface Props {
    useCanvas?: boolean
    src: string
    alt: string
};

const Image: FC<Props> = ({
    src,
    alt,
                              useCanvas
}) => {
    const [img] = useImage(src)

    if (useCanvas) {
        return (
            <ImageKonva image={img} />
        )
    }

    return (
        <img
            className={classes.image}
            src={src}
            alt={alt}
        />
    )
}

export default Image;