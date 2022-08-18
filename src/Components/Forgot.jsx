import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React from 'react';
// import "./styles/forgot.css"
import { Link } from 'react-router-dom';
const forgotSchema = Yup.object().shape({
  email: Yup.string().email().required('Required').label('Username'),
});

export default function Forgot({ onForgot }) {
  return (
    <div
      className="container  pt-3 mt-5 pb-5 font_fam w-50"
      //  style={{width:'40%',justifyItems:'center', alignSelf:'center'}}
    >
      <h3 className="submit-content fw-bold text-white text-center mt-5">
        Reset Password
      </h3>
      <div className="d-flex justify-content-center text-white pt-2">
        <p className="message_look text-white">
          Remember your password?
        </p>
      </div>

      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={forgotSchema}
        onSubmit={(values) => {
          // console.log(values );
          onForgot(values.email);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <Field
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div className="alert alert-danger p-2" role="alert">
                  {errors.email}
                </div>
              ) : null}
            </div>

            <div className="cart mt-4 align-items-center">
              <button
                type="submit"
                className="btn text-uppercase w-100 creat_btn message_look fw-bold text-white "
              >
                SEND RESET EMAIL
              </button>
            </div>
            <Link
              className="creat_look text-center fw-bold mb-4"
              to="/"
            >
              <h5 className=" mb-2 mt-5  fw-bold text-white">
                Login
              </h5>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}
