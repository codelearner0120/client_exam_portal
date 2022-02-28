import React from 'react'
import { isValidEmail,isValidName,isValidMobile } from '../common/Validations';

export const RegistrationError=(user, setError, setNotification)=>{
    const {userName,password,email,firstName,phone}=user;
    if(isValidMobile(phone).status===false){
        setNotification({open:true,msg:isValidMobile(phone).message,type:'error',hideDuration:3000})
        setError(true);
        return;
    }
    if(userName==''||userName===undefined||userName===null){
        setNotification({open:true,msg:'Please fill userName field',type:'error',hideDuration:3000})
        setError(true);
        return;
    }
    if(password==''||password===undefined||password===null){
        setNotification({open:true,msg:'Please fill a password field',type:'error',hideDuration:3000})
        setError(true);
        return;
    }
    if(isValidEmail(email).status===false){
        setNotification({open:true,msg:isValidEmail(email).message,type:'error',hideDuration:3000})
        setError(true);
        return;
    }
    if(isValidName(firstName).status===false){
        setNotification({open:true,msg:isValidName(firstName).message,type:'error',hideDuration:3000})
        setError(true);
        return;
    }

}

