import React from 'react'
import { Button } from '@mui/material'
import { CircularProgress } from '@mui/material'

export function RegularButton({color,variant,size,children,loading,...props}){
    return(
        <Button
            fullWidth={props.fullWidth||false}
            color={color||"primary"}
            variant={variant||"contained"}
            size={size||'small'}
            disabled={loading}
            {...props}
        >
            {
                loading?<><CircularProgress size={20} /><span>loading...</span></>:children
            }
        </Button>
    )
}
export function DeleteButton({color,variant,size,children,loading,...props}){
    return(
        <Button
            fullWidth={props.fullWidth||false}
            color={color||"error"}
            variant={variant||"contained"}
            size={size||'small'}
            disabled={loading}
            {...props}
        >
            {
                loading?<><CircularProgress size={20} /><span>Processing...</span></>:children
            }
        </Button>
    )
}