// import React, { useContext, useState } from "react";
// import { Field, useFormik } from "formik";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import * as Yup from "yup";
// import Variants from "./common/Variant";
// import Media from "./common/MediaComponent";
// import { CategoryContext } from "./contexts/categoryContext";
// ///////////////////////////////////////
// // import { productData } from './data'
// //import "./utils/style/addProductComponent.css";

// const AddProduct = ({ addProduct }) => {
//   const [description, setDescription] = useState("");
//   const [imgList, setImgList] = useState([]);
//   const [images, setImages] = useState();
//   const [variantsData, setVariantsData] = useState();
//   const { categories, deleteSubCategoryHandler, createSubCategoryHandler } =
//     useContext(CategoryContext);
//   const [parent, setParent] = useState("select parent category");
//   const [children, setChildren] = useState([]);
//   const [child, setChild] = useState("select child category");

//   const handleParentChange = (e) => {
//     setParent(e.target.value);
//     console.log(categories.find((cate) => cate.category === e.target.value));
//     setChildren(
//       categories.find((cate) => cate.category === e.target.value).subCategories
//     );
//   };
//   const handleChildChange = (e) => {
//     setChild(e.target.value);
//     console.log(e.target.value);
//   };
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       price: 0,
//       category: "",
//       costPerItem: 0.54455,
//       chargeTax: false,
//       stockKeepingUnit: "",
//       barcode: "",
//       trackQuantity: false,
//       shipping: "",
//       availableQuantity: 0,
//       physicalProduct: false,
//       weight: 0,
//       variants: {},
//     },
//     validationSchema: Yup.object({
//       // name: Yup.string()
//       //     .max(15, "Must be less than 15 characters")
//       //     .min(3, "name should be more than 3 characters")
//       //     .required('REQUIRED'),
//       // description: Yup.string()
//       //     .max(1500, "Description should not be more than 1500 characters")
//       //     .min(50, 'Description should be of minimum 100 words')
//       //     .required("Required")
//     }),
//     onSubmit: (values) => {
//       const form = new FormData();
//       values.description = description;
//       values.category = `${parent}/${child}`;
//       values.variants = variantsData;
//       console.log({ variantsData });
//       values.imgNames = imgList;
//       // values.images = images;
//       images.forEach((img) => {
//         form.append("images", img);
//       });
//       // for (const key in values) form.append(key, values[key]);
//       addProduct(values, form);
//     },
//   });

//   return (
//     <>
//       <div className="container">
//         <div className="display-6 px-3 fw-bold mt-3 ">Add Product</div>
//       </div>
//       <div className="container mt-3">
//         <form onSubmit={formik.handleSubmit}>
//           <div className="container">
//             <div className="row pb-2">
//               <div className="col-lg-12 col-md-12 mb-3">
//                 <label className="title pb-2 fw-bold" htmlFor="title">
//                   Title
//                 </label>
//                 <input
//                   className="form-control "
//                   id="title"
//                   name="title"
//                   type="text"
//                   {...formik.getFieldProps("title")}
//                 />
//                 {formik.touched.title && formik.errors.title ? (
//                   <div>{formik.errors.title}</div>
//                 ) : null}
//               </div>

//               <div className="col-lg-6 col-md-12 mb-2">
//                 <div className="select-container">
//                   <label className="title pb-1 fw-bold" htmlFor="price">
//                     Category
//                   </label>
//                   <select className="form-control" onChange={handleParentChange}>
//                     <option value={parent}>{parent}</option>
//                     {categories?.map((cate) => (
//                       <option value={cate.category}>{cate.category}</option>
//                     ))}
//                   </select>

//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-12">
//                 <div className="select-container">
//                   <label className="title pb-1 fw-bold" htmlFor="price">
//                     Sub Category
//                   </label>
//                   <select className="form-control" onChange={handleChildChange}>
//                     <option value={child}>{child}</option>
//                     {children?.map((cate) => (
//                       <option value={cate.name}>{cate.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* <input type='select'  component="select" name="child" value={child}
//                        className={"form-control"} onChange={handleChildChange}>
//                         <option value={'select child'}>Select Child</option>
//                         {children?.map(cate => {
//                           return <option value={cate.name}>{cate.name}</option>
//                         })}
//                       </input> */}
//                 {/* {errors.parent && touched.parent ? (
//                         <div class="alert alert-danger  p-2" parent="alert">
//                           {errors.parent}
//                         </div>
//                       ) : null} */}
//               </div>
//             </div>

//             {/* .............................................. */}
//             <div className="row mb-2">
//               <div className="col-lg-12 col-md-12 mb-3">
//                 <label className="title pb-1 fw-bold" htmlFor="title">
//                   Discription
//                 </label>

//                 <CKEditor
//                   editor={ClassicEditor}
//                   data={description}
//                   onChange={(event, editor) => {
//                     const data = editor.getData();
//                     setDescription(data);
//                   }}
//                 />
//               </div>
//               <div className="col-lg-12 col-md-12">
//                 <label className="title fw-bold" htmlFor="title">
//                   Images
//                 </label>

//                 <Media
//                   setImagesList={(imgList) => setImgList(imgList)}
//                   setImages={(images) => setImages(images)}
//                 />
//               </div>
//             </div>
//             {/* .............................................. */}
//             {/* <div className="h4">Pricing</div> */}
//             <div className="row mb-2">
//               <div className="col-lg-6 col-md-12 mb-2">
//                 <label className="title pb-1 fw-bold" htmlFor="price">
//                   Price
//                 </label>
//                 <input
//                   className="form-control "
//                   id="price"
//                   name="price"
//                   type="number"
//                   {...formik.getFieldProps("price")}
//                 />
//                 {formik.touched.price && formik.errors.price ? (
//                   <div>{formik.errors.price}</div>
//                 ) : null}
//               </div>
//               <div className="col-lg-6 col-md-12 mb-2">
//                 {/* .............................................. */}

//                 {/* <label className="title pb-2" htmlFor="compareAtPrice">
//           Compare at price
//         </label>
//         <input
//           className="form-control mb-1 w-50"
//           id="compareAtPrice"
//           name="compareAtPrice"
//           type="number"
//           {...formik.getFieldProps("compareAtPrice")}
//         />
//         {formik.touched.compareAtPrice && formik.errors.compareAtPrice ? (
//           <div>{formik.errors.compareAtPrice}</div>
//         ) : null} */}

//                 {/* .............................................. */}
//                 {/* <label className="title pb-2" htmlFor="costPerItem">
//           Cost per item
//         </label>
//         <input
//           className="form-control mb-1 w-50"
//           id="costPerItem"
//           name="costPerItem"
//           type="number"
//           {...formik.getFieldProps("costPerItem")}
//         />
//         {formik.touched.costPerItem && formik.errors.costPerItem ? (
//           <div>{formik.errors.costPerItem}</div>
//         ) : null} */}

//                 {/* <label className="title pb-2 px-2" htmlFor="chargeTax">
//           Charge Tax
//         </label>
//         <input
//           className="form-check-input mb-1"
//           id="chargeTax"
//           name="chargeTax"
//           type="checkbox"
//           {...formik.getFieldProps("chargeTax")}
//         />
//         {formik.touched.chargeTax && formik.errors.chargeTax ? (
//           <div>{formik.errors.chargeTax}</div>
//         ) : null} */}

//                 {/* .............................................. */}
//                 {/* <div className="h4">Inventory</div>
//         <label className="title pb-2" htmlFor="stockKeepingUnit">
//           Stock Keeping Unit(SKU)
//         </label>
//         <input
//           className="form-control mb-1 w-50"
//           id="stockKeepingUnit"
//           name="stockKeepingUnit"
//           type="text"
//           {...formik.getFieldProps("stockKeepingUnit")}
//         />
//         {formik.touched.stockKeepingUnit && formik.errors.stockKeepingUnit ? (
//           <div>{formik.errors.stockKeepingUnit}</div>
//         ) : null}

//         <label className="title pb-2" htmlFor="barcode">
//           Barcode
//         </label>
//         <input
//           className="form-control mb-1 w-50"
//           id="barcode"
//           name="barcode"
//           type="text"
//           {...formik.getFieldProps("barcode")}
//         />
//         {formik.touched.barcode && formik.errors.barcode ? (
//           <div>{formik.errors.barcode}</div>
//         ) : null} */}

//                 {/* <br /> */}
//                 {/* .............................................. */}
//                 {/* <label className="title pb-2 px-2" htmlFor="trackQuantity">
//           Track Quantity
//         </label>
//         <input
//           className="form-check-input mb-1"
//           id="trackQuantity"
//           name="trackQuantity"
//           type="checkbox"
//           {...formik.getFieldProps("trackQuantity")}
//         />
//         {formik.touched.trackQuantity && formik.errors.trackQuantity ? (
//           <div>{formik.errors.trackQuantity}</div>
//         ) : null}
//         <br /> */}
//                 {/* .............................................. */}

//                 <label className="title pb-1 fw-bold" htmlFor="shipping">
//                   Shipping
//                 </label>
//                 <input
//                   className="form-control mb-1 "
//                   id="shipping"
//                   name="shipping"
//                   type="text"
//                   {...formik.getFieldProps("shipping")}
//                 />
//                 {formik.touched.shipping && formik.errors.shipping ? (
//                   <div>{formik.errors.shipping}</div>
//                 ) : null}
//               </div>
//             </div>
//             {/* .............................................. */}
//             {/* <label className="title pb-2" htmlFor="availableQuantity">
//           Available Quantity
//         </label>
//         <input
//           className="form-control mb-1 w-50"
//           id="availableQuantity"
//           name="availableQuantity"
//           type="number"
//           {...formik.getFieldProps("availableQuantity")}
//         />
//         {formik.touched.availableQuantity && formik.errors.availableQuantity ? (
//           <div>{formik.errors.availableQuantity}</div>
//         ) : null} */}

//             {/* <div className="h4">Shipping</div> */}
//             <div className="row mb-2">
//               <div className="col-lg-12 col-md-12 mb-2">
//                 <label className="title pb-1 fw-bold" htmlFor="physicalProduct">
//                   Physical Product
//                 </label>
//                 <input
//                   className="form-check-input mx-1"
//                   id="physicalProduct"
//                   name="physicalProduct"
//                   type="checkbox"
//                   {...formik.getFieldProps("physicalProduct")}
//                 />
//                 {formik.touched.physicalProduct && formik.errors.physicalProduct ? (
//                   <div>{formik.errors.physicalProduct}</div>
//                 ) : null}

//               </div>
//               {/* .............................................. */}

//               <div className="col-lg-12 col-md-12 mb-2">
//                 <label className="title pb-1 fw-bold" htmlFor="weight">
//                   Weight
//                 </label>
//                 <input
//                   className="form-control"
//                   id="weight"
//                   name="weight"
//                   type="numbwe"
//                   {...formik.getFieldProps("weight")}
//                 />
//                 {formik.touched.weight && formik.errors.weight ? (
//                   <div>{formik.errors.weight}</div>
//                 ) : null}
//               </div>
//             </div>
//             {/* .............................................. */}
//             <Variants
//               sendVariantsData={(variantsData) => setVariantsData(variantsData)}
//               imgList={imgList}
//             />
//             <button className="btn btn-primary my-3" type="submit">
//               Submit
//             </button>
//           </div>
//         </form>

//       </div >
//     </>
//   );
// };

// export default AddProduct;
// // import React, { useState } from 'react'
// // import { useFormik } from 'formik'
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// // import Variants from './common/Variant';
// // import * as Yup from 'yup';
// // import { variantsData } from './common/Variant';
// // import Media from './common/MediaComponent';
// // // import { productData } from '../data'
// // //import "./utils/style/addProductComponent.css";
// // const AddProduct = ({addProduct}) => {
// //     const [description, setDescription] = useState('');
// //     const [imgList, setImgList] = useState([]);
// //     const [images, setImages] = useState();
// //     const formik = useFormik({
// //         initialValues: {
// //             title: '',
// //             price: 0,
// //             compareAtPrice: 0.00,
// //             costPerItem: 0.00,
// //             chargeTax: false,
// //             stockKeepingUnit: '',
// //             barcode: '',
// //             trackQuantity: false,
// //             shipping: false,
// //             availableQuantity: 0,
// //             physicalProduct: false,
// //             weight: 0,
// //             country: '',
// //             variants: {},
// //         },
// //         validationSchema: Yup.object({
// //             // title: Yup.string()
// //             //     .max(15, "Must be less than 15 characters")
// //             //     .min(3, "Title should be more than 3 characters")
// //             //     .required('REQUIRED'),
// //             // description: Yup.string()
// //             //     .max(1500, "Description should not be more than 1500 characters")
// //             //     .min(50, 'Description should be of minimum 100 words')
// //             //     .required("Required")
// //         })
// //         ,
// //         onSubmit: values => {
// //             const form=new FormData();
// //             values.description = description;
// //             values.variants = variantsData;
// //             console.log({variantsData});
// //             values.imgNames = imgList;
// //             // values.images = images;
// //             images.forEach(img => {
// //                 form.append("images",img)
// //             });
// //             for (const key in values) {
// //                 if (typeof(values[key]) === 'object')
// //                     form.append(key,JSON.stringify(values[key],["id","selectedOption","tags","text"]));
// //             else
// //                form.append(key,values[key]);
// //             }
// //             function appendArray(form_data, values, name){
// //                 if(!values && name)
// //                     form_data.append(name, '');
// //                 else{
// //                     if(typeof values == 'object'){
// //                         for(let key in values){
// //                             if(typeof values[key] == 'object')
// //                                 appendArray(form_data, values[key], name + '[' + key + ']');
// //                             else
// //                                 form_data.append(name + '[' + key + ']', values[key]);
// //                         }
// //                     }else
// //                         form_data.append(name, values);
// //                 }

// //                 return form_data;
// //             }
// //          console.log({images});
// //          appendArray(form,variantsData)
// //          addProduct(form);
// //         }
// //     })
// //     return (
// //         <div className="container m-4">
// //             <div className="h2">Add Product</div>
// //             <form onSubmit={formik.handleSubmit}>
// //                 <label className="title pb-2" htmlFor="title">Title</label>
// //                 <input className="form-control mb-1 w-50"
// //                     id='title'
// //                     name='title'
// //                     type='text'
// //                     {...formik.getFieldProps('title')}
// //                 />
// //                 {
// //                     formik.touched.title && formik.errors.title ?
// //                         (<div>{formik.errors.title}</div>) : null
// //                 }

// //                 {/* .............................................. */}
// //                 <label className="title pb-2" htmlFor="title">Discription</label>
// //                 <CKEditor editor={ClassicEditor}
// //                     data={description}

// //                     onChange={(event, editor) => {
// //                         const data = editor.getData();
// //                         setDescription(data);
// //                     }} />
// //                 <Media setImagesList={(imgList) => setImgList(imgList)} setImages={(images) => setImages(images)} />
// //                 {/* .............................................. */}
// //                 <div className="h4">Pricing</div>
// //                 <label className="title pb-2" htmlFor="price">Price</label>
// //                 <input className="form-control mb-1 w-50"
// //                     id='price'
// //                     name='price'
// //                     type='number'
// //                     {...formik.getFieldProps('price')}
// //                 />
// //                 {
// //                     formik.touched.price && formik.errors.price ?
// //                         (<div>{formik.errors.price}</div>) : null
// //                 }
// //                 {/* .............................................. */}

// //                 <label className="title pb-2" htmlFor="compareAtPrice">Compare at price</label>
// //                 <input className="form-control mb-1 w-50"
// //                     id='compareAtPrice'
// //                     name='compareAtPrice'
// //                     type='number'
// //                     {...formik.getFieldProps('compareAtPrice')}
// //                 />
// //                 {
// //                     formik.touched.compareAtPrice && formik.errors.compareAtPrice ?
// //                         (<div>{formik.errors.compareAtPrice}</div>) : null
// //                 }

// //                 {/* .............................................. */}
// //                 <label className="title pb-2" htmlFor="costPerItem">Cost per item</label>
// //                 <input className="form-control mb-1 w-50"
// //                     id='costPerItem'
// //                     name='costPerItem'
// //                     type='number'
// //                     {...formik.getFieldProps('costPerItem')}
// //                 />
// //                 {
// //                     formik.touched.costPerItem && formik.errors.costPerItem ?
// //                         (<div>{formik.errors.costPerItem}</div>) : null
// //                 }

// //                 <label className="title pb-2 px-2" htmlFor="chargeTax">Charge Tax</label>
// //                 <input className="form-check-input mb-1"
// //                     id='chargeTax'
// //                     name='chargeTax'
// //                     type='checkbox'
// //                     {...formik.getFieldProps('chargeTax')}
// //                 />
// //                 {
// //                     formik.touched.chargeTax && formik.errors.chargeTax ?
// //                         (<div>{formik.errors.chargeTax}</div>) : null
// //                 }

// //                 {/* .............................................. */}
// //                 <div className="h4">Inventory</div>
// //                 <label className="title pb-2" htmlFor="stockKeepingUnit">Stock Keeping Unit(SKU)</label>
// //                 <input className="form-control mb-1 w-50"
// //                     id='stockKeepingUnit'
// //                     name='stockKeepingUnit'
// //                     type='text'
// //                     {...formik.getFieldProps('stockKeepingUnit')}
// //                 />
// //                 {
// //                     formik.touched.stockKeepingUnit && formik.errors.stockKeepingUnit ?
// //                         (<div>{formik.errors.stockKeepingUnit}</div>) : null
// //                 }

// //                 <label className="title pb-2" htmlFor="barcode">Barcode</label>
// //                 <input className="form-control mb-1 w-50"
// //                     id='barcode'
// //                     name='barcode'
// //                     type='text'
// //                     {...formik.getFieldProps('barcode')}
// //                 />
// //                 {
// //                     formik.touched.barcode && formik.errors.barcode ?
// //                         (<div>{formik.errors.barcode}</div>) : null
// //                 }

// //                 <br />
// //                 {/* .............................................. */}
// //                 <label className="title pb-2 px-2" htmlFor="trackQuantity">Track Quantity</label>
// //                 <input className="form-check-input mb-1"
// //                     id='trackQuantity'
// //                     name='trackQuantity'
// //                     type='checkbox'
// //                     {...formik.getFieldProps('trackQuantity')}
// //                 />
// //                 {
// //                     formik.touched.trackQuantity && formik.errors.trackQuantity ?
// //                         (<div>{formik.errors.trackQuantity}</div>) : null
// //                 }
// //                 <br />
// //                 {/* .............................................. */}

// //                 <label className="title p-2" htmlFor="shipping">Sell Out of Stock</label>
// //                 <input className="form-check-input mb-1"
// //                     id='shipping'
// //                     name='shipping'
// //                     type='checkbox'
// //                     {...formik.getFieldProps('shipping')}
// //                 />
// //                 {
// //                     formik.touched.shipping && formik.errors.shipping ?
// //                         (<div>{formik.errors.shipping}</div>) : null
// //                 }
// //                 <br />
// //                 {/* .............................................. */}
// //                 <label className="title pb-2" htmlFor="availableQuantity">Available Quantity</label>
// //                 <input className="form-control mb-1 w-50"
// //                     id='availableQuantity'
// //                     name='availableQuantity'
// //                     type='number'
// //                     {...formik.getFieldProps('availableQuantity')}
// //                 />
// //                 {
// //                     formik.touched.availableQuantity && formik.errors.availableQuantity ?
// //                         (<div>{formik.errors.availableQuantity}</div>) : null
// //                 }

// //                 <div className="h4">Shipping</div>

// //                 <label className="title p-2" htmlFor="physicalProduct">Physical Product</label>
// //                 <input className="form-check-input mb-1"
// //                     id='physicalProduct'
// //                     name='physicalProduct'
// //                     type='checkbox'
// //                     {...formik.getFieldProps('physicalProduct')}
// //                 />
// //                 {
// //                     formik.touched.physicalProduct && formik.errors.physicalProduct ?
// //                         (<div>{formik.errors.physicalProduct}</div>) : null
// //                 }

// //                 <br />
// //                 {/* .............................................. */}
// //                 <label className="title pb-2" htmlFor="weight">Weight</label>
// //                 <input className="form-control w-50"
// //                     id='weight'
// //                     name='weight'
// //                     type='numbwe'
// //                     {...formik.getFieldProps('weight')}
// //                 />
// //                 {
// //                     formik.touched.weight && formik.errors.weight ?
// //                         (<div>{formik.errors.weight}</div>) : null
// //                 }

// //                 <label className="title pb-2" htmlFor="country">Country</label>
// //                 <input className="form-control mb-4 w-50"
// //                     id='country'
// //                     name='country'
// //                     type='textarea'
// //                     {...formik.getFieldProps('country')}
// //                 />
// //                 {
// //                     formik.touched.country && formik.errors.country ?
// //                         (<div>{formik.errors.country}</div>) : null
// //                 }
// //                 {/* .............................................. */}
// //                 <Variants />
// //                 <button className="btn btn-primary mb-3" type='submit'>Submit</button>

// //             </form>

// //         </div>
// //     )
// // };

// // export default AddProduct;

import React from 'react';

function AddProductScreen() {
  return <div>AddProductScreen</div>;
}

export default AddProductScreen;
