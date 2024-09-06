const { executeQuery } = require('../db/mySql')


const getitemsData = async (req, res) => {
    try {
        console.log(req.query.code, 'req code is ');
        console.log("inside items get")
        var sql = "select * from items where category = "+req.query.code;
        console.log('sql is',sql);
        let getitemsdata = await executeQuery(sql, [])
        res.send(getitemsdata)
    }
    catch (err) {
        console.log('error in items get')
        res.send(err.message)
    }
}


const lookupitemName = async (request, res) => {
    try {

        console.log("inside look up Items")
        if(request.query.code){
        console.log(request.query.code);     
            console.log("inisde else " + request.query.code);
            let itemdata=request.query.code
            console.log('blood data is : '+itemdata)
          //  var sql = "select * from Donor WHERE bloodGroup like"+ blooddata + ""
         var sql = "select * from items WHERE productName like '%"+ itemdata + "%'"
           // var sql = "select * from Donor WHERE bloodGroup = "+blooddata

            let getDonordata = await executeQuery(sql, [])
            console.log(getDonordata);
            res.send(getDonordata)
        }
        else if(!request.query.code) {

              var sql = "select * from items limit 5"
             let getDonordata = await executeQuery(sql, [])
             console.log(getDonordata);
             res.send(getDonordata)
        }
    } catch (error) {
        console.log("error in look up Donor " + error.message);
        res.send(error.message)

    }
}



const upsertitemsData = async (req, res) => {
    try {
        console.log('req body is ', req.body);
        console.log("inside Upsert items Data")
        console.log(req.file)
        let itemskeys = Object.keys(req.body)
        let itemsvalues = Object.values(req.body)
        let result = {}
        const itemsdata = async (fieldname, vlaue) => {
            for (let i = 0; i < fieldname.length; i++) {
                
                result[fieldname[i]] = vlaue[i]
            }
        }
        itemsdata(itemskeys, itemsvalues)
        console.log("result is >>>");
        console.log(result);
        if(req.file){
            result.imageUrl =req.protocol+'://'+req.headers.host+'/'+req.file.filename
        }
        console.log(result)
        var sql = 'REPLACE INTO items SET ?'
        let getitemsdata = await executeQuery(sql, result)
        console.log(getitemsdata);
        res.send("items Inserted Successfully")
    } catch (error) {
        res.send("error page in items upsert " + error.message)
    }
}


const deleteitems =async (req,res)=>{
    try{
        console.log('query:', req.query.code);
        let deleteitems = req.query.code;
        var sql = 'DELETE FROM items WHERE _id = ' + deleteitems;
        let deleteitemsdatas= await executeQuery(sql, [])
        res.send(deleteitemsdatas)


    }
    catch(error){
        console.log("error in delete BloodCordinator");
        res.send(error.message)
    }

}
module.exports ={getitemsData,upsertitemsData,deleteitems,lookupitemName}