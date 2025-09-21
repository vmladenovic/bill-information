import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import cache from '@emotion/cache';
import ReactQueryProvider from '@/contexts/react-query-context';
import dynamic from 'next/dynamic';
import {ReduxProvider} from '@/contexts/redux-context';

const ReactQueryDevtools = dynamic(
    () =>
        import('@tanstack/react-query-devtools').then(
            (mod) => mod.ReactQueryDevtools,
        ),
    {ssr: false},
);

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = cache({key: 'css', prepend: true});

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    return (
        <ReactQueryProvider>
            <ReduxProvider>
                <CacheProvider value={emotionCache}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </CacheProvider>
            </ReduxProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
    );
}
