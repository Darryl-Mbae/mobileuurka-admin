
import { useState } from 'react';
import './css/Admin.css';
import SideBar from './components/SideBar/SideBar';
import DashboardPage from './pages/DashBoardPage';
import AlertsPage from './pages/AlertsPage';
import OBGYN from './pages/OBGYN';
import Hospitals from './pages/Hospitals';
import Patients from './pages/Patients';
import Settings from './pages/Settings';
function App() {

  const [activeItem, setActiveItem] = useState('Home');

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Obgyns':
        return <OBGYN />;
      case 'Hospitals':
        return <Hospitals />; 
      case 'Patients':
        return <Patients/>;
      case 'Settings':
        return <Settings/>;
      case 'Alerts':
        return <AlertsPage />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="admin">
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};



export default App
