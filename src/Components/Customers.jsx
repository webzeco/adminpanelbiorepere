import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import './styles/customer.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser, getAllUsers } from '../api/users';
import useApi from '../hooks/useApi';
export default function Customers() {
  const [users, setUsers] = useState([]);
  const allusersApi = useApi(getAllUsers);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    loadStaff();
  }, []);

  const toggleChecked = (id) => {
    const newArr = users.map((obj) => {
      if (obj.id === id) {
        return { ...obj, active: !obj.active };
      }
      return obj;
    });
    setUsers(newArr);
  };
  const onDeleteHandler = async (user) => {
    console.log({ user });
    const preUsers = users;
    const filtered = users.filter((rev) => rev._id !== user._id);
    // setStaff(filtered);
    try {
      await deleteUser(user.name);
    } catch (error) {
      toast.error('Something went wrong User Not Deleted !!!');
      // setStaff(preUsers)
    }
  };
  const loadStaff = async () => {
    const users = await allusersApi.request();
    if (users.error) {
      return toast.error('Error:Can`t load users ', {
        position: 'top-center',
      });
    }
    setUsers(users.data?.data);
  };
  return (
    <div>
      <div className="container">
        <div className="display-6 px-3 fw-bold mt-3 ">
          All Customers
        </div>
      </div>
      {users.length === 0 ? (
        <Box p={3} style={{ width: '100%', textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div class="table-responsive">
          <table className="table mx-3 mt-3 ">
            <thead>
              <tr
                style={{ background: '#7A7D7C' }}
                className="text-white"
              >
                <th scope="col">Sr.</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Created At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {users &&
              users?.map((user, index) => {
                console.log(user);
                return (
                  <tr style={{ color: '#ffff' }}>
                    <td
                      className="px-2 fw-bold"
                      style={{ width: '2%' }}
                    >
                      {index + 1}
                    </td>
                    <td style={{ width: '5%' }}>
                      {console.log('user.image')}
                      {console.log(user.image)}
                      <img
                        className="img"
                        alt="user image"
                        src={user.image}
                      />
                    </td>
                    <td style={{ width: '10%' }}>{user.firstName}</td>
                    <td style={{ width: '10%' }}>{user.email}</td>
                    <td style={{ width: '10%' }}>
                      {/* {user.createdAt.substring(0, 10)} */}
                      07-02-2022
                    </td>
                    <td style={{ width: '5%' }}>
                      <div class="d-grid gap-1  justify-content-start">
                        {/* <FormControlLabel
                                            control={<Switch checked={user.active} onChange={() => toggleChecked(user.id)} />}
                                        /> */}
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/userDetail/${user._id}`}
                        >
                          <Button variant="contained">Detail</Button>
                        </Link>
                        {/* <button class="btn btn-sm btn-info" type="button">Detail</button>
                                        <button onClick={() => onDeleteHandler(user)} class="btn btn-sm btn-danger" type="button">Delate</button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      )}
    </div>
  );
}
