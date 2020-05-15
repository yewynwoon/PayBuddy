use paybuddy_db;

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


/*  Test merchants */
insert into merchants (fname,lname,email,password)
values ('jeremy', 'beresh', 'j.beresh@hotmail.com', 'hello');