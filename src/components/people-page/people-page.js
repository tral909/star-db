import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import { PersonList } from '../sw-components';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    const itemList = (
      <PersonList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>

        {(i) => (
          `${i.name} (${i.birthYear})`
        )}

      </PersonList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}
