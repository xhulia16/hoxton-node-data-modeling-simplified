
import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log })

const applicants = [
    {
        name: "Julia",
        age: 22,
        email: "julia@gmail.com"
    },
    {
        name: "Anya",
        age: 26,
        email: "anya@gmail.com"
    },
    {
        name: "Bob",
        age: 34,
        email: "bob@gmail.com"
    },
    {
        name: "Norman",
        age: 32,
        email: "norman@gmail.com"
    },
    {
        name: "Ross",
        age: 27,
        email: "ross@gmail.com"
    }
]

const interviewers = [
    {
        name: "James",
        age: 44,
        email: "james@gmail.com",
        companyId: 1

    },
    {
        name: "John",
        age: 29,
        email: "john@gmail.com",
        companyId: 3

    },
    {
        name: "Sam",
        age: 26,
        email: "sam@gmail.com",
        companyId: 2

    },
    {
        name: "Emma",
        age: 34,
        email: "emma@gmail.com",
        companyId: 4

    }
]

const interviews = [
    {
        applicantId: 1,
        interviewerId: 2,
        date: "05/9/22",
        score: 58
    },
    {
        applicantId: 1,
        interviewerId: 4,
        date: "06/9/22",
        score: 80
    },
    {
        applicantId: 2,
        interviewerId: 3,
        date: "06/9/22",
        score: 25
    },
    {
        applicantId: 2,
        interviewerId: 1,
        date: "05/9/22",
        score: 70
    },
    {
        applicantId: 3,
        interviewerId: 4,
        date: "04/9/22",
        score: 100
    },
    {
        applicantId: 3,
        interviewerId: 3,
        date: "03/9/22",
        score: 98
    },
    {
        applicantId: 4,
        interviewerId: 4,
        date: "02/9/22",
        score: 28
    },
    {
        applicantId: 4,
        interviewerId: 1,
        date: "01/9/22",
        score: 66
    },
    {
        applicantId: 5,
        interviewerId: 2,
        date: "04/9/22",
        score: 84
    },
    {
        applicantId: 5,
        interviewerId: 3,
        date: "01/9/22",
        score: 50
    },
]

const companies = [
    {
        name: "Fluttershy",
        city: "Tirana"

    },
    {
        name: "Twillight",
        city: "Saranda"

    },
    {
        name: "Rarity",
        city: "Vlora"

    },
    {
        name: "Scootalo",
        city: "Shkodra"

    }
]

const employees = [
    {
        name: "Polonius",
        email: "Polonius@gmail.com",
        position: "Chief counsellor"
    },
    {
        name: "Mercutio",
        email: "Mercutio@gmail.com",
        position: "Coordinator"
    },
    {
        name: "Desdemona",
        email: "Desdemona@gmail.com",
        position: "Copywriter"
    },
    {
        name: "Falstaff",
        email: "Polonius@gmail.com",
        position: "Customer Service Specialist"
    },
    {
        name: "Prospero ",
        email: "Prospero@gmail.com",
        position: "Public Relations"
    },
    {
        name: "Macduff",
        email: "Macduff@gmail.com",
        position: "Managing Partner"
    },
    {
        name: "Rosalind",
        email: "Rosalind@gmail.com",
        position: "Scrum Master"
    }
]

const employeeCompany = [
    {
        employeeId: 1,
        companyId: 2
    },
    {
        employeeId: 2,
        companyId: 1
    },
    {
        employeeId: 3,
        companyId: 4
    },
    {
        employeeId: 4,
        companyId: 2
    },
    {
        employeeId: 5,
        companyId: 3
    },
    {
        employeeId: 6,
        companyId: 1
    },
    {
        employeeId: 7,
        companyId: 1
    },
    {
        employeeId: 6,
        companyId: 4
    }

]

db.exec(`
DROP TABLE IF EXISTS applicants;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS interviewers;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS employeeCompany;
`)

db.exec(`
CREATE TABLE IF NOT EXISTS applicants (
    id INTEGER,
    name TEXT,
    age INTEGER,
    email TEXT,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS companies (
    id INTEGER,
    name TEXT,
    city TEXT,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS interviewers (
    id INTEGER,
    name TEXT,
    age INTEGER,
    email TEXT,
    companyId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS interviews (
    id INTEGER ,
    applicantId INTEGER,
    interviewerId INTEGER,
    date TEXT,
    score INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (applicantId) REFERENCES applicants(id) ON DELETE CASCADE,
    FOREIGN KEY (interviewerId) REFERENCES interviewers(id) ON DELETE CASCADE
  );


  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER ,
    name TEXT,
    email TEXT,
    position TEXT,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS employeeCompany (
    id INTEGER ,
    employeeId INTEGER,
    companyId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (employeeId) REFERENCES  employees(id) ON DELETE CASCADE,
    FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE
  );
  
`)


const insertApplicants=db.prepare(`
INSERT INTO applicants( name, age, email) VALUES(@name, @age, @email);
`)

const insertCompanies = db.prepare(`
INSERT INTO companies(name, city) VALUES( @name, @city);
`)

const insertInterviewers=db.prepare(`
INSERT INTO interviewers( name, age, email, companyId) VALUES( @name, @age, @email, @companyId);
`)

const insertInterviews=db.prepare(`
INSERT INTO interviews(applicantId, interviewerId, date, score) VALUES( @applicantId, @interviewerId, @date, @score);
`)


const insertEmployees = db.prepare(`
INSERT INTO employees(name, email, position) VALUES(@name, @email, @position);
`)

const insertEmployeeCompany = db.prepare(`
INSERT INTO employeeCompany(employeeId, companyId) VALUES(@employeeId, @companyId);
`)

for(let applicant of applicants){
    insertApplicants.run(applicant);
}

for (let company of companies) {
    insertCompanies.run(company)
}

for(let interviewer of interviewers){
    insertInterviewers.run(interviewer);
}

for(let interview of interviews){
    insertInterviews.run(interview)
}

for (let employee of employees) {
    insertEmployees.run(employee)
}

for (let item of employeeCompany) {
    insertEmployeeCompany.run(item)
}

