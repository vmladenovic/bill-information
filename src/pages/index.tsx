import Head from 'next/head';
import {Bills} from '@/components/bills/bills';

export default function Home() {
    return (
        <>
            <Head>
                <title>Bill Assessment</title>
                <meta name="description" content="Bill assessment page" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Bills />
        </>
    );
}
