USE [Immersed]
GO
/****** Object:  StoredProcedure [dbo].[TrainingUnits_Update_Status]    Script Date: 11/23/2022 4:35:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: <Christopher Mercado>
-- Create date: <10/21/2022>
-- Description: < Training Unit Update Status>
-- Code Reviewer: Damian Stella

-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer:
-- Note:
-- =============================================


ALTER PROC [dbo].[TrainingUnits_Update_Status]
			
			@TrainingStatusId int
			,@UserId int
			,@Id int 
AS

/*
Declare @Id int = 3
		,@UserId int = 17
	   ,@TrainingStatusId int = 1

select*
from dbo.TrainingUnits
where Id = @Id

Execute [dbo].[TrainingUnits_Update_Status]
			@TrainingStatusId 
			,@UserId
		    ,@Id 

select*
from dbo.TrainingUnits
where Id = @Id


*/

BEGIN
Declare @DateNow datetime2 = getutcdate()
Update dbo.TrainingUnits
	set		
			[TrainingStatusId] = @TrainingStatusId
			,[DateModified] = @DateNow
			,[ModifiedBy] = @UserId
			

WHERE id = @id
END
