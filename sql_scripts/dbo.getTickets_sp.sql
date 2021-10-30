
USE SarbuTry
GO

DROP PROCEDURE IF EXISTS dbo.getTickets_sp;  
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- EXEC dbo.getTickets_sp ''

CREATE PROCEDURE [dbo].[getTickets_sp]
@Date VARCHAR(25)
AS
BEGIN
    IF ( @Date IS NULL OR @Date = '')
		SELECT * FROM [dbo].[TicketInfo]  WHERE IsDeleted = 0 ORDER BY CreatedDate desc
	ELSE
		SELECT * FROM [dbo].[TicketInfo] WHERE CreatedDate = @Date AND IsDeleted = 0 ORDER BY CreatedDate desc
END
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
PRINT '[dbo].[getTickets_sp] Executed'

