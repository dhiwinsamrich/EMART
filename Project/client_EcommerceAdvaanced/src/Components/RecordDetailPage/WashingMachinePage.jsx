import React,{useEffect, useState} from 'react'
//  import '../styles/newForm.css'
import { Link, useNavigate } from 'react-router-dom';
import {Box, Button, Grid,Table,
        TableBody,TableCell,TableContainer,
        TableHead,TableRow,Paper,Card,CardContent,ButtonBase ,Typography,
        ImageList,ImageListItem,ImageListItemBar,ListSubheader,IconButton,
        Modal,
        CardMedia,
        CardActions,
      }
        from "@mui/material";
import axios from 'axios'
import PropTypes from 'prop-types';
// import ModalAddtoCart from '../recordDetailpage/ModalAddToCart';
// import InfoIcon from '@mui/icons-material/Info';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import EditIcon from '@mui/icons-material/Edit';
// import CarRentalRoundedIcon from '@mui/icons-material/CarRentalRounded';
// import DeleteIcon from '@mui/icons-material/Delete';

const getStudentIndexURL = `${process.env.REACT_APP_API_KEY}/getitemsData?code='WashingMachine'`;
const DeletegetDoctorDataURL = `${process.env.REACT_APP_API_KEY}/deleteitems?code=`;
const upsertURL = `${process.env.REACT_APP_API_KEY}/upsertDoctor`;

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



function WashingMachinePage() {

  const navigate =useNavigate()



  const[records,setRecords]=useState([])
const[modalShowBill,setModalmodalShowBill]=useState(false)
const[addCartRecord,setAddCartRecord]=useState()

const[addcart,setAddcart]=useState(false)

  useEffect(()=>{
    fetchRecords();

  },[])

  const fetchRecords=(item)=>{
    console.log('item is : ',item);
    axios.post(getStudentIndexURL)
    .then((res)=>{
      console.log(res,"api res")
      setRecords(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  
  const handleAddRecord = () => {
    console.log('inside new record')
    
    navigate(`/DoctorDetailPage`, {state:{ record: {} }})
  };
  

  const handleOnRowClick =(e,item)=>{
    console.log(item,"handleOnRowClick")
    // <Link to={`WashingMachinePageDetailPage/${item._id}`}/>
    navigate(`/DoctorDetailPage/${item._id}`, { state: { record: { item } } })
  }

  const handleAddCart=(e,item)=>{
    console.log(item,"handleAddCart")
    setAddCartRecord(item)
    setModalmodalShowBill(true)
  }

  const handleModalShowBillModalClose=()=>{
    setModalmodalShowBill(false)
    fetchRecords()
  }

  const handleClick=(item)=>{
    console.log('inside click ',item);
    navigate("/invoiceDetailPage", { state: { record: { item } } })
  }

  const handleRent=(item)=>{
    console.log("inside new handleRent")
    console.log('item is : ',item);
    navigate(`/BikeRentalForm`, {state:{ record: {item} }})
  }

  const handleDelete=(item)=>{
    console.log('inside Delete');
    console.log(item,"item inside delete");
    axios.post(DeletegetDoctorDataURL+item._id)
    .then((res)=>{
      console.log(res,"delete res");
      fetchRecords()
    })
    .catch((err)=>{
      console.log(err,"delete error");
    })
  
  }

  const handleView=(e,item)=>{
console.log("hanlde delete",)

  }

  const handleReturn=(row)=>{
    
    console.log(row,"return");
    row.status='Available';
    console.log(row,"after chg");
    axios.post(upsertURL,row)
    .then((res)=>{
      console.log(res,"res");
      fetchRecords();
    })
    .catch((err)=>{
      console.log(err,"err");
    })
  }
  return (
<>
      <div style={{height: '800px'}}>
    
{/* <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#D8B6A4',
              textDecoration: 'none',
              textShadow: '#F4A950 1px 0 5px',
              justifyContent: 'center',
              marginTop: '-34px'
            }}
          >
          Doctor DB
          </Typography>

      <div className='btn_end_position'>
        <Button
          sx={{ color: '#D8B6A4', m: 2, backgroundColor: '#161B21' }}
          variant="contained"
          onClick={handleAddRecord}
        >
          Add Doctor
        </Button>
      </div> */}

     
      <Grid 
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
      
      {records.map((item) => (
        <>

<Grid item xs={12} sm={6} md={4} key={records.indexOf(item)}>
          <Card sx={{width: '100%', height: '170%', backgroundColor: '#dddddd'}}>
            <CardMedia>
              <div style={{height: '20px'}}></div>
            <img width={'220px'} height={'200px'}
            src={item.imageUrl}></img>

            </CardMedia>
            <CardContent sx={{textAlign: 'initial'}}>
            <Typography variant="h6" component="h2">
                <b>Product Name: </b>{item.productName}
              </Typography>
              <Typography variant="body2" component="h2">
               <b>Brand: </b>{item.brand}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Description: </b>{item.description}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Ratings: </b>{item.rating}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Price: </b>RS :{item.price}
              </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
            <Button sx={{color: '#DDD0C8', backgroundColor: '#323232'}} onClick={() => handleClick(item.productName)}>
            Buy
        </Button>
            {/* <Button sx={{ color: 'White', backgroundColor: 'black'}} variant="outlined"  onClick={(e)=>handleOnRowClick(e,item)}>
                <EditIcon />
                </Button>
                <Button sx={{ color: 'White', backgroundColor: 'black'}} variant="outlined"  onClick={()=>handleDelete(item)}>
                <DeleteIcon />
                </Button> */}
                {/* {
                  item.status === "Booked" ? 
                  <Button sx={{color: 'blueviolet', backgroundColor: '#161B21'}} variant="outlined"  onClick={()=>handleReturn(item)}><b>Return</b></Button>
                  :
                  <Button sx={{color: 'blueviolet', backgroundColor: '#161B21'}} variant="outlined"  onClick={()=>handleRent(item)}>
                  <CarRentalRoundedIcon />
                  </Button>

                } */}
          
            </CardActions>
          </Card>
          </Grid>

          
          </>
       

      ))}
    </Grid>
  

   
    {/* <Modal
        open={modalShowBill}
        onClose={handleModalShowBillModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box sx={ModalStyle}>
          <ModalAddtoCart data={addCartRecord}  handleModal={handleModalShowBillModalClose} />
        </Box>
      </Modal> */}
      </div>
    </>
  )
}

export default WashingMachinePage