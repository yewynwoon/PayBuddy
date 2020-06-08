use paybuddy_db;

CREATE TABLE IF NOT EXISTS users
(
	cust_id int not null AUTO_INCREMENT,
	fname varchar(25) NOT NULL,
	lname varchar(25) NOT NULL,
	account_value int default 0,
	email varchar(30) NOT NULL,
	password varchar(25) NOT NULL,

	PRIMARY KEY (cust_id)
);


CREATE TABLE IF NOT EXISTS cust_transfer (

	transact_id int not null AUTO_INCREMENT,
	src_cust_id int not null,
	dest_cust_id int not null,
	amount int NOT NULL,
	description varchar(120),
	date_stamp TIMESTAMP not null,

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

CREATE TABLE IF NOT EXISTS cust_bpay_payments (
	bpay_payment_id int not null AUTO_INCREMENT,
	cust_id int not null,
	biller_code varchar(25) not null,
	crn varchar(25) not null,
	amount float NOT NULL,
	date_stamp TIMESTAMP not null,

	PRIMARY KEY (bpay_payment_id),
	FOREIGN KEY (cust_id) references users(cust_id)
);

insert into cust_transfer (cust_id, biller_code, crn, amount)

select cust_bpay_payments.bpay_payment_id, cust_bpay_payments.amount, cust_bpay_payments.date_stamp from cust_bpay_payments and cust_bpay_payments where cust_id=

select * from cust_deposit full outer join cust_bpay_payments on cust_deposit.cust_id=cust_bpay_payments=cust_id;




describe users;
+---------------+-------------+------+-----+---------+----------------+
| Field         | Type        | Null | Key | Default | Extra          |
+---------------+-------------+------+-----+---------+----------------+
| cust_id       | int(11)     | NO   | PRI | NULL    | auto_increment |
| fname         | varchar(25) | NO   |     | NULL    |                |
| lname         | varchar(25) | NO   |     | NULL    |                |
| account_value | int(11)     | YES  |     | 0       |                |
| email         | varchar(25) | NO   |     | NULL    |                |
| password      | varchar(25) | NO   |     | NULL    |                |
+---------------+-------------+------+-----+---------+----------------+

describe cust_transfer;
+--------------+--------------+------+-----+-------------------+-----------------------------+
| Field        | Type         | Null | Key | Default           | Extra                       |
+--------------+--------------+------+-----+-------------------+-----------------------------+
| transact_id  | int(11)      | NO   | PRI | NULL              | auto_increment              |
| src_cust_id  | int(11)      | NO   | MUL | NULL              |                             |
| dest_cust_id | int(11)      | NO   | MUL | NULL              |                             |
| amount       | int(11)      | NO   |     | NULL              |                             |
| description  | varchar(120) | YES  |     | NULL              |                             |
| date_stamp   | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+--------------+--------------+------+-----+-------------------+-----------------------------+

describe cust_deposit;
+------------+-----------+------+-----+-------------------+-----------------------------+
| Field      | Type      | Null | Key | Default           | Extra                       |
+------------+-----------+------+-----+-------------------+-----------------------------+
| deposit_id | int(11)   | NO   | PRI | NULL              | auto_increment              |
| cust_id    | int(11)   | NO   | MUL | NULL              |                             |
| amount     | int(11)   | NO   |     | NULL              |                             |
| date_stamp | timestamp | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+------------+-----------+------+-----+-------------------+-----------------------------+

describe cust_bpay_payments;
+-------------------------+---------+------+-----+---------+----------------+
| Field                   | Type    | Null | Key | Default | Extra          |
+-------------------------+---------+------+-----+---------+----------------+
| bpay_payment_id         | int(11) | NO   | PRI | NULL    | auto_increment |
| cust_id                 | int(11) | NO   | MUL | NULL    |                |
| bpay_payment_details_id | int(11) | NO   | MUL | NULL    |                |
+-------------------------+---------+------+-----+---------+----------------+

describe bpay_payment_details;
+-------------------------+-----------+------+-----+-------------------+-----------------------------+
| Field                   | Type      | Null | Key | Default           | Extra                       |
+-------------------------+-----------+------+-----+-------------------+-----------------------------+
| bpay_payment_details_id | int(11)   | NO   | PRI | NULL              | auto_increment              |
| biller_code             | int(11)   | NO   |     | NULL              |                             |
| crn                     | int(11)   | NO   |     | NULL              |                             |
| amount                  | int(11)   | NO   |     | NULL              |                             |
| date_stamp              | timestamp | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+-------------------------+-----------+------+-----+-------------------+-----------------------------+
