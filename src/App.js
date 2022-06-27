import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import Search from './Views/Search/search';
import Post from './Views/Post/Post';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact>
         <Search></Search>
        </Route>
        <Route path="/post/:post"  exact>
            <Post></Post>
        </Route>
        <Route path="/tag/:tag">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
