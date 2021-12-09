insert into usuarios values ('1','Verdu','verdu1234','09102213K','verdu@gmail.com','888882233', 'Daniel Verduras Gallego', 'Calle xd, Madrid');
select * from usuarios;
insert into oficinas values('1',10);
select * from oficinas;
insert into rfid values('4C32A3D5','1','1');
select * from rfid;
delete from usuarios;
select * from usuarios where id_usuario = "1b630347-6a52-4016-bdb4-f4872b18f7b7";
select count(id_usuario) from log where salida is null;
insert into log values('1','2021-12-08 18:00:00', null);
select * from log;
delete from log;

select * from rfid where '4C32A3D5' in (select id_rfid from rfid);
select * from log where id_usuario = '9b75b449-6993-4dc0-a266-db0ade3697c5' and salida is null;

update log set salida = '2021-12-08 16:00:00' where id_usuario = '9b75b449-6993-4dc0-a266-db0ade3697c5';

select aforo from oficinas where id_oficina = (select id_oficina from rfid where id_rfid = '4C32A3D5');
select * from log where id_usuario in (select id_usuario from rfid where id_oficina in (select * from oficinas where id_oficina = (select id_oficina from rfid where id_rfid = '4C32A3D5')));
select id_oficina from rfid where id_usuario = '9b75b449-6993-4dc0-a266-db0ade3697c5';
select count(*) as aforo_actual from log where id_usuario in (select id_usuario from rfid where id_oficina = '1') and salida is null;

INSERT INTO log (id_usuario, entrada) VALUES ('1', '2021-12-08 20:00:00');


SELECT * FROM oficinas WHERE id_oficina = (SELECT id_oficina FROM rfid WHERE id_rfid = '4C32A3D5');