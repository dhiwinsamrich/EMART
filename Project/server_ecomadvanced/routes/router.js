const express = require('express')
const router = express.Router()
const { fieldsUpload, Multer } = require('../multer/multer')
const {getitemsData,upsertitemsData,deleteitems,lookupitemName} = require('../controller/ecommerce')
const {getBillData, upsertBillData,deleteBillData} = require('../controller/billing')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.post('/',async (req,res)=>{
  console.log('inside the post')
  res.send("data table")

})
router.post('/getitemsData',getitemsData)
router.post('/upsertitemsData',fieldsUpload,upsertitemsData)
router.post('/deleteitems',deleteitems)
router.post('/lookupitemName',lookupitemName)



router.post('/getBillData',getBillData)
router.post('/upsertBillData',upsertBillData)
router.post('/deleteBillData',deleteBillData)

module.exports = router 