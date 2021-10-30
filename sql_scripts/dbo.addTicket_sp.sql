
USE SarbuTry
GO

DROP PROCEDURE IF EXISTS dbo.addTicket_sp;  
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET IDENTITY_INSERT [dbo].[TicketInfo] ON
GO

-- EXEC dbo.addTicket_sp ''

CREATE PROCEDURE [dbo].[addTicket_sp]
@UserName			VARCHAR(250),
@RequestorName      VARCHAR(250),
@AppOrServiceName	VARCHAR(100),
@Description		VARCHAR(MAX),
@Impact				VARCHAR(100),
@Urgency			VARCHAR(100),
@Priority			VARCHAR(100),
@TicketStatus		BIT,
@FixedDescription   VARCHAR(MAX),
@CreatedBy			VARCHAR(250),
@ModifiedBy			VARCHAR(250),
@IsDeleted			BIT
AS
BEGIN

    INSERT INTO [dbo].[TicketInfo] VALUES(
						@UserName,			
						@RequestorName ,     
						@AppOrServiceName	,
						@Description	,	
						@Impact		,		
						@Urgency	,		
						@Priority		,	
						@TicketStatus	,	
						@FixedDescription,
						CONVERT(DATE, GETDATE())	,	
						@CreatedBy	,		
						CONVERT(DATE, GETDATE())	,	
						@ModifiedBy,
						@IsDeleted)	

	
END
						
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
SET IDENTITY_INSERT [dbo].[TicketInfo] OFF
GO

PRINT '[dbo].[addTicket_sp] Executed'

