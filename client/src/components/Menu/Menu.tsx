import {FC, useMemo} from 'react';
import {MENU_TYPE, publicMenu} from './Menu.constant';
import MenuItem from './MenuItem/MenuItem';
import {Rect} from 'react-konva';
import {useHistory} from 'react-router-dom';

interface Props {
    type?: 'public' | 'private';
}

const Menu: FC<Props> = ({
    type
 }) => {
    const history = useHistory();
    
    const items = useMemo(() => {
        if (type === MENU_TYPE.PUBLIC) {
            return publicMenu.map((item, index) => (
                <MenuItem
                    key={item.id}
                    isActive={history.location.pathname === item.to}
                    index={index}
                    to={item.to}
                >
                    {item.name}
                </MenuItem>
            ))
        }

        return null;
    }, [type, history.location])


    return (
        <>
        <Rect
            stroke="#555"
            strokeWidth={5}
        />
            {items}
        </>
    )
};

Menu.defaultProps = {
    type: 'public'
};

export default Menu;