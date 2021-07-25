import {FC, useMemo} from 'react';
import appConfig from '../../app.config';
import {Layer, Text} from 'react-konva';
import { useHistory } from 'react-router-dom';
import useResize from '../../hooks/useResize';
import Menu from '../../components/Menu/Menu';

const Main: FC = () => {
    const history = useHistory();
    const [width] = useResize();

    const offsetX = useMemo(() => - (width / 2)
    , [width]);

    const handleClick = () => {
        history.push('/play');
    }

    return (
        <Layer width={window.innerWidth}>
            <Text
                text={appConfig.name}
                fontSize={50}
                align="center"
                fill="white"
                offsetX={offsetX}
                offsetY={-50}
                onClick={handleClick}
            />
            <Menu />
        </Layer>
    )
}

export default Main