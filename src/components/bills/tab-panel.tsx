import {PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
    isVisible: boolean;
}

export function TabPanel({isVisible, children}: Props) {
    if (!isVisible) {
        return null;
    }

    return children;
}
