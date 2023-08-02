import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Typography, ButtonGroup, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import { Pagination, MovieList } from '..';

const Actors = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const history = useHistory();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: actorMovies, isFetching: isActorMoviesFetching } = useGetMoviesByActorIdQuery({ id, page });
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          An error occurred. Go Back.
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} alt={data?.name} />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>{' '}
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
              Back
            </Button>
          </Box>
        </Grid>
        <Box marginTop="2rem 0">
          <Typography variant="h2" gutterBottom align="center">
            Movies
          </Typography>
          {actorMovies ? (
            <>
              <MovieList movies={actorMovies} numberOfMovies={12} />
              <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies.total_pages} />
            </>
          ) : (
            <Box>Sorry, no result found</Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Actors;
