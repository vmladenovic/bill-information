import Head from 'next/head';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
                <Button variant="contained" color="primary">
                    Click Me
                </Button>
            </Container>
        </>
    );
}
