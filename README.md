# GitHub User Data API Frontend

This is the frontend for the **GitHub User Data API**. It allows users to search for GitHub usernames, view repositories, see user details, and navigate through repository details and followers, all using React hooks. The app fetches and displays data from the **GitHub API** and allows seamless navigation between different pages without redundant API calls.

## Features

1. **Search for GitHub Username**: 
   - An initial page with an input box where you can enter a GitHub username and click on a submit/search button.
   
2. **Display Repositories**: 
   - On submitting the username, it shows the list of repositories fetched from the backend API for the entered GitHub username, along with some useful user information above the repository list.
   
3. **Repository Details**: 
   - Clicking on any repository name in the list takes you to a page that shows detailed information about that repository (description, etc.).
   
4. **Followers Navigation**: 
   - On the repository list page, there is a link/button to navigate to a page showing the followers of the current GitHub user.
   
5. **Follower Repository Navigation**: 
   - Clicking on any follower in the follower list will take you to the repository list page of that follower.
   
6. **Return to Repository List**: 
   - There's an option to navigate back to the repository list page with the input box to search for another user.

---

## Technologies Used

- React.js
- React Hooks (for state management)
- React Router (for page navigation)
- Axios (for API requests)
- GitHub API
- CSS (for styling)

---

## Deployed Link

You can access the deployed frontend at:  
[https://autonomize-fe.vercel.app](https://autonomize-fe.vercel.app)

---

## How It Works

### 1. **Search Page**  
   - The app starts with an input box where users can enter a GitHub username and click on the submit/search button.
   - After the submission, it makes an API call to fetch the repositories for that username and displays them along with some user information (name, avatar, etc.).

### 2. **Repository List Page**  
   - The repository list is displayed with the repository names and some details like the number of stars, forks, and the repository language.
   - There is a button to navigate to the followers page for the current user.

### 3. **Repository Details Page**  
   - Clicking on a repository name leads to a details page that shows the repository's description and other relevant details.

### 4. **Followers Page**  
   - The followers of the current user are displayed with their usernames and avatars. Clicking on a follower’s name will show their repository list page.
   
### 5. **Return to Repository List**  
   - There is a way to navigate back to the repository list page with the input box to search for another GitHub username.

---

## Important Notes

- **React Hooks**: The app uses only React hooks for managing the component state and API requests.
- **State Management**: The app does not call the GitHub API repeatedly for information already fetched (like repositories, followers, etc.). It stores this data in React state to ensure no redundant API calls.
- **User Data**: Information like the avatar of the user is fetched using `avatar_url` from the GitHub API.
- **Routing**: React Router is used to navigate between the different pages (repository list, repository details, followers page).
  

### Key Features Included in the README:

1. **Search for GitHub Username**: Input box for GitHub username and submit button functionality.
2. **Repository List**: Display repositories for the given GitHub username.
3. **Repository Details**: Navigate to a page showing the repository's description.
4. **Followers**: Option to view the followers of the current GitHub user and navigate to their repository list.
5. **Navigation**: Seamless navigation between pages without re-fetching the same data.
6. **React Hooks & State Management**: Describes the use of React hooks for managing state and API requests.
!


