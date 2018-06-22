import React, {Component} from 'react';
import './css/App.css';
import LoginForm from './components/login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={LoginForm}/>
                </div>
            </Router>
        );
    }
}

export default App;
