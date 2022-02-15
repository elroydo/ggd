import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { SERVER_URL } from '../Constants/Constants';
import '../Components/Register/sign-up.css';
import Swal from 'sweetalert2';

const emailRegex = RegExp(
    /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/);

const formValid = ({ ...rest }) => {
    let valid = true;

    Object.values(rest).forEach(val => {
        val.length > 0 && (valid = false);

    });

    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
            forename: null,
            surname: null,
            allValid: false,
            populated: [],
            formError: {
                username: "",
                password: "",
                email: "",
                forename: "",
                surname: "",
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state.formError)) {
            const user = {
                username: this.state.username,
                password: this.state.password,
                role: 'USER',
                email: this.state.email,
                forename: this.state.forename,
                surname: this.state.surname
            };

            fetch(SERVER_URL + 'register', {
                method: 'POST',
                body: JSON.stringify(user)
            })
            .then(response => {
                if (response.ok) {
                    this.successModal()
                    this.props.history.push("/sign-in");
                } else {
                    this.failedModal()
                    alert("Something went wrong.");
                }
            })
            .catch(function (err) {
                console.log('Fetch Error :', err);
            });
        } else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formError = { ...this.state.formError }, input = this.state.populated;

        switch (name) {
            case "username":
                formError.username = value.length < 3 || value.length > 32 ? "Username: at least 3 to 32 characters" : "";
                input[0] = value.length < 3 || value.length > 32 ? 0 : 1;
                break;
            case "password":
                formError.password = value.length < 3 || value.length > 64 ? "Password: at least 3 to 64 characters" : "";
                input[1] = value.length < 3 || value.length > 64 ? 0 : 1;
                break;
            case "email":
                formError.email = value.length < 3 || value.length > 45 ?
                    "Email: at least 3 to 45 characters"
                    :
                    formError.email = !emailRegex.test(value) ? "Invalid email address" : "";
                ;
                input[2] = (value.length < 3 || value.length > 45) && (!emailRegex.test(value)) ? 0 : 1;
                break;
            case "forename":
                formError.forename = value.length < 3 || value.length > 23 ? "Forename: at least 3 to 23 characters" : "";
                input[3] = value.length < 3 || value.length > 23 ? 0 : 1;
                break;
            case "surname":
                formError.surname = value.length < 3 || value.length > 23 ? "Surname: at least 3 to 23 characters" : "";
                input[4] = value.length < 3 || value.length > 23 ? 0 : 1;
                break;
            default:
                break;
        }

        this.setState({
            populated: input,
            formError, [name]: value,
            allValid: (input.reduce((a, b) => a + b, 0) === 5)
        });
    };

    successModal() {
    Swal.fire({
        title: 'Registraion Successful',
        text: 'Thank you for creating a GGD account, ' + this.state.username + '.\n Please click OK and sign-in using your credentials.'
    })
    }
    
    errorModal() {
    Swal.fire({
        icon: 'error',
        title: 'Registraion Failed',
        text: 'Please try again.'
    })
    }

    render() {
        const { formError, allValid } = this.state;

        return (
            <div className="main content-container register">
                <div className="page-heading" style={{ paddingTop: 30, paddingBottom: 10 }}>
                    <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Sign Up</h3>
                    <h6>Create your GGD Account</h6>
                </div>
                <br />
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="username" style={{ marginBottom: 10 }}>
                        {formError.username.length > 0 && (
                            <span className="error-message">{formError.username}</span>
                        )}
                        <input
                            className={`form-control register-input ${formError.username.length > 0 ? "error" : ""}`}
                            placeholder="Username"
                            type="text"
                            name="username"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="password" style={{ "margin-bottom": 10 }}>
                        {formError.password.length > 0 && (
                            <span className="error-message">{formError.password}</span>
                        )}
                        <input
                            className={`form-control register-input ${formError.password.length > 0 ? "error" : ""}`}
                            placeholder="Password"
                            type="password"
                            name="password"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="email" style={{ "margin-bottom": 10 }}>
                        {formError.email.length > 0 && (
                            <span className="error-message">{formError.email}</span>
                        )}
                        <input
                            className={`form-control register-input ${formError.email.length > 0 ? "error" : ""}`}
                            placeholder="Email"
                            type="email"
                            name="email"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="forename" style={{ "margin-bottom": 10 }}>
                        {formError.forename.length > 0 && (
                            <span className="error-message">{formError.forename}</span>
                        )}
                        <input
                            className={`form-control register-input ${formError.forename.length > 0 ? "error" : ""}`}
                            placeholder="Forename"
                            type="text"
                            name="forename"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="surname" style={{ "margin-bottom": 20 }}>
                        {formError.surname.length > 0 && (
                            <span className="error-message">{formError.surname}</span>
                        )}
                        <input
                            className={`form-control register-input ${formError.surname.length > 0 ? "error" : ""}`}
                            placeholder="Surname"
                            type="text"
                            name="surname"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="create-account">
                        <button className="btn btn-light register-button" type="button" onClick={this.handleSubmit} disabled={!allValid}>Create Account</button>
                        <p style={{ lineHeight: "2rem" }}>
                            Already a member?{" "}
                            <a href="/sign-in" className="sign-up-link">Sign in</a>
                        </p>
                    </div>
                </form>
            </div>

        );
    }
}


export default Register;