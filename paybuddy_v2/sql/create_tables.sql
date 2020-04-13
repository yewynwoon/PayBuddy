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

CREATE TABLE IF NOT EXISTS cust_deposit (

	deposit_id int not null AUTO_INCREMENT,
	cust_id int not null,
	amount int NOT NULL,
	date_stamp TIMESTAMP not null,

	PRIMARY KEY (deposit_id),
	FOREIGN KEY (cust_id) references users(cust_id)
);

describe users;
describe cust_transfer;
describe cust_deposit;