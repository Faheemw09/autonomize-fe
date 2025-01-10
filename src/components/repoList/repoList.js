import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./repoList.css";

const RepoList = ({ user, repos }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="user-profile">
        <img src={user.avatar_url} alt={user.name} />
        <div>
          <h2>{user.login}</h2>
          <p>{user.bio || "No bio available."}</p>
          <button onClick={() => navigate(`/followers/${user.login}`)}>
            View Followers
          </button>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.name} className="repo-item">
            <div className="repo-contents">
              <div className="repo-images">
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.name}
                  className="repo-imgs"
                />
              </div>
              <Link
                to={`/repo/${repo.owner.login}/${repo.name}`}
                className="repo-links"
              >
                <div className="repo-detailss">
                  <h3>{repo.name}</h3>
                  <p>{repo.description || "No description available."}</p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
