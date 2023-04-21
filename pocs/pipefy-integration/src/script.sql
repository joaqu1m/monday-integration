create database testPipefy;
use testPipefy;

#drop database testPipefy;
#drop table prospect;

#select * from prospect;

create table prospect (
id int primary key auto_increment,
nome varchar(45),
email varchar(90),
empresa varchar(45),
ramo varchar(30),
fone char(15)
)