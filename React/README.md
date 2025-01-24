## Video Tutorial used as starting point idea

Eric Roby - How to build a React and FastAPI application (Full Stack Guide)
https://www.youtube.com/watch?v=0zb2kohYZIM&t=1833s

## Activiion

In order to run the backend and frontend

1. In powershell terminal
   ''' .\env\Scripts\Activate.ps1'''
2. cd React
3. npm run start-backend
4. npm run start-frontend

Changes made from Video tutorial.

1. Made some admendments to the FastAPI files to match my requirements
2. Made some admendments to how GET and Post is handled.
3. Uvicorn reload syntax is placed in package.json so that it loads when start scripts for react are run.

## React App

This web based application will allow a user to create, read, update and delete tasks. A fetch all handler function in api.js displays all created tasks

# Create Task

1. Fill in details required.
2. Press submit
3. API sends inforamtion to transactions.db, if none exists this will be created.

# Update Task

1. Select Task using Check Box.
2. New window will open with task details - This also uses Task Form but further completes information to allow user to see what is already there.

## Icons

HomeOutlinedIcon
TaskOutlinedIcon
MenuOutlinedIcon
FormatListBulletedOutlinedIcon
DriveFileRenameOutlineOutlinedIcon
ScheduleOutlinedIcon
LightModeOutlinedIcon
DarkModeOutlinedIcon
NotificationsIcon
SettingsOutlinedIcon
PersonOutlinedIcon
SearchIcon
