import jwtDecode from "jwt-decode"

export const useAgent=()=>{
    // const initiateBackgroundTokenRefresh=(jwt)=>{
    //     if(!jwt) return;
    //     validateJwt(jwt).then(decoded=>{
    //         const expiredIn=(decoded.exp*1000)-new Date().getTime() // will expire in 1 sec
    //         const timeOut=(expiredIn)-5*60*1000 //trigger refresh 5 min before expiry
    //         if(expiredIn>0&&timeOut>0){
    //             setTimeout(()=>{
    //                 // getNewToken() 
    //                 // to refresh token
    //             },timeOut)
    //         }
    //     })
    // }
    const authToken=()=>{
        return {"Authorization" : `Bearer ${getJwtToken()}`};
    }
    const clearStorage=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    }
    const logout=()=>{
        clearStorage()
    }
    const getJwtToken=()=>{
        return localStorage.getItem("jwt");
    }
    const getUser=()=>{
        let userStr=localStorage.getItem("user");
        return JSON.parse(userStr);
    }
    const isLoggedIn=()=>{
        // const unParsedAgent=localStorage.getItem("agent");
        const jwt=localStorage.getItem("jwt");
        // if(!unParsedAgent||!jwt){
        //     logout();
        //     return false;
        // }
        if(jwt==''||jwt===undefined||jwt===null) return false;
        // if(jwt){
        //     if(isJwtValid(jwt).then(result=>{
        //         if(!result){
        //             logout();
        //             return false;
        //         }
        //     }));
        // }
        return true;
    }
    const saveInStorage=(dataType,data)=>{
        if(dataType==='jwt') localStorage.setItem('jwt',data);
        if(dataType==='user') {
            localStorage.setItem('user',JSON.stringify(data));
        }
    }
    const onReload=()=>{
        const jwt=localStorage.getItem("jwt");
        // if(isJwtValid(jwt).then(result=>{
        //     if(!result){
        //         logout();
        //         return false;
        //     }
        // }));
        // initiateBackgroundTokenRefresh(jwt);
    }
   return {
        isLoggedIn,onReload,logout,saveInStorage,getJwtToken,getUser,authToken
    }
}
