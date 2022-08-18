import client from './client';

export function addUser(user) {
  return client.post('/user/addUser', {
    email: user.email,
    name: user.name,
    contactNo: user.contactNo,
    password: user.password,
    passwordConfirm: user.password,
  });
}

export function getAllUsers() {
  return client.get('/users/all');
}

export function deleteUser(name) {
  return client.patch(`/user/delete/${name}`);
}
export function getMe() {
  return client.get('/user/me');
}

export function updateMe(data) {
  return client.patch(`/user/updateMe`, data);
}

const AllServices = {
  addUser,
  getAllUsers,
  getMe,
  updateMe,
};
export default AllServices;
