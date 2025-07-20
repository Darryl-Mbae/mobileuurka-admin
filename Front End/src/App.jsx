import { useEffect, useState } from "react";
import "./css/Admin.css";
import SideBar from "./components/SideBar";
import DashboardPage from "./pages/DashBoardPage";
import AlertsPage from "./pages/AlertsPage";
import OBGYN from "./pages/OBGYN";
import Hospitals from "./pages/Hospitals";
import Patients from "./pages/Patients";
import Settings from "./pages/Settings";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUsers } from "./realtime/Slices/userSlice";
import { initializeSocket, disconnectSocket } from "./config/socket.js";
import { setSocket } from "./realtime/Slices/socketSlice";
import { setOrganisations } from "./realtime/Slices/organizationSlice.js";
import Organisations from "./pages/Organisations.jsx";
import { setTenants } from "./realtime/Slices/tenantsSlice.js";

function App() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVER = import.meta.env.VITE_SERVER_URL;
  const currentUser = useSelector((s) => s.user.currentUser);
  const users = useSelector((s) => s.user.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize socket after user logs in
  useEffect(() => {
    if (currentUser) {
      const socket = initializeSocket(currentUser.name, dispatch);
      dispatch(setSocket(socket));

      return () => {
        disconnectSocket();
      };
    }
  }, [currentUser, dispatch]);

  // Centralized API fetch function
  const fetchData = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${SERVER}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        ...options,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Failed to fetch from ${endpoint}`);
      }
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  // Get current user
  useEffect(() => {
    async function getUser() {
      try {
        const data = await fetchData("/users");
        console.log("User data:", data);
        dispatch(setUser(data));
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [dispatch, navigate]);

  // Get all users (admin only) - INITIAL FETCH ONLY
  useEffect(() => {
    async function getUsers() {
      if (!currentUser) return;

      try {
        const data = await fetchData("/users/admin");
        dispatch(setUsers(data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    getUsers();
  }, [dispatch, currentUser]);

  // Get organizations - INITIAL FETCH ONLY
  useEffect(() => {
    async function getOrganizations() {
      if (!currentUser) return;

      try {
        const data = await fetchData("/organisations/all");
        dispatch(setOrganisations(data));
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    }

    getOrganizations();
  }, [dispatch, currentUser]);

  //GET Tenants
  useEffect(() => {
    async function getTenants() {
      if (!currentUser) return;

      try {
        const data = await fetchData("/tenants");
        dispatch(setTenants(data))
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    }

    getTenants();
  }, [dispatch, currentUser]);


  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <DashboardPage />;

      case "Tenants":
        return <Hospitals />;
      case "Organisations":
        return <Organisations />;
      case "Users":
        return <OBGYN />;
      case "Patients":
        return <Patients />;
      case "Settings":
        return <Settings />;
      case "Alerts":
        return <AlertsPage />;
      default:
        return <div>Select a section</div>;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="admin-loading">
        <div>Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="admin-error">
        <div>Error: {error}</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Require authentication
  if (!currentUser) {
    return (
      <div className="admin-auth-required">
        <div>Authentication required</div>
        <button onClick={() => navigate("/auth")}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin">
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default App;
