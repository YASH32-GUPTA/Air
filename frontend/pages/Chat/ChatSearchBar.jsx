import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const StyledInputBase = styled(InputBase)({
  '& input::placeholder': {
    color: 'black',
    opacity: 1, // Ensures the color is fully applied
  },
});

export default function ChatSearchBar() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <StyledInputBase
        className="font inputColor"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search By Name"
        style={{fontWeight : "bolder"}}
      />
    </Paper>
  );
}
