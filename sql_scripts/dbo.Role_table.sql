
-- USE 'give database name here'

IF OBJECT_ID ('dbo.Role', 'U') IS NOT NULL  
   DROP TABLE dbo.Role;  
GO  

CREATE TABLE dbo.Role
(
 RoleID			INT PRIMARY KEY IDENTITY(1,1),
 RoleName		VARCHAR(250) NOT NULL,
 CreatedDate	DATETIME DEFAULT(GETDATE()) NOT NULL,
 CreatedBy		VARCHAR(250) DEFAULT(SUSER_SNAME()),
 ModifiedDate	DATETIME DEFAULT(GETDATE()) NOT NULL,
 ModifiedBy		VARCHAR(250) DEFAULT(SUSER_SNAME())
);

-- One time Insertion data

INSERT dbo.Role ( RoleName)
		VALUES ('Admin'),
			   ('Editor'),
			   ('Guest');

