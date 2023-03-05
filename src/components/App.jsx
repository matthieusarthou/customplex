import React from 'react';
import { CssBaseline } from '@mui/material';
import { Switch, Route } from 'react-router-dom';
import { Actors, NavBar, MovieInformation, Movies, Profile } from '.';
import toucheMesCouilles from './styles';

const App = () => {
  const classes = toucheMesCouilles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>
          <Route exact path="/movie/:id">
            <MovieInformation />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/actors/:id">
            <Actors />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
