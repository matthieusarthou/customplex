import React from 'react';
import { Typography, Box } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';

const RatedCards = ({ title, data }) => {
  const classes = useStyles();
  console.log('RatedCards');
  return (
    <Box>
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
