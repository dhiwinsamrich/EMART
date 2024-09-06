import axios from 'axios'
import {useState,useEffect} from 'react'
import { Card ,Button, grid2Classes} from '@mui/material';
import Modal from '@mui/material/Modal';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { AudioOutlined, SearchOutlined } from '@ant-design/icons';
import { Grid, Input,Select, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


let storeData=[];
let duplicatearr =[];
const getdataURL = `${process.env.REACT_APP_API_KEY}/getitemsData`;

// const DeletegetCarIndexURL = `${process.env.REACT_APP_API_KEY}/deleteBikes?code=`;

const upsertURL = `${process.env.REACT_APP_API_KEY}/upsertitemsData`;



function HomePage ()
{
  const navigate =useNavigate()
    
    const[dataList,setDataList]=useState([]);
  // const [open, setOpen] = useState(false);

  //const [fetchData1,setFetchData1]=useState([])

  useEffect (() => {

    // getData();
   

  },[])

  // const getData = () => {

  //       axios.post(getdataURL)
  //       .then(res => {
             
  //           console.log('ressss  ',res);
  //           setDataList(res.data);
  //           duplicatearr=res.data;
  //           if(res.data.length === 0)
  //           {
  //               console.log('inside another call function')
  //               // fetchData();
  //           }
  //       })
  //       .catch(err => {
  //           console.log('errr234 ',err)
  //       })
  // }
          // const fetchData = () => {

          //   axios.get('getdataURL')
          //                           .then(res => {
          //                               console.log('inside res ',res);
          //                               storeData=res.data.products;
          //                               console.log('url ',upsertURL);
          //                               console.log('dat to pass ',storeData);
          //                               let passData =[];
          //                               let catchdata =[];
          //                               storeData.map(d => {

          //                                   d.images=d.images[0];
          //                                   passData.push(d)
          //                               })
                                        
          //                               console.log('passed image ',passData);

          //                               passData.map(i=>{
          //                                  // console.log(i,"map")
          //                                   delete i.id;
          //                                   delete i.thumbnail
          //                                //   console.log(i,"after delete")
          //                                   axios.post(upsertURL,i)
          //                               .then(res => {
          //                                 //  console.log('inside result ',res);

          //                               })
          //                               .catch(err => {
          //                                   console.log('inside err ',err);
          //                               })
          //                               })

          //                               getData();
                                       
          //                           })
          //                           .catch(err => {
          //                             console.log('catch err ',err);
          //             })

          // } 

       
                   //   console.log(dataList,"Datalist")

               const handleSearch  = (event) => {
                  let searchValue = event.target.value;
                
                    const filterData = dataList.filter(da => {
                      return da.category.includes(searchValue)
                    })
                    setDataList(filterData);
                
               }     
               const handleClear = () => {

                window.location.reload(true);
                console.log("inside Abort")
                setDataList(duplicatearr);
               }   

               const handleAddRecord = () => {
                console.log('inside handleAddRecord');
                navigate("/productDetailPage",{state:{record:{}}})
                
                  
               }  


               
               const handleSelect = (event) => {

                console.log('inside handleSelect :',event);

                let item = event;

                navigate("/productDetailPage",{state:{record:{item}}})
                 if(selectedValue === 'Laptops')
                 {
                   console.log('inside LaptopPage :');
                   navigate("/laptopDetailPage", {state:{record:{event}}})
                 }
                 if(selectedValue === 'Mobiles')
                 {
                   console.log('inside MobilePage :');
                   navigate("/mobileDetailPage", {state:{record:{event}}})
                 }
                 if(selectedValue === 'Televisions')
                 {
                   console.log('inside TelevisionPage :');
                   navigate("/televisionDetailPage", {state:{record:{event}}})
                 }
                 if(selectedValue === 'Washing Machines')
                 {
                   console.log('inside WashmachPage :');
                   navigate("/washingmachineDetailPage", {state:{record:{event}}})
                 }

                 let selectedValue = event.target.value;
                 console.log('inside selectedValue :',selectedValue);
               }
  return (
    
  
     <div style={{backgroundImage: 'URL(https://www.logo.wine/a/logo/E-mart/E-mart-Logo.wine.svg)', height: '800px',display:'block',margin:'auto',width:'80%'}}>
      <div className='inputClass'>
      {/* <input type='search' title='Search Products' placeholder='Search Products' onChange={handleSearch} ></input> */}
      {/* <Select
      defaultValue="Select"
      style={{
        width: '200px',
      }}
      size='large'
      // onChange={(e)=>handleChange(e)}
      onSelect={(e)=>handleSelect(e)}
      options={[
        // {
        //   value: 'None',
        //   label: 'None',
        // },
        {
          value: 'Laptops',
          label: 'Laptops',
        },
        {
          value: 'Mobiles',
          label: 'Mobiles',
        },
        {
          value: 'Televisions',
          label: 'Televisions',
        },
        {
          value: 'Washing Machines',
          label: 'Washing Machines',
        },
      ]}
    /> */}
      {/* <Input style={{marginTop: '100px', width: '450px'}} prefix={<SearchOutlined />} allowClear placeholder="Search Here" size='medium' onChange={handleSearch} /> */}
    {/* <div>
      <button className='buttonClass' style={{marginLeft: 5}} onClick ={handleClear} > clear </button>
      </div>   */}
      </div>
      

      <div className='btn_end_position'>
        <Button
          sx={{ m: 2,color: '#DDD0C8', backgroundColor: '#323232' }}
          variant="outlined"
          onClick={handleAddRecord}
        >
          Add Products
        </Button>
      </div>
     <div className='appClass'>
      {
        
      dataList.length>0 &&
      dataList.map((data) => {
     // console.log('each data ',data)
       return <Book Book={data}> </Book>
       
     })}  
     
    </div>
  
    </div>
   
  );
}
const Book = (props) => {
    
    const navigate =useNavigate()

    const handleAddRecord =() => {
        console.log('inside new record')
        navigate("/invoiceDetailPage", {state:{ record: {} }})
      }
   const handleClick = (item) => {

    console.log('inside click ',item);
    navigate("/invoiceDetailPage", { state: { record: { item } } })
   }
  return (
    
      <Card>
      <img className ='imgClass' src={props.Book.images} id= {props.Book.id}  alt='' >
      </img>
      <h1 className ='TitleClass' >{props.Book.title}</h1>
      <h1 className ='TitleClass' >{props.Book.brand}</h1>
      <h4 className ='TitleClass' style={{color:'#617d98', fontSize:'1rem',marginTop:'0.25rem'}} > {props.Book.category} </h4>
      <p>Price: <strong style ={{color:'blue'}}>${props.Book.price}</strong> </p>
      {/* <p>Available Pieces: <strong style={{color:'blueviolet'}}> {props.Book.stock} </strong></p> */}
      <p> Ratings: <strong style={{color: props.Book.rating >4.0 ? 'green' : 'red'}}>  {props.Book.rating} </strong> </p>
      <p style={{opacity:.6}}> {props.Book.description} </p>
      <p style={{color:'green',opacity:.7}}> Max Discount upto {props.Book.discountPercentage} % </p>
        <Button x onClick={() => handleClick(props.Book)}>
            Buy
        </Button>
    </Card>

  )
}

export default HomePage