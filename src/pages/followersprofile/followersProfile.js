import React, { useEffect, useState } from "react";
import axios from "../../utils/api";
import "./followersProfile.css";

const FollowersProfile = ({ username, onBack }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Fetch profile details of the follower
    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(`/users/${username}`);
        const reposResponse = await axios.get(`/users/${username}/repos`);
        setProfile(profileResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error("Error fetching follower's profile:", error);
      }
    };

    fetchProfile();
  }, [username]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="followers-profile">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="profile-header">
        <img src={profile.avatar_url} alt={`${username}'s avatar`} />
        <h2>{profile.name || username}</h2>
        <p>{profile.bio || "No bio available"}</p>
      </div>

      <div className="profile-stats">
        <p>Followers: {profile.followers}</p>
        <p>Following: {profile.following}</p>
        <p>Public Repos: {profile.public_repos}</p>
      </div>

      <div className="repos-list">
        <h3>Repositories</h3>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <p>{repo.description || "No description available"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowersProfile;
