
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import AppProvider from '@/models/contexts/AppContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <DefaultSeo
                title="Challenge Nivello"
                openGraph={{
                    type: 'website',
                    locale: 'pt_Br',
                }}
            />
            <Head>
                {/* Meta tags específicas para o Windows */}
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="../app/public/ms-icon-70x70.png" />
                <meta name="msapplication-TileImage" content="../app/public/ms-icon-144x144.png" />
                <meta name="msapplication-TileImage" content="../app/public/ms-icon-150x150.png" />
                <meta name="msapplication-TileImage" content="../app/public/ms-icon-310x310.png" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div className="bg-gray-200">
                <Component {...pageProps} />
            </div>
        </AppProvider>
    );
}

export default MyApp;
