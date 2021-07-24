import {FC, useMemo} from 'react';
import useResize from '../../hooks/useResize';
import {Layer, Text} from 'react-konva';
import { useHistory } from 'react-router-dom';

const Game: FC = () => {
    const history = useHistory();
    const [width] = useResize();

    const offsetX = useMemo(() => - (width / 2)
        , [width])

    const handleClick = () => {
        history.push('/')
    }

    return (
        <Layer width={window.innerWidth}>
            <Text
                text="game"
                fontSize={30}
                align="center"
                fill="white"
                offsetX={offsetX}
                offsetY={-50}
                onClick={handleClick}
            />
        </Layer>
    )
}

export default Game