import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import AutocompleteAddressInput from './Common/AutocompleteAddressInput';
import ImageUploader from 'react-images-upload';
import useApi from '../hooks/useApi';
import { uploadStore } from '../api/Stores';
import { Box, CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const storeSchema = Yup.object().shape({
  title: Yup.string().required(),
  // address: Yup.object({
  //   area: Yup.string().required().label('Area'),
  //   city: Yup.string().required().label('City'),
  //   zip: Yup.number().required().label('Zip'),
  //   coordinates: Yup.object({
  //     latitude: Yup.number().required().label('Location'),
  //     longitude: Yup.number().required().label('Location'),
  //   }).optional(),
  // }),
  // info: Yup.array().of(
  //   Yup.object({
  //     category: Yup.string().label('category'),
  //     content: Yup.array().of(
  //       Yup.object({
  //         title: Yup.string().label('Tag value'),
  //         values: Yup.array().of(Yup.string()).label('Tag value'),
  //       })
  //     ),
  //   })
  // ),
  website: Yup.string().required(),
  phone: Yup.string().required(),
  logo: Yup.string(),
  description: Yup.string().required(),
});

const initialStoreValues = {
  title: '',
  description: '',
  address: {
    location: '',
    coordinates: {
      longitude: 0,
      latitude: 0,
    },
  },
  // address: {
  //   area: '',
  //   city: '',
  //   zip: 0,
  //   coordinates: {
  //     latitude: 0,
  //     longitude: 0,
  //   },
  // },
  // info: [
  //   {
  //     category: '',
  //     content: [
  //       {
  //         title: '',
  //         values: [''],
  //       },
  //     ],
  //   },
  // ],
  website: '',
  phone: '',
  logo: '',
  description: '',
};
export default function AddStoreScreen() {
  const [image, setImage] = useState();
  const imageRef = useRef();
  const [address, setAddress] = useState({
    location: '',
    coordinates: {
      longitude: 0,
      latitude: 0,
    },
  });
  const addStoreApi = useApi(uploadStore);
  const onUploadProgress = (progress) => {
    console.log(progress);
  };
  const onDrop = (picture) => {
    console.log(picture[0]);
    setImage(picture[0]);
  };
  const AddAddressHandler = (address) => {
    console.log(address);
    setAddress(address);
  };
  return (
    <div class="container  pb-2 font_fam w-auto">
      <h3 class="submit-content  fw-bold text-white  text-center mt-3 mb-5">
        Add New Store
      </h3>
      {addStoreApi.loading ? (
        <Box
          p={3}
          style={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      <Formik
        initialValues={initialStoreValues}
        validationSchema={storeSchema}
        onSubmit={async (values, { resetForm }) => {
          const data = {
            ...values,
            address: { ...address },
            logo: image,
          };
          const result = await addStoreApi.request(
            data,
            onUploadProgress
          );
          if (result.ok) {
            toast.success('Store  added successfully !!!', {
              position: toast.POSITION.TOP_CENTER,
              theme: 'colored',
            });
            resetForm();
          } else {
            return toast.error('Could not save the Store!!!');
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="row justify-content-md-center">
            <div class="mb-4  col-lg-6 col-sm-12">
              <Field
                name="title"
                className="form-control"
                placeholder="Title of store"
              />
              {errors.title && touched.title ? (
                <div class="alert alert-danger  p-2" role="alert">
                  {errors.title}
                </div>
              ) : null}
            </div>
            <div class="mb-4 col-lg-6 col-sm-12">
              <Field
                name="description"
                type="text"
                className="form-control"
                placeholder="Description"
              />
              {errors.description && touched.description ? (
                <div
                  class="alert alert-danger  p-2 p-2 "
                  role="alert"
                >
                  {errors.description}
                </div>
              ) : null}
            </div>
            <div className="mb-4 col-lg-6 col-sm-12">
              <AutocompleteAddressInput
                AddAddressHandler={AddAddressHandler}
              />
            </div>

            <div class="mb-4 col-lg-6 col-sm-12">
              <Field
                name="phone"
                type="text"
                className="form-control"
                placeholder="phone Number"
              />
              {errors.phone && touched.phone ? (
                <div
                  class="alert alert-danger  p-2 p-2 "
                  role="alert"
                >
                  {errors.phone}
                </div>
              ) : null}
            </div>
            <div class="mb-4 col-lg-6 col-sm-12">
              <Field
                name="website"
                type="text"
                className="form-control"
                placeholder="Website"
              />
              {errors.website && touched.website ? (
                <div
                  class="alert alert-danger  p-2 p-2 "
                  role="alert"
                >
                  {errors.website}
                </div>
              ) : null}
            </div>
            <div className="mb-4 col-lg-12 w-75 col-sm-12">
              <ImageUploader
                withPreview={true}
                singleImage={true}
                withIcon={false}
                onChange={onDrop}
                ref={imageRef}
                buttonText="Choose Logo"
                buttonStyles={{ background: 'green' }}
                imgExtension={[
                  '.jpg',
                  '.gif',
                  '.png',
                  '.gif',
                  'jpeg',
                ]}
                maxFileSize={5242880}
              />
            </div>
            <div class="cart mt-4 mb-5 align-items-center">
              <button
                type="submit"
                class="btn text-uppercase w-100 creat_btn "
              >
                submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
