import {PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
    isVisible: boolean;
}

// A simple TabPanel component that conditionally renders its children based on the isVisible prop.
export function TabPanel({isVisible, children}: Props) {
    if (!isVisible) {
        return null;
    }

    return children;
}
