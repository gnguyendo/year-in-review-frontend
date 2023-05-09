import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IProfile } from '../IProfile';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from "@mui/material/styles";
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

export default function SearchBar() {
    const [summonerSearch, setSummonerSearch] = useState('');
    const [summonerFound, setSummonerFound] = useState<IProfile[]>([]);
    const [summoner, setSummoner] = useState('');
    const router = useRouter();


    const searchForSummoner = async (summonerName: string): Promise<IProfile[]> => {
        // OG Code
        // const result = await fetch(`https://year-in-review.onrender.com/${summonerName}`);
        // return (await result.json()).results;

        const result = await fetch(`https://year-in-review.onrender.com/validsummoner/${summonerName}`);
        return (await result.json());
    }

    const searchForSummoner2 = async (summonerName: string): Promise<object> => {
        // OG Code
        // const result = await fetch(`https://year-in-review.onrender.com/${summonerName}`);
        // return (await result.json()).results;

        const result = await fetch(`https://year-in-review.onrender.com/validsummoner/${summonerName}`);
        return await result.json()
        // return (await result.json())
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Something Happens When Clicked");
        setSummonerSearch(summoner);
    }

    useEffect(() => {
        (async () => {

            //OG Code
            // const summonerName = encodeURIComponent(summoner);
            // if (summonerName) {
            //     const response = await searchForSummoner(summonerName);
            //     setSummonerFound(response);
            //     router.push({
            //         pathname: '/' + summonerName
            //     })
            // }

            const summonerName = encodeURIComponent(summoner);
            if (summonerName) {
                const response = await searchForSummoner2(summonerName);
                console.log(response)
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
        <div>
            <form onSubmit={event => handleSubmit(event)}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Summoner"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSummoner(e.target.value)}
                    />
                </Search>
            </form>

        </div>
    )
}
