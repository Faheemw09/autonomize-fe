import React, { useEffect, useState } from "react";
import "./userList.css";
import { useNavigate } from "react-router-dom";

const UserModal = ({ user, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    location: "",
    bio: "",
    repositories: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        location: user.location || "",
        bio: user.bio || "",
        repositories: user.repositories || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(user.username, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Update User: {user.username}</h3>
        <form onSubmit={handleSubmit}>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <label>Bio</label>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <label>Repositories</label>
          <input
            type="text"
            name="repositories"
            value={formData.repositories}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = sortField ? `?sortBy=${sortField}` : "";
      const response = await fetch(
        `https://autonomizebackend.onrender.com/api/users${query}`
      );
      const data = await response.json();
      console.log(data, "dta");
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sortField]);

  const handleDelete = async (username) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await fetch(
        `https://autonomizebackend.onrender.com/api/delete-user/${username}`,
        { method: "PATCH" }
      );
      setUsers(users.filter((user) => user.username !== username));
      setSuccessMessage("User deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage("Error deleting user");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (username, updatedFields) => {
    if (!updatedFields) return;
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await fetch(
        `https://autonomizebackend.onrender.com/api/update-user/${username}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const updatedUser = await response.json();
      setUsers(
        users.map((user) =>
          user.username === username ? { ...user, ...updatedUser } : user
        )
      );
      setSuccessMessage("User updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage("Error updating user");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const navigate = useNavigate();
  return (
    <div className="users-list-container">
      <h2 onClick={() => navigate("/")}>Back</h2>
      <h2>Users</h2>
      <div className="sort-controls">
        <label htmlFor="sortField">Sort by:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Location</th>
            <th>Bio</th>
            <th>Repositories</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.location || "No Location"}</td>
              <td>{user.bio || "No Bio"}</td>
              <td>{user.repositories || ""}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => openModal(user)}
                  className="update-button"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user.username)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default UsersList;
