import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './styles/login.css';
import { AuthContext } from '../contexts/AuthContextProvider';
import { toast } from 'react-toastify';
import useApi from './../hooks/useApi';
import InnerLoading from './Common/InnerLoading';
import { login } from '../api/auth';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required').label('Email'),
  password: Yup.string().required('Required').label('Password'),
  role: Yup.string().label('Role'),
});
function Login() {
  const { user, setUser } = useContext(AuthContext);
  const loginApi = useApi(login);
  const history = useHistory();
  // const [role, setRole] = useState('admin');
  // const handleChange = (e) => {
  //   setRole(e.target.value);
  //   console.log(e.target.value);
  // }
  const loginHandler = async (user) => {
    const res = await loginApi.request(user);

    if (!res.ok)
      return toast.error('Incorrect username or password', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
    await setUser(res.data.user);
    localStorage.setItem('jwt', res.data.token);
    toast.success('logged in successfully !!!', {
      position: toast.POSITION.TOP_CENTER,
      theme: 'colored',
    });
    history.push('/');
  };

  return (
    <>
      <div
        class="container   mt-5  font_fam w-50 "
        style={{ background: '#065918' }}
      >
        <div class="submit-content fw-bold text-center mt-5">
          <h3 style={{ color: '#ffff' }}>LOGIN</h3>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            height={'150px'}
          />
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            // same shape as initial values
            // values.role = role;
            console.log(values);
            loginHandler(values);
            // console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div class="mb-4">
                <Field
                  name="email"
                  className="form-control"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <div class="alert alert-danger  p-2" role="alert">
                    {errors.email}
                  </div>
                ) : null}
              </div>

              <div class="mb-4">
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <div
                    class="alert alert-danger  p-2 p-2 "
                    role="alert"
                  >
                    {errors.password}
                  </div>
                ) : null}
                <Link
                  to="/forgot"
                  class="float-end small pb-2 pt-1 fg_link  fw-bold "
                >
                  <p>FORGOT PASSWORD?</p>
                </Link>
              </div>

              {/* <div class="mb-4 mt-5 text-primary">
              <Field type='select' component="select" name="role" value={role} className={"form-control"} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
              {errors.role && touched.role ? (
                <div class="alert alert-danger  p-2" role="alert">
                  {errors.role}
                </div>
              ) : null}
            </div> */}
              <div class="cart mt-4 align-items-center">
                <button
                  type="submit"
                  class="btn text-uppercase w-100 creat_btn text-center"
                >
                  {loginApi.loading ? <InnerLoading /> : 'SIGN IN'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Link className="creat_look text-center fw-bold mb-4" to="/">
        <h5 className=" mb-2 mt-5  fw-bold text-white">Go Back</h5>
      </Link>
    </>
  );
}
export default withRouter(Login);
