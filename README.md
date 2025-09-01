Software Engineer
Coding Tests - Inloop
1 INTRODUCTION
Solutions will be evaluated based on correctness, clarity, efficiency and best practices. Please spend
no more than 1 hour total on all tests. The scope of the tests are such that they are not easy to
complete within 1 hour. Submission of incomplete solution is acceptable, and incomplete solutions
will be evaluated based on prioritisation approach and balance of quality vs quantity.
Submission should be in the form of a single zip file containing easily identifiable files or zip files for
each component.
As zip files with executable content sometimes get blocked in email transmission, please make the
zip file available for download (e.g. Dropbox, Google Drive, etc.).
Along with your submission please provide an estimate of:
1) Total Time Taken
2) Which solutions relied on googling hints, tips or answers; Googling is acceptable, but you
should be prepared to explain your understanding of the solution and provide references to
source material as applicable.

2 RESTFUL WEB API
Create a RESTful Web Api using any Python Web-framework to manage a persisted domain model
relating to the problem domain of a university where:
 Students enrol in Subjects;
 After enrolling in a course, a Student then completes a Subject
Design and implement a persistable domain model to represent the above concepts. You may use
the persistence mechanism (i.e. orm/database) of your choice.
Expose CRUD-style operations for each entity type via the Restful API to support at a minimum:
 Creating, reading, updating and deleting students
 Creating, reading and updating subjects
 Reading enrolments as a collection sub-resource of a student resource, returning the list of
enrolments (both completed &amp; uncompleted)
 Reading students as a collection sub-resource of a subject, returning the list of students
enrolled in the subject.



//  this task can be how to run  download the project on your system 
// open with the project in vs code or other editer 
// then  in this project have python web api and react university client ui 
// start api  using following cmd : uvicorn app.main:app --reload  t
// then search the url in any brawsor : port 8000 
like https://127.167.0.1/8000/docs

then start the client appu using client 

 // goes to university-client folder 
    cd .. 

 type cmd : npm i 
 then npm run dev then both projects are run 

thank you
  

