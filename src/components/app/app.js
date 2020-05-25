import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../sw-service-context';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';

import './app.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';


export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      console.log('switched to', Service.name);

      return {
        swapiService: new Service()
      }
    })
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    const { isLoggedIn } = this.state;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="container stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet updateInterval={10000} />

              <Route
                path="/"
                render={() => <h2>Welcome to StarDB</h2>}
                exact />
              <Route
                path="/people"
                render={() => <h2>People</h2>}
                exact />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route
                path="/starships/:id"
                render={({ match, location, history }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={id} />
                }} />
              <Route
                path="/login"
                render={() =>
                  <LoginPage
                    isLoggedIn={isLoggedIn}
                    onLogin={this.onLogin} />
                }
              />
              <Route
                path="/secret"
                render={() =>
                  <SecretPage
                    isLoggedIn={isLoggedIn} />
                }
              />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
