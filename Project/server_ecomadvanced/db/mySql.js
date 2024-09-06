var mysql = require('mysql')
var pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.MYSQLUSERNAME,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DATABASE
});
pool.getConnection((err) => {
  if (err) {
    console.log('Error message is :', err.message + ' & Error Stack is : ', err.stack)
    process.exit(1);
  }
  else {
    console.log("connected to DB")
  }
})

const executeQuery = (query, arrayparams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrayparams, (err, data) => {
        if (err) {
          console.log("error executing the query : " + err.message)
          return (err)
        }
        else {
          resolve(data)
        }
      })
    }
    catch (err) {
      console.log('error part :' + count++);
      console.log(err.messaage);
      reject(err)
    }
  });
}


module.exports = { executeQuery }