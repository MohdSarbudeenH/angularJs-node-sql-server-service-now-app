
USE SarbuTry
GO

DROP PROCEDURE IF EXISTS dbo.deleteTicket_sp;  
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- EXEC dbo.deleteTicket_sp ''

CREATE PROCEDURE [dbo].[deleteTicket_sp]
@TicketInfoID       INT,
@ModifiedBy			VARCHAR(250),
@ModifiedDate		DATETIME

AS
BEGIN
    
	UPDATE [dbo].[TicketInfo] 
	SET [IsDeleted] = 1,
		ModifiedBy = @ModifiedBy,
		ModifiedDate = @ModifiedDate
	WHERE TicketInfoID = @TicketInfoID;

END
						
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO

PRINT '[dbo].[deleteTicket_sp] Executed'

