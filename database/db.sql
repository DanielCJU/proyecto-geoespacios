CREATE DATABASE database_geo;
USE database_geo;

CREATE TABLE adm(
	cod_admin INT(11) NOT NULL,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
	masteradm BOOLEAN NOT NULL, /* SI ES TRUE, SIGNIFICA QUE ES EL ADMINISTRADOR JEFE DE TODOS*/
	state BOOLEAN NOT NULL
);

ALTER TABLE adm
    ADD PRIMARY KEY (cod_admin);
ALTER TABLE adm	
    MODIFY cod_admin INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

INSERT INTO adm(username, password, fullname, masteradm) VALUES('Juan', 'kajksakj', 'Juan Cornejo', FALSE);
INSERT INTO adm(username, password, fullname, masteradm) VALUES('Juan', 'kajksakj', 'Juan Cornejo', TRUE); 
 
SELECT * FROM adm;

CREATE TABLE registro_adm(
	id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, /*FORMATO DE FECHA Y HORA AAAA:MM:DD HH:MM:SS*/
    adm_id INT(11), /*LLAVE FORANEA*/
    CONSTRAINT fk_adm FOREIGN KEY (adm_id) REFERENCES adm(cod_admin) /*REFRENCIACION DE LLAVE FORANEA PERTENECIENTE A LA TABLA ADM*/
);

CREATE TABLE usuario(
	cod_user INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    org_name VARCHAR(100) NOT NULL,
	state BOOLEAN NOT NULL DEFAULT 1,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE proyecto(
	cod_pro INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    projectname VARCHAR(60),
    number_adv INT,
    state BOOLEAN, 
    route VARCHAR(200),
    adm_id INT(11),
    user_id INT(11),
    CONSTRAINT fk_adm2 FOREIGN KEY (adm_id) REFERENCES adm(cod_admin),
    CONSTRAINT fk_usuario2 FOREIGN KEY (user_id) REFERENCES usuario(cod_user) 
);

CREATE TABLE registro_user(
	id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, /*FORMATO DE FECHA Y HORA AAAA:MM:DD HH:MM:SS*/
    user_id INT(11), /*LLAVE FORANEA*/
    CONSTRAINT fk_usuario3 FOREIGN KEY (user_id) REFERENCES usuario(cod_user) /*REFRENCIACION DE LLAVE FORANEA PERTENECIENTE A LA TABLA ADM*/
);
