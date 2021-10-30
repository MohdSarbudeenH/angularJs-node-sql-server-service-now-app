
-- USE 'give database name here'

IF OBJECT_ID ('dbo.UserInfo', 'U') IS NOT NULL  
   DROP TABLE dbo.UserInfo;  
GO  

CREATE TABLE dbo.UserInfo
(
 UserInfoID			INT PRIMARY KEY IDENTITY(1,1),
 UserName			VARCHAR(250) NOT NULL,
 EmployeeID			VARCHAR(200) NOT NULL,
 Email				VARCHAR(200) NOT NULL,
 PasswordHash		BINARY(64) NOT NULL,
 Salt				UNIQUEIDENTIFIER ,
 CreatedDate		DATETIME DEFAULT(GETDATE()) NOT NULL,
 CreatedBy			VARCHAR(250) DEFAULT(SUSER_SNAME()),
 ModifiedDate		DATETIME DEFAULT(GETDATE()) NOT NULL,
 ModifiedBy			VARCHAR(250) DEFAULT(SUSER_SNAME()),
 IsDeleted			BIT DEFAULT(0) NOT NULL
);


-- Inserting Super User (Admin) on creating table

INSERT INTO dbo.UserInfo
			VALUES(
			'ItSupport',
			123456,
			'mohammed.sarbudeen@ingrammicro.com',

			)
