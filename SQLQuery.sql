create database UserManager
go
use UserManager
go

create table Employee
(
	id int identity primary key,
	name nvarchar(50),
	age int,
	country nvarchar(50)
)
go