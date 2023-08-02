import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies, numberOfMovies }) => {
  const classes = useStyles();

  let moviesToShow;
  if (movies.results) {
    if (numberOfMovies === undefined) {
      moviesToShow = movies.results.map((movie, i) => <Movie key={i} movie={movie} i={i} />);
    } else {
      moviesToShow = movies.results.slice(0, numberOfMovies).map((movie, i) => <Movie key={i} movie={movie} i={i} />);
    }
  } else if (numberOfMovies === 0) {
    moviesToShow = movies.cast.map((movie, i) => <Movie key={i} movie={movie} i={i} />);
  } else {
    moviesToShow = movies.cast.slice(0, numberOfMovies).map((movie, i) => <Movie key={i} movie={movie} i={i} />);
  }

  return (
    <Grid container className={classes.moviesContainer}>
      {moviesToShow}
    </Grid>
  );
};

export default MovieList;
