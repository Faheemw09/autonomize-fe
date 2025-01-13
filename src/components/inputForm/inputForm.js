import React, { useState } from "react";
// import axios from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./inputForm.css";
import axios from "axios";

const InputForm = ({ setUserData, setRepos }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://autonomizebackend.onrender.com/api/save-user/${username}`
      );
      toast.success(response.message);
      console.log(response, "res");
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const reposResponse = await axios.get(userResponse.data.repos_url);
      console.log(reposResponse, "inpout");

      setUserData(userResponse.data);
      setRepos(reposResponse.data);

      setUsername("");
      navigate("/repo");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "User not found or an error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
        <button
          type="button"
          style={{ marginLeft: "5px" }}
          onClick={() => navigate("/user-list")}
        >
          Users
        </button>
      </form>
    </div>
  );
};

export default InputForm;
