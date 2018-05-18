select * from properties
where userid = $1 and desiredrent >= $2;