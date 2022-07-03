import React from 'react'
import { isValidEmail,isValidName,isValidMobile } from '../common/Validations';

export const RegistrationError=(user,setNotification)=>{
    const {userName,password,email,firstName,phone}=user;
    if(isValidMobile(phone).status===false){
        setNotification({open:true,msg:isValidMobile(phone).message,type:'error',hideDuration:3000})
        return true;
    }
    if(userName==''||userName===undefined||userName===null){
        setNotification({open:true,msg:'Please fill userName field',type:'error',hideDuration:3000})
        return true;
    }
    if(password==''||password===undefined||password===null){
        setNotification({open:true,msg:'Please fill a password field',type:'error',hideDuration:3000})
        return true;
    }
    if(isValidEmail(email).status===false){
        setNotification({open:true,msg:isValidEmail(email).message,type:'error',hideDuration:3000})
        return true;
    }
    if(isValidName(firstName).status===false){
        setNotification({open:true,msg:isValidName(firstName).message,type:'error',hideDuration:3000})
        return true;
    }

}

