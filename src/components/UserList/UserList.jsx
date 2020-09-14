import React, { useState, useEffect, Fragment } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { fetchUsersApi, deleteUserApi } from '../../api';

const UserList = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers () {
        const users = await fetchUsersApi();
        setUsers(users);
    }

    async function deleteUser (id) {
        await deleteUserApi(id);
        setUsers(users.filter(user => user.id !== id));
    }
    console.log (users);
    
    if (users.length === 0) {
      return 'Loading...';
    }

    return <Fragment>
      <h1>User List</h1>
      <Paper elevation={2}>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
                <TableCell align="center">{user.first_name}</TableCell>
                <TableCell align="center">{user.last_name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                </TableCell>
                <TableCell align="center">
                    <Button variant="contained" color="secondary" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </Fragment>
}

export default UserList;