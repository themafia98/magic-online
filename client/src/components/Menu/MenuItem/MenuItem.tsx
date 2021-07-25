import {FC} from 'react';
import {Text} from 'react-konva';
import {useHistory} from 'react-router-dom';
import useResize from '../../../hooks/useResize';

interface Props {
    children: string;
    to: string;
    index: number;
    isActive: boolean;
}

const MenuItem: FC<Props> = ({
    children,
    to,
    index,
                                 isActive
}) => {
    const [width, height] =  useResize();

    const history = useHistory();

    const handleClick = () => {
        history.push(to);
    }

    const offsetCenterHeight = -(height / 4);
    const offsetByIndex = index * 40;

    return (
        <Text
            text={children}
            fontSize={30}
            fill={isActive ? 'red' : 'orange'}
            textDecoration="underline"
            align="center"
            offsetX={-(width / 2.1)}
            offsetY={offsetCenterHeight - offsetByIndex}
            onClick={handleClick}
        />
    )
}

export default MenuItem;