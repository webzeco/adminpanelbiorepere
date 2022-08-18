import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updatePassword } from '../api/auth';
const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Required')
    .label('currentPassword'),
  newPassword: Yup.string().required('Required').label('NewPassword'),
  confirmNewPassword: Yup.string()
    .required('Required')
    .label('ConfirmNewPassword'),
});
export default function UpdatePassword() {
  const updatePasswordHandler = async (values) => {
    try {
      const { data } = await updatePassword(values);
      console.log(data);
      toast.success('Password Successfully Updated !!!');
    } catch (error) {
      toast.error('Please enter Correct Current Password !');
    }
  };
  return (
    <div class="container pt-5 mt-5 pb-5 font_fam w-auto">
      <h3 class="submit-content fw-bold text-center mt-5">
        UPDATE PASSWORD
      </h3>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={passwordSchema}
        onSubmit={(values) => {
          updatePasswordHandler(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div class="mb-4 mt-5 ">
              <Field
                name="currentPassword"
                className="form-control"
                placeholder="currentPassword"
              />
              {errors.currentPassword && touched.currentPassword ? (
                <div class="alert alert-danger  p-2" role="alert">
                  {errors.currentPassword}
                </div>
              ) : null}
            </div>
            <div class="mb-4">
              <Field
                name="newPassword"
                type="password"
                className="form-control"
                placeholder="newPassword"
              />
              {errors.newPassword && touched.newPassword ? (
                <div
                  class="alert alert-danger  p-2 p-2 "
                  role="alert"
                >
                  {errors.newPassword}
                </div>
              ) : null}
            </div>{' '}
            <div class="mb-4">
              <Field
                name="confirmNewPassword"
                type="password"
                className="form-control"
                placeholder="confirmNewPassword"
              />
              {errors.confirmNewPassword &&
              touched.confirmNewPassword ? (
                <div
                  class="alert alert-danger  p-2 p-2 "
                  role="alert"
                >
                  {errors.confirmNewPassword}
                </div>
              ) : null}
            </div>
            <div class="cart mt-4 align-items-center">
              <button
                type="submit"
                class="btn text-uppercase w-100 creat_btn "
              >
                Update Password
              </button>
            </div>
            <Link
              class="creat_look text-center fw-bold mb-4"
              to="/dashboard"
            >
              <h5 class=" mb-2 mt-5 creat_look">Go Back</h5>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}
