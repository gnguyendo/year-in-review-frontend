import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';


function UserProfile() {
    const router = useRouter();
    const [data, setData] = useState <IProfile>()
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
    
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
 
    return (
        <div>
            <main>
                
                <h2>{data.summonerName}</h2>
                <p> Level: {data.summonerLevel}</p>
                <p>Ranked Solo Career</p>

                {soloQ? <p> Solo Rank: {data.RANKED_SOLO_5x5.tier} {data.RANKED_SOLO_5x5.rank}</p> : <p>Unranked</p>}
                {soloQ? <p> Wins: {data.RANKED_SOLO_5x5.wins} </p> : <p></p>}
                {soloQ? <p> Wins: {data.RANKED_SOLO_5x5.losses} </p> : <p></p>}
                {soloQ? <p> LP: {data.RANKED_SOLO_5x5.leaguePoints}  </p> : <p></p>}
                <br></br>
                <p>Ranked Flex Career</p>
                {flexQ? <p> Flex Rank: {data.RANKED_FLEX_SR.tier} {data.RANKED_FLEX_SR.rank} </p> : <p>Unranked</p>}
                {flexQ? <p> Wins: {data.RANKED_FLEX_SR.wins}  </p> : <p></p>}
                {flexQ? <p> Losses: {data.RANKED_FLEX_SR.losses}  </p> : <p></p>}
                {flexQ? <p> LP: {data.RANKED_FLEX_SR.leaguePoints}  </p> : <p></p>}
            </main>
        </div>
    )
}


export default UserProfile;