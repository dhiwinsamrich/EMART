import React,{useEffect, useState} from 'react'
//import '../styles/newForm.css'
import { Link, useNavigate } from 'react-router-dom';
import {Box, Button, Grid,Table,
        TableBody,TableCell,TableContainer,
        TableHead,TableRow,Paper,
        Modal,
      }
        from "@mui/material";
import axios from 'axios'
import PropTypes from 'prop-types';
import { EditOutlined } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';




const getInvoiceURL = `${process.env.REACT_APP_API_KEY}/getBillData`;
const DeletegetInvoiceURL = `${process.env.REACT_APP_API_KEY}/deleteBillData?code=`;


const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};



function Invoice() {

  const navigate =useNavigate()



  const[records,setRecords]=useState([])
const[modalShowBill,setModalmodalShowBill]=useState(false)
//const[addCartRecord,setAddCartRecord]=useState()

  useEffect(()=>{
    fetchRecords();

  },[])

  const fetchRecords=()=>{
    axios.post(getInvoiceURL)
    .then((res)=>{
      console.log(res,"api res")
      setRecords(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  


  const handleOnRowClick =(item)=>{
    console.log(item,"handleOnRowClick")
    // <Link to={`InvoiceDetailPage/${item._id}`}/>
    navigate(`/InvoiceEditPage/${item._id}`, { state: { record: { item } } })
  }

  const handleDelete=(item)=>{
    console.log(item,"handleDelete")
    axios.post(DeletegetInvoiceURL+item._id)
    .then(res => {
        console.log('res' ,res)
       setTimeout( () => {
        fetchRecords();
       },1000)
    })
    .catch(err => {
        console.log('err ',err);
    })
  }
  const handlClick = (item) => {
    navigate(`/pdfPage/${item._id}`, { state: { record: { item } } })
  }

  const handleModalShowBillModalClose=()=>{
    setModalmodalShowBill(false)
    fetchRecords()
  }


  return (
<>

      {/* <div className='btn_end_position'>
        <Button
          sx={{ color: 'white', m: 2 }}
          variant="contained"
          onClick={handleAddRecord}
        >
          Create New Invoice
        </Button>
      </div> */}

      <div style={{ width: '100%',marginTop:'80px' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
       <Grid container>
          <Grid item xs={12} md={12} >
            <Item >
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}}>Sr.No</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Product Name</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Brand</TableCell>
            {/* <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Category</TableCell> */}
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Customer Name</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Mobile Number</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Quantity</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Total Price</TableCell>
            <TableCell sx={{fontWeight: 'bold', fontSize: '15px'}} align="center">Purchase Date</TableCell>
            {/* <TableCell align="center">Premium</TableCell> */}
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{row.productName}</TableCell>
              <TableCell align="center">{row.Brand}</TableCell>
              {/* <TableCell align="center">{row.category}</TableCell> */}
              <TableCell align="center">{row.customerName}</TableCell>
              <TableCell align="center">{row.customerMobileNumber}</TableCell>
              <TableCell align="center">{row.Quantity}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.dateofPurchase}</TableCell>
              <TableCell align="right"> <Button   onClick={()=>handleOnRowClick(row)}> <EditOutlined /> </Button> </TableCell> 
              <TableCell align="right"> <Button  onClick={()=>handleDelete(row)} ><DeleteFilled /></Button> </TableCell>
              {/* <TableCell align="right"> <button  className="add-to-cart__button" onClick={()=>handlClick(row)} >Get Invoice Pdf</button> </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>
   

    </>
  )
}

export default Invoice