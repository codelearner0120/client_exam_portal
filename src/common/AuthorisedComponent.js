import React from 'react'
import { useAgent } from "../Forms/useAgent"

export default React.memo(({children,roles=[]})=>{
    const {isAuthorized}=useAgent();

    if(!isAuthorized(roles)){
        return null;
    }
    return(
        <>
        {
            children
        }
        </>
    )
});