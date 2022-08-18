import Google from '../utils/img/google.png';
import Facebook from '../utils/img/facebook.png';
import Github from '../utils/img/github.png';
import './styles/loginScreen.css';
import { loginWithEmailAndPass, signWithGoogle } from '../api/auth';
import useApi from '../hooks/useApi';
import { Link, useHistory } from 'react-router-dom';
import { ArrowBack, ArrowRightAltRounded } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { getMe } from '../api/users.js';

const LoginScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const googleSignApi = useApi(signWithGoogle);
  const getMeApi = useApi(getMe);
  const emailAndPasswordLoginApi = useApi(loginWithEmailAndPass);

  const emailAndPassLoginHandler = async (email, password) => {
    const result = await emailAndPasswordLoginApi.request(
      email,
      password
    );
    setUser(result);
    history.push('/dashboard');
  };
  const onGoogleAuthClick = async () => {
    const result = await googleSignApi.request();
    console.log('User:', result);
    setUser(result);
    history.push('/dashboard');
  };
  const github = () => {
    window.open('http://localhost:5000/auth/github', '_self');
  };

  const facebook = () => {
    window.open('http://localhost:5000/auth/facebook', '_self');
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required').label('Email'),
    password: Yup.string().required('Required').label('Password'),
  });
  return (
    <>
      <div style={{ backgroundColor: '#065918' }}>
        <Link className="backLink" to={'/'}>
          <p className="backLinkText">Back</p>
          <ArrowBack className="arrow"></ArrowBack>
        </Link>
      </div>
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div
              className="loginButton google"
              onClick={onGoogleAuthClick}
            >
              <img src={Google} alt="" className="icon" />
              Google
            </div>
            <div className="loginButton facebook" onClick={facebook}>
              <img src={Facebook} alt="" className="icon" />
              Facebook
            </div>
            <div className="loginButton github" onClick={github}>
              <img src={Github} alt="" className="icon" />
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                emailAndPassLoginHandler(
                  values.email,
                  values.password
                );
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
                      <div
                        class="alert alert-danger  p-2"
                        role="alert"
                      >
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
                  </div>

                  <div class="cart mt-4 align-items-center">
                    <button
                      type="submit"
                      class="btn text-uppercase w-100 creat_btn text-center"
                    >
                      {/* {loginApi.loading ? <InnerLoading /> : 'SIGN IN'} */}
                      signUp
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <Link
          className="creat_look text-center fw-bold mb-4"
          to="/signUp"
        >
          <h5 className=" mb-2 mt-5  fw-bold text-white">SignUp</h5>
          <ArrowRightAltRounded
            style={{ color: 'white', height: 35, width: 35 }}
          ></ArrowRightAltRounded>
        </Link>
      </div>
    </>
  );
};

export default LoginScreen;
