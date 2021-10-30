var sql = require('mssql');

module.exports = function(app,__dirname,config) {
			 
	 var configration = config.db;
   app.get('/ServicePortal/GetTickets', function (req, res) {
	   
	    var dateFilter = req.query.dateFilter;
		new sql.ConnectionPool(configration).connect().then(pool => {
				
		     var sqlreq = pool.request();
		     sqlreq.input('Date',sql.VarChar(25),dateFilter);
			 return sqlreq.execute("[dbo].[getTickets_sp]");	  
			 
			  }).then(result => {
				let rows = result.recordset
				//console.log(rows);
				res.setHeader('Access-Control-Allow-Origin', '*')
				res.status(200).send(rows);
				sql.close();
			  }).catch(err => {
				res.status(500).send({ message: "${err}"})
				sql.close();
			  });
     });
	 
	  	 
	 app.post('/ServicePortal/AddTicket', function (req, res) {
		     new sql.ConnectionPool(configration).connect().then(pool => {
		        var sqlreq = pool.request();
			    sqlreq.input('UserName',sql.VARCHAR(250),req.body.userName.$modelValue);	
			    sqlreq.input('RequestorName',sql.VARCHAR(250), req.body.reqName.$modelValue);	
			    sqlreq.input('AppOrServiceName',sql.VARCHAR(100), req.body.appName.$modelValue);		
			    sqlreq.input('Description',sql.NVARCHAR, req.body.description.$modelValue);	
			    sqlreq.input('Impact',sql.VARCHAR(100)	, req.body.impact.$modelValue);	
			    sqlreq.input('Urgency',sql.VARCHAR(100), req.body.urgency.$modelValue);	
			    sqlreq.input('Priority',sql.VARCHAR(100), req.body.priority.$modelValue);	
					sqlreq.input('TicketStatus',sql.BIT, 1);	
			    sqlreq.input('FixedDescription',sql.NVARCHAR, ' ');						
			    sqlreq.input('CreatedBy',sql.VARCHAR(250),'Sarbu');		
					sqlreq.input('ModifiedBy',sql.VARCHAR(250),'Sarbu');
			    sqlreq.input('IsDeleted',sql.BIT, 0);	
					
				
				return sqlreq.execute("[dbo].[addTicket_sp]");
 
		  }).then(result => {
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.status(200).send({ message: "Created ticket ...."});
			sql.close();
		  }).catch(err => {
			console.log(err);
			res.status(500).send({ message: "${err}"})
			sql.close();
		  });
			 
     });
	      
		 app.post('/ServicePortal/UpdateTicket', function (req, res) {
					new sql.ConnectionPool(configration).connect().then(pool => {
						var sqlreq = pool.request();
					sqlreq.input('TicketInfoID',sql.Int,req.body.TicketInfoID);	
					sqlreq.input('FixedDescription',sql.NVARCHAR, req.body.FixedDescription);
					sqlreq.input('TicketStatus',sql.BIT, req.body.TicketStatus == "Closed" ? false  : true );	
					sqlreq.input('ModifiedBy',sql.VARCHAR(250),'Sarbu');
					sqlreq.input('ModifiedDate',sql.Date,Date());
					
				
				return sqlreq.execute("[dbo].[updateTicket_sp]");

					}).then(result => {
						res.setHeader('Access-Control-Allow-Origin', '*')
						res.status(200).send({ message: "Updated ...."});
						sql.close();
						}).catch(err => {
						res.status(500).send({ message: "${err}"})
						sql.close();
						});
				
			});

			app.get('/ServicePortal/DeleteTicket', function (req, res) {
				var ticketInfoID = req.query.TicketInfoID;
				new sql.ConnectionPool(configration).connect().then(pool => {
				var sqlreq = pool.request();
				sqlreq.input('TicketInfoID',sql.Int,ticketInfoID);	
				sqlreq.input('ModifiedBy',sql.VARCHAR(250),'Sarbu');
				sqlreq.input('ModifiedDate',sql.Date,Date());
				
					return sqlreq.execute("[dbo].[deleteTicket_sp]");

				}).then(result => {
					res.setHeader('Access-Control-Allow-Origin', '*')
					res.status(200).send({ message: "Deleted ...."});
					sql.close();
					}).catch(err => {
					res.status(500).send({ message: "${err}"})
					sql.close();
					});
				});


	// application
	app.get('/', function(req, res) {
		//console.log(__dirname);
		res.sendFile(__dirname + '/views/index-view.html'); // load the single view file (angular will handle the page changes on the front-end)
  	});
		
};