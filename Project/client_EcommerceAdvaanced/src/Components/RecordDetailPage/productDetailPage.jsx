import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, DialogActions, Box, TextField, Autocomplete, Select, FormLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

const upsertURL = `${process.env.REACT_APP_API_KEY}/upsertitemsData`;

const ProductDetailPage = ({  }) => {

  const [passedRecord, setPassedRecord] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNew, setshowNew] = useState(true)


  // notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  useEffect(() => {

    if(location.state.record.item){
      console.log('passed record', location.state.record.item);
      setPassedRecord(location.state.record.item);
      // setshowNew(!location.state.record.item)
    }
  }, [])

  console.log(location.state.record.item,"item")
  let stringifiedItem = JSON.stringify(location.state.record.item);
  console.log('stringifiedItem',stringifiedItem);


  const initialValues = {
    brand: '',
    category: '',
    description: '',
    price: '',
    rating: '',
    productName: '',
    imageUrl: '',
  }

  const savedValues = {
    brand: passedRecord?.brand ?? "",
    category: passedRecord?.category ?? "",
    description: passedRecord?.description ?? "",   
    price:passedRecord?.price??"",
    rating: passedRecord?.rating ?? "", 
    productName: passedRecord?.productName ?? "", 
    imageUrl:passedRecord?.imageUrl??"",
    _id: passedRecord?._id ?? "",
  }


  const validationSchema = Yup.object({
    brand: Yup
      .string()
      .required('Required')
      .max(30, 'brand must be less than 30 characters'),
  
  })

  const formSubmission = (values) => {

 
  
    console.log('form submission value', values);
    // delete values.imageURL;
    let formData;
    function getFormData(values) {
      console.log("inside getFormData ")
         formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));
        return formData;
    }
    if(showNew){
      getFormData(values)
    }
    else if(!showNew){
      getFormData(values)
    }

    axios.post(upsertURL, formData)
      .then((res) => {
        console.log('upsert record  response', res);
        setTimeout(() => {
          navigate(-1);
        
        }, 2000)
      })
      .catch((error) => {
        console.log('upsert record  error', error);
      })
  }
  const handleFormClose = () => {
    navigate(-1)
  }
  return (

    <Grid item xs={12} style={{ margin: "20px", height: '600px' }}>
      <div style={{  backgroundColor: '#ddd0c8',borderRadius: '20px'}}>
        <div style={{ textAlign: "center", marginBottom: "10px",
        fontSize: 30, backgroundColor: '#323232', color: '#f1ece9', borderRadius: '15px', textShadow: '0px 2px 3px #f1ece9' }}>
        {
          showNew ? <h3>New Product</h3> : <h3>Product Details</h3>
        }
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={showNew ? initialValues : savedValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { formSubmission(values) }}
        >
          {(props) => {
            const {
              values,
              isSubmitting,
              setFieldValue
            } = props;

            return (
              <>
                <div className='form_center_box'>

                  <Box m="auto">
                    <Form>
                      <Grid container spacing={2}>
                      <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="brand">Brand<span className="text-danger">*</span></FormLabel>
                          <Field name="brand" type="text" class="form-input" />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name="brand" />
                          </div>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="productName">Product Name</FormLabel>
                          <Field name="productName" type="text" class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="category">Category<span className="text-danger">*</span></FormLabel>
                          <Field name="category" as="select" class="form-input" readOnly >
                            <option value='NONE'><em>NONE</em></option>
                            <option value='Laptop'>Laptop</option>
                            <option value='Mobiles'>Mobiles</option>
                            <option value='Televisions'>Televisions</option>
                            <option value='WashingMachine'>WashingMachine</option>
                          </Field>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="description">Description<span className="text-danger">*</span></FormLabel>
                          <Field name="description" as="textarea" class="form-input" />
                        
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="price">Price</FormLabel>
                          <Field name="price" type="number" class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="rating">Rating</FormLabel>
                          <Field name="rating" type="number" class="form-input" />
                        </Grid>
                        
                        

                        {
                          showNew &&
                          <Grid item xs={6} md={6}>
                                            <label htmlFor="imageUrl">Product Image</label>
                                            <Field id="file" name="imageUrl" type="file"
                                            class="form-input"
                                            onChange={(event) => {
                                                console.log(event.currentTarget.files[0], "event")
                                               
                                                setFieldValue("file", event.currentTarget.files[0]);
                                            }} />
                                        </Grid>
          }
                        {
                          !showNew &&
                          <>
                                                   
                          <Grid item xs={12} md={12}>
                            <img src={passedRecord.imageUrl}width="400" height="500"/>
                            </Grid>
                            </>
                        }
                      </Grid>
                      <div className='action-buttons'>
                        <DialogActions sx={{ justifyContent: "space-between" }}>
                          {
                            showNew ?
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting} sx={{backgroundColor: '#8bd8bd', color: '#243665'}}>Save</Button>
                              :
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting} sx={{backgroundColor: '#243665', color: '#8bd8bd'}}>Update</Button>
                          }
                          <Button type="reset" variant="contained" onClick={handleFormClose} sx={{backgroundColor: '#243665', color: '#8bd8bd'}} >Cancel</Button>
                        </DialogActions>
                      </div>
                    </Form>
                  </Box>
                </div>
              </>
            )
          }}
        </Formik>
      </div>
      </div>
    </Grid>
  )
}
export default ProductDetailPage;

