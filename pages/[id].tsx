import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';
import useSWR from 'swr'
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { color, styled, typography } from '@mui/system';
import Image from 'next/image';
import rankImages from '../RankImages';
import ProfileIcons from "../ProfileIcons"
import SplitButton from '../components/SplitButton';
import { Rectangle } from '@mui/icons-material';

const theme = createTheme({
    typography: {
        h4: {
            fontWeight: 'bold',
        },
        h3: {
            fontWeight: 'bold'
        },
        body1: {
            fontWeight: 'bold'
        }
    }
})

const rankImageContainer = {
    position: 'relative'
}

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
        return <Typography variant='h3' sx={{ color: 'white' }}> Loading </Typography>
    if (!data)
        return <p>No Profile Data</p>

    return (
        <Box
            sx={{
                margin: 5,
                width: '80%',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                mx: '10%',
                border: 1,
                color: '#eceff1',
                fontWeight: 'bold',
            }}
        >
            <ThemeProvider theme={theme}>
                <Box display='flex'>
                    <div style={{ position: 'relative', borderRadius: '50%', overflow: 'hidden', height: 120, width: 120 }}>
                        <Image
                            alt="profileIcon"
                            src={ProfileIcons.Twenty28}
                            object-fit="contain"
                            sizes='100vw'
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    <Box sx={{ marginLeft: '10px' }}>
                        <Typography
                            variant="h3"
                        >
                            {data.summonerName}
                        </Typography>
                        <Typography
                            variant='body2'
                            fontStyle={'oblique'}
                        >
                            Level: {data.summonerLevel}
                        </Typography>
                        <SplitButton />
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    <Box width={'25%'}>
                        <Typography>
                            Ranked Solo / Duo Career
                        </Typography>
                        {soloQ ?
                            <Typography
                            >
                                <div style={{width: 150, height: 150, overflow: 'hidden'}}>
                                    <Image
                                        alt="Bronze"
                                        src={rankImages.Bronze}
                                        // width={100}
                                        // height={100}
                                        style={{ position: 'absolute', top: 500, left: 500, objectFit: 'contain' }}
                                    />
                                </div>

                                {data.RANKED_SOLO_5x5.tier} {data.RANKED_SOLO_5x5.rank}

                            </Typography>
                            : <Typography variant='body1'>Unranked</Typography>} {/*Conditional Renders Unranked */
                        }
                        {soloQ ?
                            <Typography
                                variant='body1'
                            >
                                Wins: {data.RANKED_SOLO_5x5.wins} Losses: {data.RANKED_SOLO_5x5.losses}
                                <br />
                                LP: {data.RANKED_SOLO_5x5.leaguePoints}
                            </Typography> : null // Conditional renders nothing
                        }
                    </Box>
                    <Box width={'25%'}>
                        <Typography>
                            Ranked Flex Career
                        </Typography>
                        {flexQ ?
                            <Typography>
                                Rank: {data.RANKED_FLEX_SR.tier} {data.RANKED_FLEX_SR.rank}
                            </Typography>
                            : <Typography variant='body1'>Unranked</Typography>} {/*Conditional Renders Unranked */}
                        {flexQ ?
                            <Typography
                                variant='body1'
                            >
                                Wins: {data.RANKED_FLEX_SR.wins} Losses: {data.RANKED_FLEX_SR.losses}
                                <br />
                                LP: {data.RANKED_FLEX_SR.leaguePoints}
                            </Typography> : null // Conditional renders nothing
                        }
                    </Box>
                </Box>
            </ThemeProvider>
        </Box>
    )
}

// Code using SWR
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