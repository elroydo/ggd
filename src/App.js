import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/index';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Pages';
import News from './Pages/News';
import Actions from "./Pages/Actions";
import Calculator from "./Pages/CarbonFootprintCalc";
import MoreInfo from "./Pages/MoreInfo";
import SignIn from "./Pages/Login";
import SignUp from "./Pages/Register";
import SignOut from "./Pages/Logout";
import Footer from "./Components/Footer/Footer";
import UserProfile from "./Pages/UserProfile";
import Chat from "./Pages/Chat";
import Bookmarks from "./Pages/Bookmarks";
import CarbonFootprintHistory from "./Pages/CarbonFootprintHistory";
import Settings from './Components/UserProfile/Settings';
import NotFound from './Pages/NotFound';
import Auth from './Auth';
import Donate from './Pages/Donate';

class App extends Component {
  constructor(props) {
      super(props);
      this.handler = this.handler.bind(this);
      this.state = {authenticated : Auth.isAuthenticated()};
  }

  handler() {
    this.setState({
      authenticated: Auth.isAuthenticated()
    });
  }

  render() {
    const authentication = this.state.authenticated;
    return (
      <div>
        <Router>
            <NavBar loggedIn={authentication}/>
            <Switch>
              <Route path="/" exact component={(props) => <Home handler={this.handler} {...props} />}  />
              <Route path="/news" component={News} />
              <Route path="/actions" component={Actions} />
              <Route path="/carbon-footprint-calc" component={Calculator} />
              <Route path="/more-info" component={MoreInfo} />
              <Route path="/sign-in" component={(props) => <SignIn handler={this.handler} {...props} />} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-out" component={(props) => <SignOut handler={this.handler} {...props} />} />
              <Route path="/user-profile" component={UserProfile} />
              <Route path="/chat" component={Chat} />
              <Route path="/bookmarks" component={Bookmarks} />
              <Route path="/carbon-footprint-history" component={CarbonFootprintHistory} />
              <Route path="/settings" component={Settings} />
              <Route path="/donate" component={Donate} />
              <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
        </Router>
      </div>
    );
  }
}

export default App;


