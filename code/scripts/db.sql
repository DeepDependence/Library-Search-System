create database db_library;

create table book 
(
    id bigint(18) primary key auto_increment,
    title varchar(256) not null,
    author varchar(256),
    description varchar(3000),
    image_file varchar(64),
    stock_level int
);

create table search_log 
(
    id bigint(22) primary key auto_increment,
    keyword varchar(256) not null,
    hit int,
    ip varchar(32),
    search_time timestamp default current_timestamp
);
