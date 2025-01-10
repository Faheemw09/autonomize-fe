import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./repoList.css";

const RepoList = ({ user, repos }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="user-profile">
        <h2>{user.login}</h2>
        <img src={user.avatar_url} alt={user.name} />
        <p>{user.bio}</p>
        <button onClick={() => navigate(`/followers/${user.login}`)}>
          View Followers
        </button>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.name} className="repo-item">
            <img
              src={repo.owner.avatar_url}
              alt={repo.name}
              className="repo-img"
            />
            <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
              <div className="repo-details">
                <h3>{repo.name}</h3>
                <p>{repo.description || "No description available."}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
