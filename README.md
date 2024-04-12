# gift-tracker

A small social network platform to keep track of events of people in your network.

Installation steps
1. Install .env file in gift-tracker-frontend with Auth0 keys and login redirect URL
2. cd into gift-tracker-frontend folder and commandline: npm install
3. commandline: npm start
4. cd into gift-tracker-backend folder and commandline: npm install
5. Create a postgres database named "db"
6. commandline: docker compose up --build
7. commandline: npm run migrate
8. commandline: npm run seed
9. Stop docker process when complete
10. commandline: docker compose down


Application Purpose:

This app was built with military leadership in mind. To help keep track of
special dates for the members in their organization. This way they can build moral
through special planned events and present gifts that the members would actually like as well.
Initially the app was built to track birthdays, but it morphed into
a bigger purpose of building and keeping connections with other people
through gifting for special events and birthdays within different organizations.



How to run tests:

When running tests we used postman and console logging.
while trying to troubleshoot errors to reach a desired outcome,
we used the postman tool to see what was causing the error for the desired outcome.
If the error still was not clear to us on how to find the solution, we used
console logging to se what the console was actually returning. From there we were
able to refactor our code to fix the errors and continue to build out the project.