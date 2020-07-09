Welcome to full-stack web app for logging guest complaints in hotel and lodging industry.
HOW TO USE:

DEFAULT ADMIN:
  Username: admin
  Password: admin

DEFAULT USER:
  Username: user
  Password: user

AS ADMIN:
1. When you login you should see reports of all guests listed on the page under "Reports:", if there are no current reports it should say that there is no reports to display.
  1.1. If there are user reports, you can see the details of the report andclick on each individual report.
  App then shows you only that report and adds "Delete"  button that deletes or closes that report when the problem is resolved.
  1.2. When you delete a user report, app should redirect you to the previous page where you can see all the reports. Now the post you have just deleted should not be in the list.
2. On the left side, under the logo, there should be 2 buttons: "Home screen" - works like logout button, and returns you to the login screen, and "Create New User".
3. When you click on "Create New User" it loads another page where you can imput parameters for your new admin/guest account.
  3.1. If the user you are creating is a new admin check the check the checkbox next to "Administrator", also "Room number" is an optional field.
4. When the user fields are filled click "Submit" button, and the app will redirect you back to login page.

AS USER:
1. When you login you should see that user reports listed on the page under "User reports" (Each user can see only his/hers reports on this page, unlike admin users who can see
the reports of all users). Also, unlike admin users, normal or "guest" users cannot click on or delete each individual report and have to wait for admin users to resolve the issue first.
2. On the left side, under the logo, there should be 2 buttons: "Home screen" - works like logout button, and returns you to the login screen, and "Create Report".
3. When you click on "Create Report" app loads another page where you can create a new report that takes in Report type and report description as parameters.
4. When the fields are filled click "Submit" button, and the app will redirect you back to the "User Reports" page.

Testing:
Error codes - 400, 401, 403, and 404 should all be working and display correct error messages.
You should not be able to login without entering correct username and password and the app should display error messages in all cases.
You should not be able to go to any app routes except "/" unless you are logged in. (App logs you in with JWT token that is saved in cookies, so please enable them before you test)
When you click on "Home screen" as admin or as user, the app should return you to the login screen and clear all cookies including JWT tokens.
Normal users that are logged in should not be able to go to "/admin" or "/createuser" routes and error message should display.

Notes:
User passwords are encrypted and saved safe with bcrypt, and JWT tokens are encrypted with custom 64bit secret key.

APP uses:
Node.js, Express, Mongoose, MongoDB, Morgan (for timestamps), EJS (for frontend logic), bcrypt and JWT (for authentication and authorization).

Published by:
Filip Ristovic 2020
