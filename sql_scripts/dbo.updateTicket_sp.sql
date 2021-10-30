
USE SarbuTry
GO

DROP PROCEDURE IF EXISTS dbo.updateTicket_sp;  
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- EXEC dbo.updateTicket_sp ''

CREATE PROCEDURE [dbo].[updateTicket_sp]
@TicketInfoID       INT,
@TicketStatus		BIT,
@FixedDescription   VARCHAR(MAX),
@ModifiedBy			VARCHAR(250),
@ModifiedDate		DATETIME

AS
BEGIN
   UPDATE [dbo].[TicketInfo] 
   SET 	TicketStatus = @TicketStatus,
		FixedDescription = @FixedDescription,
		ModifiedBy = @ModifiedBy,
		ModifiedDate = @ModifiedDate
	WHERE TicketInfoID = @TicketInfoID;

END
						
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO

PRINT '[dbo].[updateTicket_sp] Executed'

