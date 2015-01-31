DROP database get_together;
CREATE database get_together;
use get_together;
DROP TABLE IF EXISTS `locations`;
DROP TABLE IF EXISTS `groups`;
DROP TABLE IF EXISTS `topics`;

CREATE TABLE locations (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(100),
    street  VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip INT
);

CREATE TABLE topics (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE groups (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(50),
    status VARCHAR(25),
    description TEXT,
    age_range_start VARCHAR(3),
    age_range_end VARCHAR(3),
    day_of_week_frequency VARCHAR(25),
    day_of_week VARCHAR(25),
    start_time VARCHAR(25),
    end_time VARCHAR(25),
    start_date DATETIME,
    end_date DATETIME,
    location_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

CREATE TABLE groups_topics (
	group_id INT UNSIGNED NOT NULL,
	topic_id INT UNSIGNED NOT NULL,
	PRIMARY KEY (group_id, topic_id),
	FOREIGN KEY (group_id) REFERENCES groups(id),
	FOREIGN KEY (topic_id) REFERENCES topics(id)
);

INSERT INTO locations (name, description, street, city, state, zip)
        VALUES("Orchard Grove", "Building C", "850 Ladd Rd", "Walled Lake", "MI", 48390);

INSERT INTO topics (name)
        VALUES("Bible Study");

INSERT INTO topics (name)
        VALUES("Fellowship");

INSERT INTO groups (title,status,description,age_range_start,age_range_end,day_of_week_frequency,day_of_week,start_time,end_time,start_date,end_date,location_id)
    VALUES ('Teens', 'Open', 'Teen Bible Study.', "13", "19", 'Every', 'Monday', '6:00 pm', '7:00 pm', NOW(), NOW(), 1);
INSERT INTO groups (title,status,description,age_range_start,age_range_end,day_of_week_frequency,day_of_week,start_time,end_time,start_date,end_date,location_id)
    VALUES ('Womans Book Reading', 'Open', 'Womans book club.', "18", "ANY", 'Every', 'Tuesday', '6:00 pm', '7:00 pm', NOW(), NOW(), 1);
INSERT INTO groups (title,status,description,age_range_start,age_range_end,day_of_week_frequency,day_of_week,start_time,end_time,start_date,end_date,location_id)
    VALUES ('Mens Bible study', 'Open', 'Weekly Bible study.', "18", "ANY", 'Every', 'Friday', '8:00 pm', '9:00 pm', NOW(), NOW(), 1);

INSERT INTO groups_topics (group_id, topic_id)
    VALUES(1,2);

INSERT INTO groups_topics (group_id, topic_id)
    VALUES(2,2);

INSERT INTO groups_topics (group_id, topic_id)
     VALUES(3,1);