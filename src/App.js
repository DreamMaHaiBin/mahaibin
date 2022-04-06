
import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducer from './Reducer/index';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Home from "./components/Home/index"
import AuthRoute from "./components/AuthRoute/index"
import Administrators from "./components/Administrator/index"
import WrappedNormalLoginForm from './components/Login';
// import Header from "../src/components/Home/header"
const store = createStore(Reducer, applyMiddleware(thunk));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
        <div className="App">
           <Provider store={store}>
          <Router>
            <Switch>
              <AuthRoute path="/administrator" component={Administrators}></AuthRoute>
              <Route exact path="/" component={WrappedNormalLoginForm}></Route>
              <Route path="/index" component={Home}></Route>
            </Switch>
          </Router>
          </Provider>
        </div>
    )
  }
}

export default App;
