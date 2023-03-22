import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';
import useSWR from 'swr'
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { color, styled, typography } from '@mui/system';
import Image from 'next/image';
import rankImages from '../Images';

const theme = createTheme({
    typography: {
        h4: {
            fontWeight: 'bold'
        },
        body1: {
            fontWeight: 'bold'
        }
    }
})


// Original code
function UserProfile() {
    const router = useRouter();
    const [data, setData] = useState<IProfile>()
    const [isLoading, setLoading] = useState(false)
    const [soloQ, hasSoloQ] = useState(false);
    const [flexQ, hasFlexQ] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const name = router.query.id
            setLoading(true)
            fetch(`https://year-in-review.onrender.com/${name}`)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    setData(data);
                    setLoading(false);
                    if (data.RANKED_FLEX_SR) {
                        hasFlexQ(true);
                    }
                    if (data.RANKED_SOLO_5x5) {
                        hasSoloQ(true);
                    }
                });
        }
    }, [router.isReady]);

    if (isLoading)
        return
    <Typography
        variant='h3'
    >
        No Profile Data
    </Typography>
    if (!data)
        return
    <Typography
        variant='h3'
    >
        No Profile Data
    </Typography>

    return (
        <Box
            sx={{
                margin: 5,
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                mx: '10%',
                border: 1,
                color: '#eceff1',
                fontWeight: 'bold',
            }}
        >
            <ThemeProvider theme={theme}>
                <Typography
                    variant="h4"
                >
                    {data.summonerName}
                </Typography>

                <Typography
                    variant='body1'
                >
                    Level: {data.summonerLevel}
                </Typography>
                <Typography>
                    Ranked Solo Career
                </Typography>
                {soloQ ?
                    <Typography
                    >
                        {data.RANKED_SOLO_5x5.tier} {data.RANKED_SOLO_5x5.rank}

                        <br />
                        Solo/Duo Rank:
                        {/* <Image
                        alt="Bronze"
                        src={rankImages.Bronze}
                    /> */}
                    </Typography>
                    : //Conditional if no Solo RANK
                    <Typography variant='body1'>Unranked</Typography>}
                {soloQ ?
                    <Typography
                        variant='body1'
                    >
                        Wins: {data.RANKED_SOLO_5x5.wins} Losses: {data.RANKED_SOLO_5x5.losses}
                        <br />
                        LP: {data.RANKED_SOLO_5x5.leaguePoints}
                    </Typography> : null
                }
                <Typography>
                    Ranked Flex Career
                </Typography>
                {flexQ ?
                    <Typography>
                        Flex Rank: {data.RANKED_FLEX_SR.tier} {data.RANKED_FLEX_SR.rank}
                    </Typography>
                    : // Conditional if no Flex RANK
                    <Typography variant='body1'>Unranked</Typography>}
                {flexQ ?
                    <Typography
                        variant='body1'
                    >
                        Wins: {data.RANKED_FLEX_SR.wins} Losses: {data.RANKED_FLEX_SR.losses}
                        <br />
                        LP: {data.RANKED_FLEX_SR.leaguePoints}
                    </Typography> : null
                }
            </ThemeProvider>

        </Box>
    )
}

// const router = useRouter();

// const fetcherWithID = async (name: string) => {
//     const response = fetch(`https://year-in-review.onrender.com/${name}`)
//     const data = await (await response).json()
//     return data
// }


// function UserProfile() {

//     const [data, setData] = useState <IProfile>()
//     const [isLoading, setLoading] = useState(false)
//     const [soloQ, hasSoloQ] = useState(false);
//     const [flexQ, hasFlexQ] = useState(false);

//     // const {data, error} = useSWR('')

//     useEffect(() => {
//         if (router.isReady) {
//             const name = router.query.id
//             setLoading(true)
//             fetch(`https://year-in-review.onrender.com/${name}`)
//                 .then((res) => res.json())
//                 .then((data) => {
//                     // console.log(data);
//                     setData(data);
//                     setLoading(false);
//                     if (data.RANKED_FLEX_SR) {
//                         hasFlexQ(true);
//                     }
//                     if (data.RANKED_SOLO_5x5) {
//                         hasSoloQ(true);
//                     }
//                 });
//         }
//     }, [router.isReady]);

//     if (isLoading) return <p>Loading...</p>
//     if (!data) return <p>No profile data</p>

//     return (
//         <h1>Hello</h1>
//     )
// }


export default UserProfile;