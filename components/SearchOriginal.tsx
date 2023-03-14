import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';
import * as React from 'react';

export default function SearchBarOriginal() {
    const [summonerSearch, setSummonerSearch] = useState('');
    const [summonerFound, setSummonerFound] = useState<IProfile[]>([]);
    const router = useRouter();

    const searchForSummoner = async (summonerName: string): Promise<IProfile[]> => {
        console.log("Summoner name is: " + summonerName)
        const result = await fetch(`https://year-in-review.onrender.com/${summonerName}`);
        return (await result.json()).results;
    }

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        console.log("Something Happens When Clicked");
        const input = form.querySelector("#searchText") as HTMLInputElement;
        setSummonerSearch(input.value);
    };

    useEffect(() => {
        (async () => {
            const summonerName = encodeURIComponent(summonerSearch);
            if (summonerName) {
                const response = await searchForSummoner(summonerName);
                setSummonerFound(response);
                router.push({
                    pathname: '/' + summonerName
                    // query: {id: summonerName}
                })
            }
        })();
    }, [summonerSearch])

    return (
        <div className='search'>
            <form onSubmit={event => handleSearch(event)} className="searchForm" method="get">
                <label htmlFor="summonername">Summoner Name</label>
                <input type="text" id="searchText" />
                <button type="submit" >Submit</button>
            </form>
        </div>


    )
}



        //   <Search>
        //     <SearchIconWrapper>
        //       <SearchIcon />
        //     </SearchIconWrapper>
        //     <StyledInputBase
        //       placeholder="Summoner"
        //       inputProps={{ 'aria-label': 'search' }}
        //     />
        //   </Search>