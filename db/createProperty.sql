insert into properties
(name, address, city, state, zip, img, monthly, desiredrent, userid)
values
($1, $2, $3, $4, $5, $6, $7, $8, $9);

select * from properties
where
userid = $9;