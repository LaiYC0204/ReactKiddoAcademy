// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          兒童學院
        </Typography>

        <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/addition" style={{ textDecoration: 'none', color: 'black' }}>加法</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/subtraction" style={{ textDecoration: 'none', color: 'black' }}>減法</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/multiplication" style={{ textDecoration: 'none', color: 'black' }}>乘法</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/division" style={{ textDecoration: 'none', color: 'black' }}>除法</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
