CREATE TABLE applicants (
  id INTEGER PRIMARY KEY,
  name TEXT,
  age INTEGER,
  email TEXT
);

CREATE TABLE interviewers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  age INTEGER,
  email TEXT,
  companyId INTEGER,
  ADD FOREIGN KEY (companyId) REFERENCES companies (id) ON DELETE CASCADE
);

CREATE TABLE interviews (
  id INTEGER PRIMARY KEY,
  applicantId INTEGER,
  interviewerId INTEGER,
  score Number,
  FOREIGN KEY (applicantId) REFERENCES applicants (id) ON DELETE CASCADE,
  FOREIGN KEY (interviewerId) REFERENCES interviewers (id) ON DELETE CASCADE
);

CREATE TABLE companies (
  id INTEGER PRIMARY KEY,
  name TEXT,
  city TEXT
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  position TEXT
);

CREATE TABLE employeeCompany (
  id INTEGER PRIMARY KEY,
  employeeId INTEGER,
  companyId INTEGER,
  FOREIGN KEY (employeeId) REFERENCES employees (id) ON DELETE CASCADE,
  FOREIGN KEY (companyId) REFERENCES companies (id) ON DELETE CASCADE
);

