var sql = require('mssql');

module.exports = function(app,__dirname,config) {
			 
   var configration = config.db;
   
	 app.post('/ServicePortal/AddUser', function (req, res) {
		     new sql.ConnectionPool(configration).connect().then(pool => {
		        var sqlreq = pool.request();
			    sqlreq.input('UserName',sql.VARCHAR(250),req.body.UserName);	
			    sqlreq.input('EmployeeID',sql.VARCHAR(200), req.body.EmployeeID);	
			    sqlreq.input('Email',sql.VARCHAR(200), req.body.Email);		
          		sqlreq.input('Password',sql.VARCHAR(200), req.body.Password);	
				sqlreq.output('ResponseMessage',sql.NVARCHAR(250));
				sqlreq.output('IsInsertSuccess',sql.Bit);
					
				return sqlreq.execute("[dbo].[adduser_sp]");
 
		  }).then(result => {
				res.setHeader('Access-Control-Allow-Origin', '*')
				res.status(200).send({ message: result.output.ResponseMessage , IsInsertSuccess:result.output.IsInsertSuccess });
				sql.close();
		  }).catch(err => {
				console.log(err);
				res.status(500).send({ message: "${err}"})
				sql.close();
		  });
			 
     });
	      
	
	 app.post('/ServicePortal/AuthenticateUser', function (req, res) {
		new sql.ConnectionPool(configration).connect().then(pool => {
		   var sqlreq = pool.request();
		   sqlreq.input('EmployeeID',sql.VARCHAR(200), req.body.EmployeeID);		
		   sqlreq.input('Password',sql.VARCHAR(200), req.body.Password);	
		   sqlreq.output('ResponseMessage',sql.NVARCHAR(250));
		   sqlreq.output('IsValid',sql.Bit);
			   
		   return sqlreq.execute("[dbo].[authenticateuser_sp]");

	 }).then(result => {
		   res.setHeader('Access-Control-Allow-Origin', '*')
		   res.status(200).send({ message: result.output.ResponseMessage , IsValid:result.output.IsValid });
		   sql.close();
	 }).catch(err => {
		   console.log(err);
		   res.status(500).send({ message: "${err}"})
		   sql.close();
	 });
		
});
};