import React, {Component} from 'react';


export class Forgot extends Component{

render(){

<form onSubmit={this.handleSubmit}>
<h3>Forgot Password</h3>

<div style ={{'margin-bottom': 10}}>
                            <input type="email" class="form-control register-input" placeholder="Email" name="email" onChange={this.handleChange} size="small" />
                        </div>


                        <button class="btn btn-light ggd-button register-button" onClick={this.Subscribe} type="button">Submit</button>

</form>

}





}