create database course_manage;

use course_manage;

create TABLE Courses(
    Course_ID VARCHAR(20) PRIMARY KEY,
    NAME VARCHAR(20),
    Attributes VARCHAR(10),
    Teacher VARCHAR(20),
    C_time VARCHAR(20),
    Course_capacity INT,
    Belonging_Program VARCHAR(20),
    Choosing INT
    #Foreign Key (Belonging_Program) REFERENCES Program()
);
# 这里我想知道是 courses 是 program的外键  还是 program是courses的外键

/* 
CREATE TABLE Program(
    Program_ID VARCHAR(20) PRIMARY KEY,

) */
;
drop table SC;
CREATE Table SC(
    Student_ID VARCHAR(20),
    Course_ID VARCHAR(20),
    Foreign Key (Course_ID) REFERENCES Courses(Course_ID),
    PRIMARY KEY(Student_ID,Course_ID)
);

drop table classroom;
CREATE TABLE classroom(
    classroom_ID VARCHAR(20) PRIMARY KEY,
    capacity INT,
    First BOOLEAN,
    Second_ BOOLEAN,
    Third BOOLEAN,
    Fourth BOOLEAN,
    Fifth BOOLEAN,
    Sixth BOOLEAN,
    Seventh BOOLEAN
);