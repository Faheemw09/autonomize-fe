import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./followeList.css";

const FollowersList = () => {
  const [followers, setFollowers] = useState([]);
  const [user, setUser] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndFollowers = async () => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${name}`
        );
        const userData = await userResponse.json();
        setUser(userData);

        const followersResponse = await fetch(userData.followers_url);
        const followersData = await followersResponse.json();
        setFollowers(followersData);
      } catch (error) {
        console.error("Error fetching user data or followers:", error);
      }
    };

    fetchUserAndFollowers();
  }, [name]);

  const handleFollowerClick = (followerLogin) => {
    navigate(`/follower-repos/${followerLogin}`);
  };

  return (
    <div className="followers-page">
      <button onClick={() => navigate("/repo")} className="back-button">
        Back to Repo List
      </button>

      {user ? (
        <div className="page-content">
          <div className="user-profile">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="user-avatar"
            />
            <div className="user-info">
              <h2>{user.login}</h2>
              <p>{user.location || "Location not available"}</p>
              <p>{user.bio || "Bio not available"}</p>
            </div>
          </div>

          <div className="followers-container">
            <h3>Followers</h3>
            <ul className="followers-list">
              {followers.map((follower) => (
                <li
                  key={follower.login}
                  className="follower-item"
                  onClick={() => handleFollowerClick(follower.login)}
                >
                  <img
                    src={follower.avatar_url}
                    alt={follower.login}
                    className="follower-avatar"
                  />
                  <p>{follower.login}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FollowersList;
