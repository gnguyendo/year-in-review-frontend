import { useState, useEffect } from 'react';

type Profile = {
    id: string,
    puuid: string,
    summonerId: string,
    summonerLevel: string,
    summonerName: string, 
    leagueId: string,
    RANKED_SOLO_5x5: RankQueue,
    RANKED_FLEX_SR: RankQueue
}

type RankQueue = {
    rank: string,
    tier: string,
    wins: string,
    losses: string, 
    leaguePoints: string,
}

function userProfile(summnoner: string) {

    const [data, setData] = useState <Profile>()
    const [isLoading, setLoading] = useState(false)
    const [soloQ, hasSoloQ] = useState(false);
    const [flexQ, hasFlexQ] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`https://year-in-review.onrender.com/byranobear`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setLoading(false);
                if (data.RANKED_FLEX_SR) {
                    hasFlexQ(true);
                }
                if (data.RANKED_SOLO_5x5) {
                    hasSoloQ(true);
                }
            });
    }, []);
    
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
 
    return (
        <div>
            <main>
                <h1>Profile Goes Here</h1>
                <p>{data.summonerName}</p>
                <p>Ranked Solo Career</p>

                {soloQ? <p> Solo Rank: {data.RANKED_SOLO_5x5.tier} {data.RANKED_SOLO_5x5.rank}</p> : <p>Unranked</p>}

                <br></br>
                <p>Ranked Flex Career</p>
                {flexQ? <p> Flex Rank: {data.RANKED_FLEX_SR.tier} {data.RANKED_FLEX_SR.rank} </p> : <p>Unranked</p>}
            </main>
        </div>
    )
}


export default userProfile;