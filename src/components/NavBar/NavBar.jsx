import React, { useEffect, useState, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery, Icon } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from './styles';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { setUser, userSelector } from '../../features/auth';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = makeStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px');
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);
  const colorMode = useContext(ColorModeContext);

  const token = localStorage.getItem('request_token');
  let sessionId = localStorage.getItem('session_id');
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionId) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        } else {
          sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton color="inherit" edge="start" style={{ outline: 'none' }} className={classes.menuButton} onClick={() => setMobileOpen((previousMobileOpen) => !previousMobileOpen)}>
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={`/profile/${user.id}`} className={classes.LinkButton} onClick={() => {}}>
                {!isMobile && <>My movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }} alt="Profile" src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`} />
              </Button>
            )}
            {isMobile && <Search />}
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={() => setMobileOpen((previousMobileOpen) => !previousMobileOpen)} ModalProps={{ keepMounted: true }} classes={{ paper: classes.drawerPaper }}>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
