import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./followersRepo.css";

const FollowerRepos = () => {
  const { followerLogin } = useParams();
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${followerLogin}/repos`
        );
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, [followerLogin]);

  return (
    <div className="follower-repos-page">
      <button
        onClick={() => navigate(`/followers/${followerLogin}`)}
        className="back-button"
      >
        Back to Followers List
      </button>

      <h2>Repositories of {followerLogin}</h2>
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <span className="repo-name">{repo.name}</span>
            <span className="repo-description">
              {repo.description || "No description available."}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerRepos;
