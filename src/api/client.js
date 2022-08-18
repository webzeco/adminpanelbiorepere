import { create } from 'apisauce';
let baseURL1 = 'http://localhost:5000/api';
let baseURL2 = 'https://taapn.herokuapp.com/api/v1';
const apiClient = create({
  baseURL: baseURL1,
});
console.log(process.env.REACT_APP_URL);

// apiClient.addAsyncRequestTransform((request) => {
//   const authToken = localStorage.getItem('jwt');
//   if (!authToken) return;
//   request.headers.authorization = authToken;
// });
if (localStorage.getItem('jwt'))
  apiClient.setHeader('x-token', localStorage.getItem('jwt'));

export default apiClient;
