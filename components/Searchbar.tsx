import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {styled} from "@mui/material/styles"

export default function SearchBar() {
    const [summonerSearch, setSummonerSearch] = useState('');
    const [summonerFound, setSummonerFound] = useState<IProfile[]>([]);
    const [summoner, setSummoner] = useState('');
    const router = useRouter();
    

    const searchForSummoner = async (summonerName: string): Promise<IProfile[]> => {
        // console.log("Summoner name is: " + summonerName)
        const result = await fetch(`https://year-in-review.onrender.com/${summonerName}`);
        return (await result.json()).results;
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
                setSummonerFound(response);
                router.push({
                    pathname: '/' + summonerName
                })
            }
        })();
    }, [summonerSearch])



    return (
        <div>
            <form onSubmit={event => handleSubmit(event)}>
                <TextField
                    label="Summoner Name"
                    variant="outlined"
                    // className={classes.txtField}
                    id="filled-hidden-label-small"
                    onChange={(e) => setSummoner(e.target.value)}
                    size="small"
                    sx={{input: {color: 'white'}}}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SearchIcon />}
                >
                    Search
                </Button>
            </form>

        </div>
    )
}
