import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import makeStyles from './styles';

const logoForDarkTheme = 'https://i.imgur.com/efIf4Iq.jpg';
const logoForLightTheme = 'https://i.imgur.com/89TYW4u.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const genres = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = makeStyles();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img alt="My custom Plex logo" src={theme.palette.mode === 'dark' ? logoForDarkTheme : logoForLightTheme} className={classes.image} />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/#">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img src={logoForDarkTheme} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {genres.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/#">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img src={logoForDarkTheme} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
