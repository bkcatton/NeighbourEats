import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack'

import { Link } from 'react-router-dom';
import { UserContext } from '../Providers/UserProvider';
import { styled, alpha } from '@mui/material/styles';

// login styling
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '5ch',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon,
      // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      paddingLeft: `0.5em`, // CHANGED FROM ABOVE LINE
      transition: theme.transitions.create('width'),
      width: '5ch',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
    },
  }));

  const pageLinks = [
    {text: 'Browse', route: "/"}, 
  ];

  const authPageLinks = [
    {text: "Cart", route : "/orders/cart"},
    {text: "Previous Orders", route : "/orders/previous"},
  ]

  const vendorPageLinks = [
    {text: "Current Orders", route : "/orders/vendor"},
    {text: "Add New Dish", route : "/dishes/new"},
  ]

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, login, logout } = React.useContext(UserContext);
  const { userId, name, isVendor, avatar } = user;
  const [input, setInput] = React.useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = (e, input) => {
    setAnchorElNav(null);
    setAnchorElUser(null);
    
    // delay login to allow for animation to catch up with state
    setTimeout(() => {
      login(e, input);
    }, 500);
  }

  const handleLogout = () => {
    setAnchorElUser(null);
    setAnchorElNav(null);
    
   // delay logout to allow for animation to catch up with state
    setTimeout(() => {
      logout()
    }, 500);
  }

  return (
    <AppBar position="static" sx={{ mb: 2, }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Neighborhood Eats
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
              {pageLinks.map((page) => (
                <Link key={page.text} onClick={handleCloseNavMenu} component={Typography} to={page.route} style={{ textDecoration: 'none', fontSize: 'larger', color: '#111' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    {page.text}
                  </MenuItem>
                </Link>
              ))}
              {/* map over page routes to be shown if user is logged in */}
              {userId && authPageLinks.map((page) => (
                <Link key={page.text} onClick={handleCloseNavMenu} component={Typography} to={page.route} style={{ textDecoration: 'none', fontSize: 'larger', color: '#111' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    {page.text}
                  </MenuItem>
                </Link>
              ))}
              {/* map over page routes to be shown if user is logged in and is a vendor */}
              {isVendor && vendorPageLinks.map((page) => (
                <Link key={page.text} onClick={handleCloseNavMenu} component={Typography} to={page.route} style={{ textDecoration: 'none', fontSize: 'larger', color: '#111' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    {page.text}
                  </MenuItem>
                </Link>
              ))}
              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Neighborhood Eats
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pageLinks.map((page) => (
              <Link key={page.text} onClick={handleCloseNavMenu} component={Typography} to={page.route} style={{ textDecoration: 'none', fontSize: 'larger', color: '#FFF' }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  {page.text}
                </MenuItem>
              </Link>
            ))}
            {/* map over page routes to be shown if user is logged in */}
            {userId && authPageLinks.map((page) => (
              <Link key={page.text} onClick={handleCloseNavMenu} component={Typography} to={page.route} style={{ textDecoration: 'none', fontSize: 'larger', color: '#FFF' }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  {page.text}
                </MenuItem>
              </Link>
            ))}
            {/* map over page routes to be shown if user is logged in and is a vendor */}
            {isVendor && vendorPageLinks.map((page) => (
              <Link key={page.text} onClick={handleCloseNavMenu} component={Typography} to={page.route} style={{ textDecoration: 'none', fontSize: 'larger', color: '#FFF' }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  {page.text}
                </MenuItem>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, justifyContent: 'flex-end' }}>
            <Stack direction='row' alignItems='center'>
            {name && <Typography sx={{mr: 2}}>{name}</Typography>}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />
              </IconButton>
            </Tooltip>
            </Stack>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
            <Toolbar>
            {!userId ? 
              (<div>
                <Search>
                  <StyledInputBase
                    placeholder="Log In"
                    inputProps={{ 'aria-label': 'login' }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                </Search>
                <Button
                  size="large"
                  color="inherit"
                  onClick={e => handleLogin(e, input)}
                >
                  Log In
                </Button>
              </div>)
              :
             (<Button onClick={handleLogout}>Log out</Button>)}
            </Toolbar>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
