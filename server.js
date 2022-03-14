const express= require('express');
const port = process.env.PORT || 5000;

const app = express();

var sql = require("mssql");
    var server2 = 'DEV2'
    //console.log(result);

    // config for your database
    var config = {
        server: "local",
        server: server2,
        user: 'sa',
        password: 'sa123',
        server: server2, 
        database: 'HRIS',
        options: {
            "port":1434,
            trustedConnection: true,
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true
        }
    };

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'));

app.get('/form',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, ()=>{
    console.log("connected")
})

app.post('/view',(req,res)=>{ //yahan dekho line 40 
    console.log(req.body.EmpID);
    var empid = req.body.EmpID;

    sql.connect(config, function (err) {
    
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT EmpID EmpID, FullName FullName FROM EmpData WHERE EmpID = '+empid+'', function (err, recordset) {
          
          if (err) console.log(err)

          // send records as a response
          res.send(recordset.recordset);
          
      });
  });

});

