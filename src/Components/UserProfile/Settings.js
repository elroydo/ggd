import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import '../../App.css';
import { updateUserDetails } from '../UserProfile/UserAPI'

const emailRegex = RegExp(
    /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/);

// const formValid = ({ ...rest }) => {
//     let valid = true;

//     Object.values(rest).forEach(val => {
//         val.length > 0 && (valid = false);

//     });

//     Object.values(rest).forEach(val => {
//         val === null && (valid = false);
//     });

//     return valid;
// };

class Settings extends Component {
    constructor(props) {
        super(props); //parent props passed to this class
        console.log(this.props.user)
        this.state = { 
          id: this.props.user.id,
          password: '',
          forename: '',
          surname: '',
          email: '',
          role: this.props.user.role,
          username: this.props.user.username,
          allValid: false,
        populated: [],
          formError: {
            forename: "",
            surname: "",
            email: "",
            password: "",
            newpassword: "",
        }
          
          
        };
      }  
      saveChanges = () => {
        const user = { //create user object and set values from input as states
            
            password: this.state.password,
            email: this.state.email,
            forename: this.state.forename,
            surname: this.state.surname,
        }
        console.log(user)
        updateUserDetails(user)
        
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formError = { ...this.state.formError }, input = this.state.populated;

        switch (name) {
            case "forename":
                formError.forename = value.length < 3 || value.length > 23 ? "Forename: at least 3 to 23 characters" : "";
                input[1] = value.length < 3 || value.length > 23 ? 0 : 1;
                break;
            case "surname":
                formError.surname = value.length < 3 || value.length > 23 ? "Surname: at least 3 to 23 characters" : "";
                input[2] = value.length < 3 || value.length > 23 ? 0 : 1;
                break;
            case "email":
                formError.email = value.length < 3 || value.length > 45 ?
                    "Email: at least 3 to 45 characters"
                    :
                    formError.email = !emailRegex.test(value) ? "Invalid email address" : "";
                ;
                input[3] = (value.length < 3 || value.length > 45) && (!emailRegex.test(value)) ? 0 : 1;
                break;
            case "password":
                formError.password = value.length < 3 || value.length > 64 ? "Password: at least 3 to 64 characters" : "";
                input[4] = value.length < 3 || value.length > 64 ? 0 : 1;
                break;
            case "newpassword":
                formError.newpassword = value.length < 3 || value.length > 64 ? "New Password: at least 3 to 64 characters" : "";
                input[5] = value.length < 3 || value.length > 64 ? 0 : 1;
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

    render(){
        const { formError, allValid} = this.state;
        return (
            <div className="main" style ={{ margin: 'auto', width:'100%'}}>
                <h4 style = {{paddingTop: 30, paddingBottom:10, textAlign: 'center', fontWeight: 'bold'}}> Settings </h4> 
                <div className="user-settings">
                    <form noValidate>
                        <div class="d-flex justify-content-between"> 
                            <div class="forename" style={{width:'50%' ,marginRight:20, marginBottom: 10}}>
                                {formError.forename.length > 0 && (<span className="error-message">{formError.forename}</span>)}
                                <input type="text" className={`form-control register-input ${formError.forename.length > 0 ? "error" : ""}`}  placeholder="Forename" name="forename" aria-label="Forename" value={this.state.name} onChange={this.handleChange}></input>
                                
                            </div>
                            <div class="surname" style={{width:'50%', marginLeft:20}}>
                                {formError.surname.length > 0 && (<span className="error-message">{formError.surname}</span>)}
                                <input type="text"  className={`form-control register-input ${formError.surname.length > 0 ? "error" : ""}`} placeholder="Surname" name ="surname" aria-label="Surname" value={this.state.surname} onChange={this.handleChange}></input>
                            </div>
                        </div>
            
                        <div class="email" style={{marginBottom: 10}}>
                            {formError.email.length > 0 && (<span className="error-message">{formError.email}</span>)}
                            <input type="text" className={`form-control register-input ${formError.email.length > 0 ? "error" : ""}`} placeholder="Email" name ="email" aria-label="email" value={this.state.email} onChange={this.handleChange}></input>
                        </div>
            
                        <div class="password">
                        {formError.password.length > 0 && (<span className="error-message">{formError.password}</span>)}
                        <input type="password" className={`form-control register-input ${formError.password.length > 0 ? "error" : ""}`}  placeholder="Password" name="password" aria-label="Password" value={this.state.password} onChange={this.handleChange}></input>
                        </div>
            
                        <label class="form-label" style={{textAlign: 'center', width: '100%'}}>Change Password?</label>
                        <div class="newpassword">
                            {formError.newpassword.length > 0 && (<span className="error-message">{formError.newpassword}</span>)}
                            <input type="text" className={`form-control register-input ${formError.newpassword.length > 0 ? "error" : ""}`} placeholder="New Password" name="newpassword" aria-label="New-Password" aria-describedby="basic-addon1" value={this.state.newpassword} onChange={this.handleChange}></input>
                        </div>
                            
                        <div class="d-flex justify-content-around"> 
                            <div class="d-grid gap-3 d-md-block">
                                <button style={{margin: 20}} class="btn btn-primary" type="button">Delete Account</button>
                                {/*<button style={{margin: 20}} class="btn btn-primary" type="button">Disable Account</button> functionality to be added later*/}
                                <button style={{margin: 20}} class="btn btn-primary" type="button" onClick={this.saveChanges} disabled={!allValid}>Save Changes</button>
                               
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Settings
