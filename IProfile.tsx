interface RankQueue {
    rank: string,
    tier: string,
    wins: string,
    losses: string, 
    leaguePoints: string,
}


export interface IProfile {
    id: string,
    puuid: string,
    summonerId: string,
    summonerLevel: string,
    summonerName: string, 
    leagueId: string,
    RANKED_SOLO_5x5: RankQueue,
    RANKED_FLEX_SR: RankQueue

}


