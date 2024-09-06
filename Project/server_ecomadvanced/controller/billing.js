const { executeQuery } = require('../db/mySql')
const getBillData = async (req, res) => {
    try {
        console.log("inside Bill get")
        var sql = "select * from invoice";
        let getbilldata = await executeQuery(sql, [])
        res.send(getbilldata)
    }
    catch (err) {
        console.log('error in invoice get')
        res.send(err.message)
    }
}

const upsertBillData = async (req, res) => {
    try {
        console.log("inside bill upsert")
        let billkeys = Object.keys(req.body)
        let billvalues = Object.values(req.body)
        let result = {}
        const billdata = async (fieldname, vlaue) => {
            for (let i = 0; i < fieldname.length; i++) {
                
                result[fieldname[i]] = vlaue[i]
            }
        }
        billdata(billkeys, billvalues)
        console.log("result is >>>");
        console.log(result);
        var sql = 'REPLACE INTO invoice SET ?'
        let getbilldata = await executeQuery(sql, result)
        console.log(getbilldata);
        res.send("invoice Inserted Successfully")
    } catch (error) {
        res.send("error page in invoice upsert " + error.message)
    }
}

const deleteBillData =async (request,res)=>{
    try {
        console.log("inside delete invoice Data");
        console.log('query:', request.query.code);
        let deleteBilldata = request.query.code
        var sql = 'DELETE FROM invoice WHERE _id = ' + deleteBilldata;
        let deleteBillResult = await executeQuery(sql, [])
        res.send("Employee Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Bill deletion")
        res.send(err.message)
    }
}
module.exports = {getBillData, upsertBillData,deleteBillData}