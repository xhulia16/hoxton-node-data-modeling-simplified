
import Database from "better-sqlite3";

const db=Database("./db/data.db", {verbose:console.log})

const applicants=[
    {
        name:"Julia",
        age: 22,
        email: "julia@gmail.com"
    },
    {
        name:"Anya",
        age: 26,
        email: "anya@gmail.com"
    },
    {
        name:"Bob",
        age: 34,
        email: "bob@gmail.com"
    },
    {
        name:"Norman",
        age: 32,
        email: "norman@gmail.com"
    },
    {
        name:"Ross",
        age: 27,
        email: "ross@gmail.com"
    }
]

const interviewers=[
    {
        name: "James",
        age: 44,
        email:"james@gmail.com",
        companyId: 1

    },
    {
        name: "John",
        age: 29,
        email:"john@gmail.com",
        companyId: 3

    },
    {
        name: "Sam",
        age: 26,
        email:"sam@gmail.com",
        companyId: 2

    },
    {
        name: "Emma",
        age: 34,
        email:"emma@gmail.com",
        companyId: 2

    },
]

const interviews=[
    {
        applicantId:1,
        interviewerId:2,
        date: "05/9/22",
        score:58
    },
    {
        applicantId:1,
        interviewerId:4,
        date: "06/9/22",
        score:80
    },
    {
        applicantId:2,
        interviewerId:3,
        date: "06/9/22",
        score:25
    },
    {
        applicantId:2,
        interviewerId:1,
        date: "05/9/22",
        score:70
    },
    {
        applicantId:3,
        interviewerId:4,
        date: "04/9/22",
        score:100
    },
    {
        applicantId:3,
        interviewerId:3,
        date: "03/9/22",
        score:98
    },
    {
        applicantId:4,
        interviewerId:4,
        date: "02/9/22",
        score:28
    },
    {
        applicantId:4,
        interviewerId:1,
        date: "01/9/22",
        score:66
    },
    {
        applicantId:5,
        interviewerId:2,
        date: "04/9/22",
        score:84
    },
    {
        applicantId:5,
        interviewerId:3,
        date: "01/9/22",
        score:50
    },
]

const companies=[
{

}
]

db.exec(`
DROP TABLE IF EXISTS applicants;
DROP TABLE IF EXISTS interviewers;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS employeeCompany;
`)

db.exec(`
CREATE TABLE applicants (
    id INTEGER ,
    name TEXT,
    age INTEGER,
    email TEXT,
    PRIMARY KEY (id)
  );
  
  CREATE TABLE interviewers (
    id INTEGER,
    name TEXT,
    age INTEGER,
    email TEXT,
    companyId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (companyId) REFERENCES companies (id) ON DELETE CASCADE
  );
  
  CREATE TABLE interviews (
    id INTEGER ,
    applicantId INTEGER,
    interviewerId INTEGER,
    score Number,
    PRIMARY KEY (id),
    FOREIGN KEY (applicantId) REFERENCES applicants (id) ON DELETE CASCADE,
    FOREIGN KEY (interviewerId) REFERENCES interviewers (id) ON DELETE CASCADE
  );
  
  CREATE TABLE companies (
    id INTEGER ,
    name TEXT,
    city TEXT,
    PRIMARY KEY (id)
  );
  
  CREATE TABLE employees (
    id INTEGER ,
    name TEXT,
    email TEXT,
    position TEXT,
    PRIMARY KEY (id)
  );
  
  CREATE TABLE employeeCompany (
    id INTEGER ,
    employeeId INTEGER,
    companyId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (employeeId) REFERENCES employees (id) ON DELETE CASCADE,
    FOREIGN KEY (companyId) REFERENCES companies (id) ON DELETE CASCADE
  );
`)