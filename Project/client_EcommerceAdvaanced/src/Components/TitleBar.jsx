import * as React from 'react';
import {AppBar,Box,Toolbar,Typography,Menu,Container,MenuItem,IconButton} from '@mui/material';
// import AdbIcon from '@mui/icons-material/Adb';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from "react-router-dom"

const pages = [
  { title: 'Home', toNav: '/' },
  { title: 'Laptops', toNav: '/LaptopPage' },
  { title: 'Mobiles', toNav: '/MobilePage' },
  { title: 'Televisions', toNav: '/TelevisionPage' },
  { title: 'Washing Machine', toNav: '/WashingMachinePage' },
  
  // { title: 'About', toNav: '/about' }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function TitleBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <AppBar position="static" sx={{ bgcolor: "#DDD0C8" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              marginLeft: '100px',
              fontSize: '40px',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '323232',
              textDecoration: 'none',
              textShadow: '#323232 1px 0 10px'
            }}
          >
          E-Mart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              {/* <MenuIcon /> */}
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
              {pages.map((page, index) => (
                <MenuItem
                  key={page.title}
                  onClick={handleCloseNavMenu}
                >
                  <Link to={page.toNav}
                    style={{ textDecoration: 'none', color: 'unset' }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>

                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            E-Mart
          </Typography>
          <Box sx={{
            flexGrow: 1, display: { xs: 'none', md: 'flex' }
            , "& .active": {
              color: "red",
            }
          }}>
            {pages.map((page, index) => (
              <MenuItem key={page.title}

              >
                <Link to={page.toNav}
                  style={{ textDecoration: 'none', color: 'unset' }}
                >
                  <Typography sx={{color:'black'}}>{page.title} </Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TitleBar;