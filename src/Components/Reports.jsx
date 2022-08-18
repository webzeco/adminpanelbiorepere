import {
  Box,
  CircularProgress,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser, getAllUsers } from '../api/users';

export default function Reports() {
  const [staff, setStaff] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    loadStaff();
  }, []);

  const toggleChecked = (id) => {
    const newArr = staff.map((obj) => {
      if (obj.id === id) {
        return { ...obj, active: !obj.active };
      }
      return obj;
    });
    setStaff(newArr);
  };
  const onDeleteHandler = async (user) => {
    console.log({ user });
    const preUsers = staff;
    const filtered = staff.filter((rev) => rev._id !== user._id);
    // setStaff(filtered);
    try {
      await deleteUser(user.name);
    } catch (error) {
      toast.error('Something went wrong User Not Deleted !!!');
      // setStaff(preUsers)
    }
  };
  const loadStaff = async () => {
    const res = await getAllUsers();
    if (!res.ok) return;
    setStaff(res.data.data);
    console.log(res);
  };
  return (
    <div>
      <div className="container">
        <div className="display-6 px-3 fw-bold mt-3 ">
          All Reports
        </div>
      </div>

      {staff.length === 0 ? (
        <Box p={3} style={{ width: '100%', textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div class="table-responsive">
          <table className="table mx-3 mt-3 ">
            <thead>
              <tr
                style={{ background: '#7A7D7C' }}
                className=" text-white"
              >
                <th scope="col">Sr.</th>
                <th scope="col">Name</th>
                <th scope="col">Categoty</th>
                <th scope="col">Date</th>
                <th scope="col">Discription</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {staff &&
              staff.map((user, index) => {
                console.log(user);
                return (
                  <tr style={{ color: '#ffff' }}>
                    <td
                      className="px-2 fw-bold"
                      style={{ width: '2%' }}
                    >
                      {index + 1}
                    </td>
                    <td style={{ width: '10%' }}>{user.name}</td>
                    <td style={{ width: '10%' }}>Spam</td>
                    <td style={{ width: '10%' }}>
                      {user.createdAt.substring(0, 10)}
                    </td>
                    <td style={{ width: '10%' }}>new dis</td>
                    <td style={{ width: '5%' }}>
                      <div class="justify-content-start">
                        <button
                          class="btn btn-sm btn-danger"
                          type="button"
                        >
                          Delete
                        </button>
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
