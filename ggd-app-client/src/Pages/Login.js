import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { SERVER_URL, ACCESS_TOKEN_NAME } from '../Constants/Constants';
import Auth from '../Auth';
import '../Components/Login/sign-in.css';
import { FormErrors } from '../Components/Login/FormErrors';
import FacebookLogin from 'react-facebook-login';
import Swal from 'sweetalert2';
//var CryptoJS = require("crypto-js"); //to securely store user details within session
class Login extends Component {
  constructor(props) {
    super(props); //parent props passed to this class
    this.initialState = {
      username: '',
      password: '',
      formErrors: {
        username: '',
        password: ''
      },
      usernameValid: false,
      passwordValid: false,
      formValid: false,
      detailsWrong: false
    };
    this.state = this.initialState;

  }

  componentClicked = () => {
    console.log('Facebook btn clicked')
  }

  responseFacebook = (response) => {
    console.log(response);
  }



  resetState() {
    this.setState(this.state)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll); //wait for scroll event
    console.log('Loading')

    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '437476290634-sv7d6nppvpk4dpqpqid00d9l1n8ve18f.apps.googleusercontent.com'
      })
      console.log('Api inited')

      window.gapi.load('signin2', () => {
        const params = {
          onsuccess: () => {
            console.log('User has successfully finished signing in')
          }
        }
        window.gapi.signin2.render('loginButton', params)

      })
    })
  }

  login = () => {
    const user = { //create user object and set values from input as states
      username: this.state.username,
      password: this.state.password,
    };

    //fetch function to post request to back-end
    fetch(SERVER_URL + 'login', {
      method: 'POST', //required method to fulfil http request
      body: JSON.stringify(user), //include user data within body in a JSON format
    })//set to of steps once a successful response is recieved
      .then((response) => {
        const jwtToken = response.headers.get('Authorization'); //get JWT bearer key from response
        if (jwtToken != null) {
          //var ciphertext = CryptoJS.AES.encrypt(this.state.username, Date().toLocaleString());
          sessionStorage.setItem('user', this.state.username); //store username within session storage
          sessionStorage.setItem(ACCESS_TOKEN_NAME, jwtToken); //store JWT bearer key within session storage
          Auth.login();
          this.successModal()
          this.setState({ detailsWrong: false });
          this.props.handler(this.state); //required to map current location to be able to execute the next line, i.e., / -> /sign-in
          this.props.history.push('/'); //display home component
        } else {
          //  alert('Something went wrong.'); //proper validation required here
          this.errorModal();
          this.setState({ detailsWrong: true });  //toggles the pop up to notify the user their details are wrong
          this.setState({
            username: '',
            password: '',
          }) // resets the fields so they are empty for the user to try again
        }
      })
      .catch(function (err) { //if any errors occur, store within err
        console.log('Fetch Error :', err); //proper error handling required here
      });
  };


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'username':
        usernameValid = value.match(/^[a-z0-9_-]{1,16}$/);
        //fieldValidationErrors.username = usernameValid ? '' : ' is invalid, it must contain 3-16 letters or numbers.';
        break;
      case 'password':
        passwordValid = value.length > 0;
        //fieldValidationErrors.password = passwordValid ? '' : ' cannot be blank';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      usernameValid: usernameValid,
      passwordValid: passwordValid
    },
      this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
  }

  //change state if input is entered
  handleChange = (event) => {
    //this.setState({ [event.target.name]: event.target.value });
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
    this.setState({ detailsWrong: false })
  }

  successModal() {
    Swal.fire({
      title: 'Login Successful',
      text: 'Welcome ' + this.state.username + '.'
    })
  }

  errorModal() {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Please enter a valid username/password!'
    })
  }

  render() {
    return (
      <div className="main">
        <div className="page-heading" style={{ paddingTop: 30, paddingBottom: 10 }}>
          <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Sign In</h3>
          <h6>Use your GGD Account</h6>
        </div>
        <br />
        <div className="main2" style={{ margin: "auto", width: "20vw", textAlign: "center" }}>
          <FormErrors formErrors={this.state.formErrors} />
          {this.state.detailsWrong === true && <p style={{ backgroundColor: '#fdaaaa', color: '#5F2A2A', borderRadius: '30px', marginBottom: '1rem', padding: '1rem' }}>Your login details are incorrect, please try again</p>}
          <form>
            <div className="input-group" style={{ marginBottom: 10 }}>
              <input
                type="text"
                class="form-control login-input"
                id="inlineFormInputGroupUsername"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                required
                autofocus
              ></input>
            </div>
            <div style={{ marginBottom: 20 }}>
              <input
                type="password"
                class="form-control login-input"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div>
            </div>
            <div>
              <button
                style={{ width: "20vw" }}
                className="btn btn-light login-button"
                onClick={this.login}
                type="button"
                disabled={!this.state.formValid}
              >
                Login
              </button>
              <div className="login-divider">
                <div className="line-login-divider"></div>
                <div className="or-login-divider">OR</div>
                <div className="line-login-divider"></div>
              </div>
              <div className="other-login-container">
                <div className="google-sign-in" style={{ marginBottom: 10 }}>
                  <div id="loginButton" style={{ width: 'auto' }}>Sign in with Google</div>
                </div>
                <div>
                  <FacebookLogin
                    className="btn btn-light login-button"
                    appId="424474105295536"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
                </div>
              </div>
            </div>
          </form>

          <p style={{ lineHeight: "2rem" }}>
            Not a member?{" "}
            <a href="/sign-up" className="sign-in-link">Sign Up</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
