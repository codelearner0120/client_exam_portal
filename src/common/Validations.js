import * as jwt_decode from 'jwt-decode'

export const isValidEmail=(email='')=>{
    if(email==''||email===undefined||email===null){
        return {status:false,message:'Please fill email field'}
    }
    return {status:true,message:'Enter Valid Email'}
}
export const isValidName=(name)=>{
    if(name===''||name===undefined||name===null){
        return {
            status:false,
            message:'Please fill firstName field'
        }
    }
    return{
        status:/^[a-zA-z.]+$/.test(name),
        message:'Enter valid Name'
    }
}
export const validateJwt=async (jwt)=>{
    const promiseCallback=(resolve,reject)=>{
        try{
            const decoded=jwt_decode(jwt);
            resolve(decoded)
        } catch(error){
            reject()
        }
    }
    return new Promise(promiseCallback)
}
export const isValidMobile=(mobile='')=>{
    if(/^\+91[6-9]{1}[0-9]{9}$/.test(mobile))
    return {status:true}
    if(/^[6-9]{1}[0-9]{9}$/.test(mobile))
    return {status:true}
    return {status:false,message:'Enter Valid Mobile'}
}