import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './App.css';
// import Nav from './components/Nav';
// import About from './components/About';
import Header from './components/header/Header'
import Body from './components/body/Body'
import React, {useContext, useEffect} from 'react';
import { UserContext } from './contexts/UserContext';
function App() {
  const { LOGIN_STATE } = useContext(UserContext)

  const [loginState, setLoginState] = LOGIN_STATE


  useEffect(() => {
    const dummy = async () => {
      let firstLogin = localStorage.getItem('firstLogin')

      if (firstLogin) {
        setLoginState(true)


      }



    }
    dummy()

  }, [loginState, setLoginState])
  return (
    // <Router>
    // <div className="App">
    //   <Nav/>
    //   <Switch>
    //     <Route path='/About' exact component = {About}/>
    //   </Switch>
    // </div>
    // </Router>
    <Router>

      <div className="App">
        <Header />
        <Body />
      </div>

    </Router>

  );
}

export default App;
