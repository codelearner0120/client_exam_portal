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
        console.log(localStorage.getItem("jwt"))
        clearStorage()
    }
    const getJwtToken=()=>{
        return localStorage.getItem("jwt");
    }
    const getUser=()=>{
        let userStr=localStorage.getItem("user");
        return JSON.parse(userStr);
    }
    const isAuthorized=(access=[])=>{
        if(access.length===0) return false;
        if(isLoggedIn()){
          if(access==='undefined'||access==null||typeof(access)==='undefined') return false;
          let user=getUser();
          console.log(user)
          if(!user) return false;
          let roles=user.authorities[0].authority
          return access.some(role=>{
              return roles.includes(role);
          })
        }
        return false;
    }
    const isLoggedIn=()=>{

        const jwt=localStorage.getItem("jwt");
        // if(!unParsedAgent||!jwt){
        //     logout();
        //     return false;
        // }
        if(!jwt) return false;
        if(typeof(jwt)=='undefined') return false;
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
        isLoggedIn,onReload,logout,saveInStorage,getJwtToken,getUser,authToken,isAuthorized
    }
}
