import { EditAttributes } from '@material-ui/icons';
import { Container, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useAgent } from '../Forms/useAgent'
function Profile() {
    const userInfo = useAgent().getUser();
    return (
      <Container component={Paper} maxWidth="sm" elevation={3} >
        <h2 style={{marginTop:'10px'}}>User Details</h2>
        <Divider />
        <Table>
          <TableBody>
        <TableRow>
          <TableCell style={{textAlign:'left'}}>Name :</TableCell>
          <TableCell style={{textAlign:'left'}}>{userInfo.firstName+" "+userInfo.lastName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{textAlign:'left'}}>userName :</TableCell>
          <TableCell style={{textAlign:'left'}}>{userInfo.userName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{textAlign:'left'}}>Email :</TableCell>
          <TableCell style={{textAlign:'left'}}>{userInfo.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{textAlign:'left'}}>Phone :</TableCell>
          <TableCell style={{textAlign:'left'}}>{userInfo.phone}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{textAlign:'left'}}>Role :</TableCell>
          <TableCell style={{textAlign:'left'}}>{userInfo.authorities[0].authority}</TableCell>
        </TableRow>
          </TableBody>
        </Table>
      </Container>
    )
}

export default Profile