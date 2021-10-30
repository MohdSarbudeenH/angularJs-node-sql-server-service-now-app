
-- USE 'give database name here'

IF OBJECT_ID ('dbo.TicketInfo', 'U') IS NOT NULL  
   DROP TABLE TicketInfo;  
GO  

CREATE TABLE TicketInfo
(
 TicketInfoID		INT PRIMARY KEY IDENTITY(1,1),
 UserName			VARCHAR(250) NOT NULL,
 RequestorName		VARCHAR(250),
 AppOrServiceName	VARCHAR(100) NOT NULL,
 Description		VARCHAR(MAX) NOT NULL,
 Impact				VARCHAR(100) NOT NULL,
 Urgency			VARCHAR(100) NOT NULL,
 Priority			VARCHAR(100) NOT NULL,
 TicketStatus		BIT NOT NULL,
 FixedDescription   VARCHAR(MAX) NOT NULL,
 CreatedDate		DATETIME DEFAULT(GETDATE()) NOT NULL,
 CreatedBy			VARCHAR(250) DEFAULT(SUSER_SNAME()),
 ModifiedDate		DATETIME DEFAULT(GETDATE()) NOT NULL,
 ModifiedBy			VARCHAR(250) DEFAULT(SUSER_SNAME()),
 IsDeleted			BIT DEFAULT(0) NOT NULL
);

