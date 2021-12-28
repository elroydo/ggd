import React from 'react';
import './sign-in.css'

export const FormErrors = ({formErrors}) =>
  <div className='formErrors' style={{backgroundColor: '#fdaaaa', color: '#5F2A2A'}}>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>

