CREATE TABLE groups (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    description TEXT,
    start_date DATETIME DEFAULT NULL,
    end_date DATETIME DEFAULT NULL,
    created DATETIME DEFAULT NULL,
    modified DATETIME DEFAULT NULL,
    status VARCHAR(25)
);

/* Then insert some posts for testing: */
INSERT INTO groups (title,description,created)
    VALUES ('Teens', 'Teen Bible Study.', NOW());
INSERT INTO groups (title,description,created)
    VALUES ('A title once again', 'And the description follows.', NOW());
INSERT INTO groups (title,description,created)
    VALUES ('Title strikes back', 'This is really exciting!', NOW());

