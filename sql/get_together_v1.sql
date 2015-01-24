use get_together;
drop table groups;

CREATE TABLE groups (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    status VARCHAR(25),
    description TEXT,
    location TEXT,
    age_range_start int,
    age_range_end int,
    day_of_week_frequency VARCHAR(25),
    day_of_week VARCHAR(25),
    start_time VARCHAR(25),
    end_time VARCHAR(25),
    start_date DATETIME,
    end_date DATETIME
);

/* Then insert some posts for testing: */
INSERT INTO groups (title,status,description,location,age_range_start,age_range_end,day_of_week_frequency,day_of_week,start_time,end_time,start_date,end_date)
    VALUES ('Teens', 'Open', 'Teen Bible Study.', 'Orchard Grove', 13, 19, 'Every', 'Monday', '6:00 pm', '7:00 pm', NOW(), NOW());
INSERT INTO groups (title,status,description,location,age_range_start,age_range_end,day_of_week_frequency,day_of_week,start_time,end_time,start_date,end_date)
    VALUES ('Woman Book Reading', 'Open', 'Womans book club.', 'Starbucks', 18, 99, 'Every', 'Tuesday', '6:00 pm', '7:00 pm', NOW(), NOW());
INSERT INTO groups (title,status,description,location,age_range_start,age_range_end,day_of_week_frequency,day_of_week,start_time,end_time,start_date,end_date)
    VALUES ('Mens Bible study', 'Open', 'Weekly Bible study.', 'Orchard Grove', 18, 99, 'Every', 'Friday', '8:00 pm', '9:00 pm', NOW(), NOW());

