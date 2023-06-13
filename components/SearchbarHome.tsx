import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const inputProps = {
    // disableUnderline: true,
    sx: { height: 60 },
    size: 'medium',
    style: {
        fontSize: 21,
        paddingLeft: 25,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: 'bold'
    }
}

export default function SearchBarHome() {
    const [summonerSearch, setSummonerSearch] = useState('');
    const [summonerFound, setSummonerFound] = useState<IProfile[]>([]);
    const [summoner, setSummoner] = useState('');
    const router = useRouter();

    const searchForSummoner = async (summonerName: string): Promise<object> => {
        const result = await fetch(`https://year-in-review.onrender.com/validsummoner/${summonerName}`);
        return await result.json()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Something Happens When Clicked");
        setSummonerSearch(summoner)
    }

    useEffect(() => {
        (async () => {
            const summonerName = encodeURIComponent(summoner);
            if (summonerName) {
                const response = await searchForSummoner(summonerName);
                if (response) {
                    router.push({ 
                        pathname: '/' + summonerName    
                    })
                } 
                else {
                    router.push('/404')
                }
            }
        })();
    }, [summonerSearch])


    return (
        <Box sx={{ textAlign: 'center', mt: '20%' }}>
            <Container fixed>
                <form onSubmit={event => handleSubmit(event)}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        inputProps={inputProps}
                        InputProps={{ disableUnderline: true }}
                        placeholder='Summoner Search'
                        variant='standard'
                        margin='dense'
                        sx={{
                            background: '#1976d2',
                            textAlign: 'center',
                            borderRadius: '16px',
                            width: '40%',
                            border: '0',
                            input: { color: '#e1f5fe' },
                            margin: 0,
                            opacity: '0.8'
                        }}
                        onChange={(e) => setSummoner(e.target.value)}
                    >
                    </TextField>
                </form>
            </Container>




        </Box>
    )
}
