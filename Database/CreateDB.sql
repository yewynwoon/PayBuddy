CREATE DATABASE PayDB;
USE PayDB;


/*Drop table customer;*/

Create Table customer(
custID int(5) NOT NULL AUTO_INCREMENT,
cust_FName Varchar(30),
cust_LName Varchar(30),
custPhone Varchar(10),
custUsername Varchar(30),
custPassword char(20),
custAccStatus boolean NOT NULL DEFAULT 1,
custAddr1 varchar(40) Null,
custAddr2 varchar(40) Null,
custAddr3 varchar(40) Null,
PRIMARY KEY (custID)
);


