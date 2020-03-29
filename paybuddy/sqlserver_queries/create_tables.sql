use paybuddy_db;

CREATE TABLE IF NOT EXISTS users
(
	cust_id int not null AUTO_INCREMENT,
	fname varchar(25) NOT NULL,
	lname varchar(25) NOT NULL,
	account_value int default 0,
	email varchar(25) NOT NULL,
	password varchar(25) NOT NULL,

	PRIMARY KEY (cust_id)
);


CREATE TABLE IF NOT EXISTS cust_transfer (

	transact_id int not null AUTO_INCREMENT,
	src_cust_id int not null,
	dest_cust_id int not null,
	amount int NOT NULL,
	description varchar(120),

	PRIMARY KEY (transact_id),
	FOREIGN KEY (src_cust_id) references users(cust_id),
	FOREIGN KEY (dest_cust_id) references users(cust_id)
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