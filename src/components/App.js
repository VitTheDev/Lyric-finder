import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './Layout/Navbar';
import Index from './Layout/Index';
import Lyrics from './Tracks/Lyrics';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Index />} />
          <Route exact path="/lyrics/:id" component={Lyrics} />
          <Route
            render={() => <h1>Oops, it seems this url doesn't exist</h1>}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
