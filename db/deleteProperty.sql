delete from properties where propid = $1 and userid = $2;
select * from properties where userid = $2;