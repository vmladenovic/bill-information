import type {PropsWithChildren} from 'react';

interface Props {
    isVisible: boolean;
}

// A simple TabPanel component that conditionally renders its children based on the isVisible prop.
export function TabPanel({isVisible, children}: PropsWithChildren<Props>) {
    if (!isVisible) {
        return null;
    }

    return children;
}
