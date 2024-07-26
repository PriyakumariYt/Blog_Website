
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog Hub
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {loggedIn && (
            <>
              <Button color="inherit" component={Link} to="/create-blog">Create Blog</Button>
              <Button color="inherit" component={Link} to="/myblogs">My Blogs</Button>
            </>
          )}
          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'flex', md: 'none' } }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
          {loggedIn && (
            <>
              <MenuItem onClick={handleClose} component={Link} to="/create-blog">Create Blog</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/myblogs">My Blogs</MenuItem>
            </>
          )}
          {loggedIn ? (
            <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
          ) : (
            <>
              <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/register">Register</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
