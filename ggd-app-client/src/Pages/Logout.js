import React, { useEffect } from 'react'; 
import { NavLink } from '../Components/NavBar/NavBarElements';
import Auth from '../Auth';

const Logout = (props) => {
  useEffect(() => { //functional component variant of the componentDidMount function
    Auth.logout(); //call logout function in Auth class
    props.handler(); //required to map current location to be able to execute the next line, i.e., / -> /sign-in
    props.history.push('/'); //display home component
  })

  return (
    <div className="main" style={{textAlign: 'center', height: 500, paddingTop: 30, overflowY: 'hidden'}}>
      <h3 className="page-heading"> Successfully Signed out.</h3>
      <NavLink class="btn btn-primary" onClick={props.handler} to="/">Home</NavLink>
    </div>
  );
}
  
  export default Logout;