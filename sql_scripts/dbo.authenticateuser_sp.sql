
USE SarbuTry
GO

DROP PROCEDURE IF EXISTS dbo.authenticateuser_sp;  
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- EXEC dbo.authenticateuser_sp ''

CREATE PROCEDURE dbo.authenticateuser_sp
    @EmployeeID VARCHAR(200),
    @Password VARCHAR(200),
    @responseMessage NVARCHAR(250)='' OUTPUT,
	@IsValid	BIT OUTPUT
AS
BEGIN

    SET NOCOUNT ON

    DECLARE @userID INT

    IF EXISTS (SELECT TOP 1 UserInfoID FROM dbo.UserInfo WHERE EmployeeID = @EmployeeID )
    BEGIN
       SET @userID = (SELECT UserInfoID FROM dbo.UserInfo WHERE EmployeeID = @EmployeeID AND PasswordHash = HASHBYTES('SHA2_512', @Password +CAST(Salt AS NVARCHAR(36))))

       IF(@userID IS NULL)
           SELECT @responseMessage='Incorrect Password', @IsValid = 0
       ELSE 
           SELECT @responseMessage='Create a ticket now...' , @IsValid = 1
    END
    ELSE
       SELECT @responseMessage='EmployeeID does not exists.', @IsValid = 0

END
				
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO


PRINT '[dbo].[authenticateuser_sp] Executed'

