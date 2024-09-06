import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, DialogActions, Box, TextField, Autocomplete, Select, FormLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Modal } from 'antd';

const upsertBillData = `${process.env.REACT_APP_API_KEY}/upsertBillData`;

const InvoiceEditPage = ({ item }) => {

  const [passedRecord, setPassedRecord] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNew, setshowNew] = useState(true)
    const[isModalOpen,setisModalOpen] = useState(true)
    const[getquans,setgetquans] = useState(1);

  // notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


//   const initialValues = {
//     productName: ,
//     customerName: '',
//     customerMobileNumber: '',
//     dateofPurchase: '',
//     // proposedDate:'',
//     Quantity: '',
//     price: '',
//     Brand:location.state.record.item.brand,
//     category:location.state.record.item.category,
//   }

  const savedValues = {
    _id:passedRecord?._id ?? "",
    productName: passedRecord?.productName ?? "",
    customerName: passedRecord?.customerName ?? "",
    customerMobileNumber:passedRecord?.customerMobileNumber??"",
    Quantity: passedRecord?.Quantity ?? "",   
    dateofPurchase:passedRecord?.dateofPurchase??"",
    price: passedRecord?.price ?? "",
    Brand: passedRecord?.Brand ?? "",
    category: passedRecord?.category ?? "",
  }
 
  useEffect(() => {

    console.log('insideee')
    setisModalOpen(true);
    if(location.state.record.item){
      console.log('passed record', location.state.record.item);
      setPassedRecord(location.state.record.item);
      setshowNew(!location.state.record.item)
    }
  }, [])


 

  const validationSchema = Yup.object({
    productName: Yup
      .string()
      .required('Required')
      .max(30, 'productName must be less than 30 characters'),
  
  })

  const formSubmission = (values) => {

    
    console.log('fooooooooooo')
    values.price = values.Quantity * location.state.record.item.price;
    console.log('form submission value', values);

    let formData;
    function getFormData(values) {
      console.log("inside getFormData ")
         formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));
        return formData;
    }
    getFormData(values)
    // if(showNew){
    //   getFormData(values)
    // }
    // else if(!showNew){
    //   getFormData(values)
    // }
   
    axios.post(upsertBillData,values)
      .then((res) => {
        console.log('upsert record  response', res);
        setTimeout(() => {
          navigate(-1);
        }, 1000)
      })
      .catch((error) => {
        console.log('upsert record  error', error);
      })
  }
  const handleFormClose = () => {
    navigate(-1)
  }
  const handleOk = () => {

  }
  const handleCancel = () => {

  }
  return (
    // <Modal style={{height:'500px',display: 'inherit'}} open={isModalOpen} onOk={handleOk} onCancel={handleFormClose}>
    <div style={{height:'800px'}}>
    <Grid item xs={12} style={{ margin: "20px" }}>
      <div style={{backgroundColor: '#DDD0C8', height: '500px', borderRadius: '25px', boxShadow: '3px 3px 4px 2px #323232'}}>
        <div style={{ textAlign: "center", marginBottom: "10px",marginTop:'100px',
        fontSize: 30, textShadow: '2px 0px 2px #323232' }}>
        {
          showNew ? <h3>Invoice Details</h3> : <h3>Invoice Details </h3>
        }
      </div>
      <div style={{height:'400px'}}>
        <Formik
          enableReinitialize={true}
          initialValues={savedValues}
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
                          <FormLabel htmlFor="productName">Product Name  <span className="text-danger">*</span></FormLabel>
                          <Field name="productName" type="text"  readOnly class="form-input" />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name="productName" />
                          </div>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="Brand">Brand Name  <span className="text-danger">*</span></FormLabel>
                          <Field name="Brand" type="text"  readOnly class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="category">Category  <span className="text-danger">*</span></FormLabel>
                          <Field name="category" type="text"  readOnly class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="Quantity">Quantity </FormLabel>
                          <Field name="Quantity" type="number"  class="form-input" />
                        </Grid> 
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="customerName">Customer Name  <span className="text-danger">*</span></FormLabel>
                          <Field name="customerName" type="text" class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="customerMobileNumber">MobileNumber </FormLabel>
                          <Field name="customerMobileNumber" type="number" class="form-input" />
                        </Grid> 
                        <Grid item xs={6} md={6}>

                          <FormLabel htmlFor="price">Price </FormLabel>
                          {
                            showNew ? 
                        
                          <Field name="price" type="number" value={values.Quantity * location.state.record.item.price} readOnly class="form-input" />
                        :
                        <Field name="price" type="number"  readOnly class="form-input" />
                       
                        }
                       
                          </Grid> 
                        {/* <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="type">Type </FormLabel>
                          <Field name="type" as="select" class="form-input"  >
                            <option value="">None </option>
                            <option value="Electrical"><em>Electrical</em></option>
                            <option value="Mechanical">Mechanical</option>
                          </Field>
                        </Grid>                         */}
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="dateofPurchase">Purchase Date</FormLabel>
                          <Field name="dateofPurchase" type="date" class="form-input" />
                        </Grid>
                       
                      </Grid>
                      <div className='action-buttons'>
                        <DialogActions sx={{ justifyContent: "space-between" }}>
                          {
                            showNew ?
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}   >Save</Button>
                              :
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}  >Save</Button>
                          }
                          <Button type="reset" variant="contained" onClick={handleFormClose}  >Cancel</Button>
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
    </div>
    // </Modal>
  )
}
export default InvoiceEditPage;

