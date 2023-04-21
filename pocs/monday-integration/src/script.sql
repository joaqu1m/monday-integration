create database joaquim_monday_integration;
use joaquim_monday_integration;

#drop table usuario;

create table usuario (
id int primary key auto_increment,
nome varchar(90),
statusAtual varchar(25),
fone char(13),
carnesBoi varchar(25),
carnesFrango varchar(25),
dtVisita char(10),
dtNascimento char(10)
);

select * from usuario;