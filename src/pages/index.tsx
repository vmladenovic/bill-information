import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Bills from '@/components/bills';

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
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" gutterBottom>
                    Bill Assesment
                </Typography>
                <Bills />
            </Container>
        </>
    );
}
