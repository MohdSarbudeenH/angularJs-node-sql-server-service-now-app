
USE SarbuTry
GO

DROP PROCEDURE IF EXISTS dbo.adduser_sp;  
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET IDENTITY_INSERT [dbo].[UserInfo] ON
GO

-- EXEC dbo.adduser_sp ''

CREATE PROCEDURE [dbo].[adduser_sp]
@UserName			VARCHAR(250) ,
@EmployeeID			VARCHAR(200) ,
@Email				VARCHAR(200) ,
@Password			VARCHAR(200) ,
@ResponseMessage	NVARCHAR(250) OUTPUT,
@IsInsertSuccess	BIT OUTPUT

AS
BEGIN
	
	SET NOCOUNT ON

    DECLARE @salt UNIQUEIDENTIFIER=NEWID()
    BEGIN TRY

	IF EXISTS (SELECT TOP 1 UserInfoID FROM dbo.UserInfo WHERE EmployeeID = @EmployeeID )
		SELECT @ResponseMessage='Account exists.EmployeeID is already taken. Please re-try..' , @IsInsertSuccess = 0
    ELSE
	  BEGIN
		INSERT INTO [dbo].[UserInfo] VALUES(
							@UserName,			
							@EmployeeID,	
							@Email,			
							HASHBYTES('SHA2_512', @Password +CAST(@salt AS NVARCHAR(36))),
							@salt,			
							CONVERT(DATE, GETDATE()),
							'new_user',		
							CONVERT(DATE, GETDATE()),
							'new_user',		
							0)		

	 
		SELECT @ResponseMessage='Registered successfully.Please feel free to create incident anytime ... ' ,  @IsInsertSuccess = 1
	   END

    END TRY
    BEGIN CATCH
        SELECT @ResponseMessage = ERROR_MESSAGE()  , @IsInsertSuccess = 0
    END CATCH
	
END
						
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
SET IDENTITY_INSERT [dbo].[UserInfo] OFF
GO

PRINT '[dbo].[adduser_sp] Executed'

