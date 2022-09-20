import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from 'src/libs//theme';
import createEmotionCache from 'src/libs/createEmotionCache';
import {Box, Container} from "@mui/material";
import ResponsiveAppBar from "../components/general/Toolbar";
import { Provider } from 'react-redux';
import { store, persistor } from 'src/controller/store';
import { PersistGate } from 'redux-persist/integration/react';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import Footer from "../components/general/Footer";
import {gtmBody, gtmHeader} from "../libs/gtm";


const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
});

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    // @ts-ignore
    // @ts-ignore
    return (
        <CacheProvider value={emotionCache}>
            <React.Fragment>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel={"stylesheet"} href={"/css/styles.css"}/>
                <script type="text/javascript" dangerouslySetInnerHTML={{__html: gtmHeader}}/>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline enableColorScheme={true} />
                <Provider store={store}>
                    < //@ts-ignore
                        PersistGate loading={null} persistor={persistor}>
                        <WagmiConfig client={client}>
                            <SessionProvider session={
                                //@ts-ignore
                                pageProps.session
                            } refetchInterval={0}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <ResponsiveAppBar />
                                    {/*	'xs' | 'sm' | 'md' | 'lg' | 'xl'*/}
                                    <Container maxWidth="lg">
                                        {/* @ts-ignore */}
                                        <Component {...pageProps} />
                                        <Footer />
                                    </Container>

                                </Box>

                            </SessionProvider>

                        </WagmiConfig>
                    </PersistGate>
                </Provider>
            </ThemeProvider>
                <div dangerouslySetInnerHTML={{__html: gtmBody}}/>
            </React.Fragment>
        </CacheProvider>
    );
}