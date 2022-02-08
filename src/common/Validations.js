

export const isValidEmail=(email='')=>{
    return {status:true,message:'Enter Valid Email'}
}
export const isValidName=(value='')=>{
    return{
        status:/^[a-zA-z.]+$/.test(value),
        message:'Enter valid Name'
    }
}
export const isValidMobile=(mobile='')=>{
    if(/^\+91[6-9]{1}[0-9]{9}$/.test(mobile))
    return {status:true}
    if(/^[6-9]{1}[0-9]{9}$/.test(mobile))
    return {status:true}
    return {status:false,message:'Enter Valid Mobile'}
}