import React, {Component} from 'react';
import './css/App.css';
import LoginForm from './components/login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';
import Post from './components/article/post';
import Register from './components/register';
import ArticleDetail from './components/article/detail';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/post" component={Post} />
                    <Route path="/article/detail/:id" component={ArticleDetail}/>
                </div>
            </Router>
        );
    }
}

export default App;
