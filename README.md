## godaddy_repos_details

This project is a Reacj.js application that fetches and displays detailed information about GoDaddy GitHub repositories.

Prerequisites 
--------

NodeJS should be installed <br/>
Use any of your preferred code  editor example VS Code
 
Installation
--------
```bash
git clone https://github.com/Kuldevsingh/godaddy_repos_details.git
cd godaddy_repos_details
npm install
npm start
visit : http://localhost:3000/
```

Tech Stack 
--------
Language: JavaScript <br />
UI Framework- ReacJs <br />
CSS: Tailwind CSS <br />
Unit Test: React Testing Library & Jest



### Project & small Code walkthrough 
This is ReactJS-based framework project. <br />
Tailwind CSS:    For Stying UI I have used tailwind CSS because it gives more controls to the user and offers extensive customization and lightweight utility, On the other hand Material UI is also a nice UI designing library where we need more consistent UI and less effort but it is more heavy than tailwind. <br />
NoDataFoundComponent:    A generic component can be used wherever we want to show users some message when data is not present! <br />
LoadingSpinner:      This component can be called wherever we need to show the loader in the application! <br />
useFetchGoDaddyRepo:    This hook component is responsible for fetching data from API and it is a generic hook that can be used from anywhere. which provides data and the status of the API process and based on the status we can play with UI rendering. <br />
Pages: Inside the pages dir we can keep all components that  are rendering as the main part of UI and routes, for example: Repos.JSX <br />
Component: Inside this dir we can keep those components  that are being used in many other components or generic components <br />
__test: Test cases are maintained in this dir


### What can be done next?
RepoInfoModal: As of now RepoinfoModal is a single component but we can create a generic modal that can be reused across the application <br />
UI: We can make UI more attractive <br />
Unit Test: Unit test can be written in detail for each file <br />
Simmer UI: We can build simmer UI to make better User experience when loading data instead of just showing loader <br />
Page Search: We can implement client-side filter, and sorting into the repo table.

