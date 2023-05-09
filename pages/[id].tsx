import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';
import useSWR from 'swr'
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import Image from 'next/image';
import rankImages from '../RankImages';
import ProfileIcons from "../ProfileIcons"
import SplitButton from '../components/QueueButton';
import RankImage from '../components/RankImage';

const theme = createTheme({
    typography: {
        h4: {
            fontWeight: 'bold',
        },
        h3: {
            fontWeight: 'bold'
        },
        h5: {
            fontWeight: 'bold'
        },
        body1: {
            fontWeight: 'bold'
        }
    }
})


// const allRanks = ["CHALLENGER", "GRANDMASTER","MASTER", "DIAMOND", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON"]
const allRanks = ['Challenger', 'Grandmaster', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Iron']

// Original code
function UserProfile() {
    const router = useRouter();
    const [data, setData] = useState<IProfile>()
    const [isLoading, setLoading] = useState(false)
    const [soloQ, hasSoloQ] = useState(false);
    const [flexQ, hasFlexQ] = useState(false);

    function findImgRank(currRank: IProfile) {
        for (let rank of allRanks) {
            let rankUpperCase = JSON.stringify(rank.toUpperCase())
            const currentRank = JSON.stringify(currRank)
            if (currentRank == rankUpperCase) {
                return rank
            }
        }
        return null
    }

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
                        // console.log(findImgRank(data.RANKED_FLEX_SR.tier))

                    }
                    if (data.RANKED_SOLO_5x5) {
                        hasSoloQ(true);
                        // findImgRank(data.RANKED_SOLO_5x5.tier)
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
                        {/* <SplitButton /> */}
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    {soloQ ?
                        <Box sx={{ marginTop: '15px', width: '50%' }}>
                            <Box style={{ display: 'flex' }}>
                                <RankImage tier={data.RANKED_SOLO_5x5.tier}/>
                                <Box sx={{ display: 'flex', minwidth: '100%', height: '100%' }}>
                                    <Typography sx={{ marginTop: '10px', marginLeft: '10px' }} variant='h5'>
                                        {data.RANKED_SOLO_5x5.tier} {data.RANKED_SOLO_5x5.rank}
                                    </Typography>
                                    <Typography sx={{ marginTop: '10px', marginLeft: '10px', paddingTop: '3px' }}>
                                        LP: {data.RANKED_SOLO_5x5.leaguePoints}
                                    </Typography>
                                </Box>

                            </Box>
                            <Box sx={{ display: 'flex', backgroundColor: '#78909c', width: '225px', marginLeft: '15px', borderRadius: '15px', paddingTop: '5px' }}>
                                <Typography sx={{ marginLeft: '10px', display: 'flex' }} variant='h6'>
                                    WINS
                                </Typography>
                                <Typography variant='h6' sx={{ marginLeft: '5px', color: '#1b5e20' }}>
                                    {data.RANKED_SOLO_5x5.wins}
                                </Typography>
                                <Typography variant='h6' sx={{ marginLeft: '10px' }}>
                                    LOSSES:
                                </Typography>
                                <Typography variant='h6' sx={{ marginLeft: '5px', color: '#ff1744' }}>
                                    {data.RANKED_SOLO_5x5.losses}
                                </Typography>
                            </Box>
                        </Box>
                        : <Typography variant='body1'>Unranked</Typography>} {/*Conditional Renders Unranked */}

                    {flexQ ?
                        <Box sx={{ marginTop: '15px', width: '50%' }}>
                            <Box style={{ display: 'flex' }}>
                                <RankImage tier={data.RANKED_FLEX_SR.tier}/>
                                <Box sx={{ display: 'flex', minwidth: '100%', height: '100%' }}>
                                    <Typography sx={{ marginTop: '10px', marginLeft: '10px' }} variant='h5'>
                                        {data.RANKED_FLEX_SR.tier} {data.RANKED_FLEX_SR.rank}
                                    </Typography>
                                    <Typography sx={{ marginTop: '10px', marginLeft: '10px', paddingTop: '3px' }}>
                                        LP: {data.RANKED_FLEX_SR.leaguePoints}
                                    </Typography>
                                </Box>

                            </Box>
                            <Box sx={{ display: 'flex', backgroundColor: '#78909c', width: '225px', marginLeft: '15px', borderRadius: '15px', paddingTop: '5px' }}>
                                <Typography sx={{ marginLeft: '10px', display: 'flex' }} variant='h6'>
                                    WINS
                                </Typography>
                                <Typography variant='h6' sx={{ marginLeft: '5px', color: '#1b5e20' }}>
                                    {data.RANKED_FLEX_SR.wins}
                                </Typography>
                                <Typography variant='h6' sx={{ marginLeft: '10px' }}>
                                    LOSSES:
                                </Typography>
                                <Typography variant='h6' sx={{ marginLeft: '5px', color: '#ff1744' }}>
                                    {data.RANKED_FLEX_SR.losses}
                                </Typography>
                            </Box>
                        </Box>
                        : <Typography variant='body1'>Unranked</Typography>} {/*Conditional Renders Unranked */}
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