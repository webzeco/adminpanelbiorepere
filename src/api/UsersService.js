import http from './httpservice';
const url =`${process.env.REACT_APP_URL}/api/v1/user`;
export function addUser(user) {
    return http.post(`${url}/addUser`, {
	email:user.email,
	name:user.name,
    contactNo:user.contactNo,
    password:user.password,
    passwordConfirm:user.password
    });
}
export function getStaff(){
    return http.get(`${url}/staff`);
}
export function deleteUser(name){
    return http.patch(`${url}/delete/${name}`);
}
export  function  getMe() {
    return  http.get(`${url}/me`);
}

export  function  updateMe(data) {
    return  http.patch(`${url}/updateMe`,data);
}


const AllServices = {
    addUser,
    getStaff,
getMe,
    updateMe,
}
export default AllServices;
