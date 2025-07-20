import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/OBGYN.css";
import SearchContainer from "../components/SearchContainer";
import UserForm from "../components/UserForm";
import { setTenants } from "../realtime/Slices/tenantsSlice";

const columns = [
  {
    label: "Name",
    key: "name",
    render: ({ user }) => (
      <>
        <span>
          {user.name
            ?.split(" ")
            .map((w) => w.charAt(0))
            .join("")
            .toUpperCase()}
        </span>{" "}
        {user.name || "—"}
      </>
    ),
  },
  { label: "Email", key: "email" },
  { label: "ID", key: "id" },
  {
    label: "Organisation",
    key: "org",
    render: ({ user, organisations }) => {
      const orgId = user.userTenants?.[0]?.organizationId;
      const org = organisations.find((o) => o.id === orgId);
      return org?.name || "—";
    },
  },
  {
    label: "Role",
    key: "role",
    render: ({ user }) =>
      user.userTenants?.[0]?.role ? (
        <>
          <span className="dot" style={{ background: "#008540" }}></span>
          {user.userTenants[0].role}
        </>
      ) : (
        "—"
      ),
  },
  {
    label: "Status",
    key: "status",
    render: ({ user, onlineUsers }) => {
      const isOnline = onlineUsers.includes(user.id);
      return (
        <>
          <span
            className="dot"
            style={{ background: isOnline ? "#00c853" : "#ccc" }}
          ></span>
          {isOnline ? "Online" : "Offline"}
        </>
      );
    },
  },
  {
    label: "Joined",
    key: "joined",
    render: ({ user }) =>
      user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
  },
];

const OBGYN = () => {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.user.users);
  const organisations = useSelector((s) => s.organisation.organisations);
  const onlineUsers = useSelector((s) => s.user.onlineUsers);
  const tenants = useSelector((s) => s.tenant.tenants);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const SERVER = import.meta.env.VITE_SERVER_URL;

  // Fetch tenants when component mounts
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch(`${SERVER}/tenants`, {
          credentials: 'include',
        });
        
        if (response.ok) {
          const tenantsData = await response.json();
          dispatch(setTenants(tenantsData));
        }
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    if (!tenants || tenants.length === 0) {
      fetchTenants();
    }
  }, [SERVER, dispatch, tenants]);

  useEffect(() => {
    // Filter users based on search term
    if (!searchTerm.trim()) {
      setFilteredUsers(users || []);
    } else {
      const filtered = (users || []).filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userTenants?.[0]?.role
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
  }, []);

  const handleAddUser = useCallback(() => {
    setSelectedUser(null);
    setFormError(null);
    setShowUserForm(true);
  }, []);

  const handleEditUser = useCallback((user) => {
    setSelectedUser(user);
    setFormError(null);
    setShowUserForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowUserForm(false);
    setSelectedUser(null);
    setFormError(null);
    setFormLoading(false);
  }, []);

  const handleSubmitUser = useCallback(
    async (userData) => {
      setFormLoading(true);
      setFormError(null);

      try {
        const endpoint = selectedUser
          ? `${SERVER}/users/${selectedUser.id}`
          : `${SERVER}/users/signup`;

        const method = selectedUser ? "PUT" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `Failed to ${selectedUser ? "update" : "create"} user`
          );
        }

        // Success - close form and refresh data
        handleCloseForm();

        // You might want to dispatch an action to refresh users list here
        // or emit a socket event to update all clients
        console.log(
          `User ${selectedUser ? "updated" : "created"} successfully:`,
          data
        );
      } catch (error) {
        console.error("Error submitting user:", error);
        setFormError(error.message);
      } finally {
        setFormLoading(false);
      }
    },
    [selectedUser, SERVER, handleCloseForm]
  );

  return (
    <div className="users-page">
      <div className="toolbar">
        <div className="count">
          All Users <span>{filteredUsers?.length || 0}</span>
          {searchTerm && (
            <span className="search-info">
              {filteredUsers?.length !== users?.length &&
                ` (${users?.length || 0} total)`}
            </span>
          )}
        </div>

        <SearchContainer
          placeholder="Search users by name, email, ID, or role..."
          onSearch={handleSearch}
          showAddButton={true} // Show add button for users
          addButtonText="Add User"
          onAdd={handleAddUser}
          searchValue={searchTerm}
        />
      </div>

      <div className="lists">
        <div className="title">
          {columns.map((col) => (
            <div key={col.key} className={col.key}>
              {col.label}
            </div>
          ))}
        </div>

        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              className="list"
              key={user.id}
              onClick={() => handleEditUser(user)}
              style={{ cursor: "pointer" }}
            >
              {columns.map((col) => (
                <div key={col.key} className={col.key}>
                  {col.render
                    ? col.render({ user, organisations, onlineUsers })
                    : user[col.key] || "—"}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="no-results">
            {searchTerm
              ? `No users found matching "${searchTerm}"`
              : "No users found."}
          </div>
        )}
      </div>

      {/* User Form Modal */}
      <UserForm
        isOpen={showUserForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmitUser}
        user={selectedUser}
        loading={formLoading}
        error={formError}
      />
    </div>
  );
};

export default OBGYN;
