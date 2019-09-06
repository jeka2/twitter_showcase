import React from 'react';
import logo from './logo.svg';
import './App.css';
import CoverPage from './pages/CoverPage';
import SearchPage from './pages/SearchPage';
import RandomPage from './pages/RandomPage';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';


import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "sdf" };
  }

  callAPI() {

  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path='/' component={CoverPage} />
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/random' component={RandomPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
