# Project Workflow

### Project Communication

- What has been accomplished
- What will you be working on
- What hurdles are you facing

#### Schedule
1. ***Friday, Jan 14***
    - Project Setup and Documentation
2. ***Weekend (Jan 15 - Jan 16)***
3. ***Monday, Jan 17***
4. ***Tuesday, Jan 18***
5. ***Wednesday, Jan 19***
6. ***Thursday, Jan 20***
7. ***Friday, Jan 21***

-------------- Extra Time --------------

1. ***Weekend (Jan 22 -*** Jan 23)
2. ***Monday, Jan 24***
3. ***Tuesday, Jan 25***
    - TESTING 
4. ***Wednesday, Jan 26***
5. ***Thursday, Jan 27***
    - Project Presentation


### Project Workflow

##### Project Milestones

We have decided to take a TDD approach to building our app. Testing integration at milestones. We will test only major features for test driven approach and mostly focus on integration.

| Timeline | Milestones |
|:-:|:-|
| Friday, Jan 14 | Project Setup and Documentation complete |
| Weekend | Get familiar React Native, work on minor feature (optional) |
| Monday, Jan 17 - Tuesday, Jan 18 | - Backend setup <br> - User authentication & User pages <br> - Testing and Integration |
| Wednesday, Jan 19 - Thursday, Jan 20 | - Messaging ( websocket ) <br> - Google Maps Api <br> - Testing and Integration |
| Friday, Jan 21 | - App integration, Testing to make app is working <br> - Stretch Features |
| Weekend | - Catch up and work on stretch features |

##### Git Workflow

- Always checkout a branch, never code on master/main branch
- Use github board for managing issues and features to work on

**Follow these guidelines:**
1. On main, pull from origin main
2. Create a feature branch (feature/feature_name)
3. Update your branch with the latest changes from main
    - git checkout main
    - git pull origin main
    - git checkout feature/feature_name (use git branch as needed)
    - git merge main (merge main into the feature branch)
    - resolve conflicts and commit changes
4. Push the feature branch to github
    - git push -u origin feature/feature_name (-u adds an upstream branch so the next time you can type only git push from that branch)
5. Create a pull request on GitHub
    - you should not merge your own pull request
6. Checkout to main and pull again from origin main

[git-workflow](https://github.com/akhan445/lhl-lectures/blob/master/w05d05-Midterm-KickOff/git-workflow.md)

##### How to distribute teamwork

- Work on setup together
- Decide on features to split as we reach milestones

##### Coding Sytles
- Follow airbnb style guide
[airbnb-guid](https://github.com/airbnb/javascript)