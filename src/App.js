import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import InputForm from "./components/inputForm/inputForm";
import FollowersList from "./components/followerlist/followersList";
import RepoDetails from "./components/repodetails/repoDetails";
import RepoList from "./components/repoList/repoList";
import FollowerRepos from "./components/followersrepo/followersRepo";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const location = useLocation();

  return (
    <div className="app">
      {location.pathname === "/" && (
        <InputForm setUserData={setUserData} setRepos={setRepos} />
      )}
      <Routes>
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
