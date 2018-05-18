insert into Users (username, password)
values ($1, $2);
select username, userid from users
where username = $1 and password = $2;