import Link from 'next/link'
import SearchBar from './Searchbar'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" sx={{opacity:".7"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link href="/"><HomeIcon sx={{ color: 'white' }}/>
            </Link>
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            League Season Review
          </Typography>
          <SearchBar/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
