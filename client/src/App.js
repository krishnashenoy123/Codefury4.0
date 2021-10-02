import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import About from './components/About';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Switch>
        <Route path='/About' exact component = {About}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
