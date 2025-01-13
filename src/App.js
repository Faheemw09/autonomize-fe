import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputForm from "./components/inputForm/inputForm";
import FollowersList from "./components/followerlist/followersList";
import RepoDetails from "./components/repodetails/repoDetails";
import RepoList from "./components/repoList/repoList";
import FollowerRepos from "./components/followersrepo/followersRepo";
import UsersList from "./components/userlist/userList";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<InputForm setUserData={setUserData} setRepos={setRepos} />}
        />

        <Route path="/user-list" element={<UsersList />} />

        {userData && (
          <>
            <Route
              path="/repo"
              element={<RepoList user={userData} repos={repos} />}
            />
            <Route path="/repo/:owner/:repoName" element={<RepoDetails />} />
            <Route
              path="/followers/:name"
              element={<FollowersList followersUrl={userData.followers_url} />}
            />
            <Route
              path="/follower-repos/:followerLogin"
              element={<FollowerRepos />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
