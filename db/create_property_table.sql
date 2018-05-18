create table properties(
    propId serial PRIMARY KEY,
    name VARCHAR(40),
    address text,
    city VARCHAR(40),
    state VARCHAR(25),
    zip INTEGER,
    img text,
    monthly float,
    desiredRent INTEGER,
    userId INTEGER REFERENCES Users (userId)
)

-- insert into properties
-- (name, address, city, state, zip, img, monthly, desiredrent, userid)
-- values
-- ('desktop plateu', '1323 hilltop lane', 'Pleasant Grove', 'utah', 84492, 'http://robohash.org/you', 1100, 1600, 17)

-- insert into properties
-- (name, address, city, state, zip, img, monthly, desiredrent, userid)
-- values
-- ('stormy', '1323 hilltop lane', 'Pleasant Grove', 'utah', 84492, 'http://robohash.org/you', 1100, 1600, 17)