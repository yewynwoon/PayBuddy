use paybuddy_db;

IF NOT EXISTS (select * from sysobjects where name='users' and xtype='U')
	CREATE TABLE users
	(
		cust_id int IDENTITY(1,1) Primary Key,
		fname varchar(25) NOT NULL,
		lname varchar(25) NOT NULL,
		account_value int default 0,
		email varchar(25) NOT NULL,
		password varchar(25) NOT NULL
	);

IF NOT EXISTS (select * from sysobjects where name='cust_transfer' and xtype='U')
	CREATE TABLE cust_transfer (

		transact_id int IDENTITY(1,1) Primary Key,
		src_cust_id int Foreign Key references users(cust_id),
		dest_cust_id int Foreign Key references users(cust_id),
		amount int NOT NULL,
		description varchar(120)
	);

/*  Test users */
insert into users (fname,lname,email,password)
values ('jeremy', 'beresh', 'j.beresh@hotmail.com', 'hello');

insert into users (fname,lname,email,password)
values ('ye', 'wyn', 'ye.wyn@hotmail.com', 'boop');

insert into users (fname,lname,email,password)
values ('sam', 'ayoob', 'sam.ayoob@hotmail.com', 'slap');

insert into users (fname,lname,email,password)
values ('chee', 'wei low', 'chee.weilow@hotmail.com', 'teeth');


/*  Test transactions */
insert into cust_transfer (src_cust_id, dest_cust_id, amount, description)
values (1, 2, 20, 'test');

insert into cust_transfer (src_cust_id, dest_cust_id, amount, description)
values (2, 4, 20, 'test1');

insert into cust_transfer (src_cust_id, dest_cust_id, amount, description)
values (4, 3, 20, 'test2');

select * from users;
select * from cust_transfer;