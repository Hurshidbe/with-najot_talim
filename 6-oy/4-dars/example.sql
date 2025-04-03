create table users (
    id serial primary key,
    firstname varchar(32) not null,
    lastname varchar(32) not null,
    username varchar(32) unique not null
)
create table driver_licenses (
    id serial,
    user_id int not null,
    category varchar(32) not null,
    expired_date timestamptz default current_timestamp,
    foreign key (user_id) references users (id)
)