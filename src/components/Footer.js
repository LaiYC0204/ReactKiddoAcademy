// Footer.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <AppBar position="static" component="footer" sx={{ top: 'auto', bottom: 0, backgroundColor: '#f8f9fa', padding: '10px' }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; 2024 兒童學院. All rights reserved.
        </Typography>
        <div style={{ marginLeft: '20px' }}>
          <Link href="https://github.com/LaiYC0204/ReactKiddoAcademy" target="_blank" rel="noopener" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>
            GitHub
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
