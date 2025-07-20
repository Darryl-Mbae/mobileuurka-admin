// OnlineUsers.jsx - Component to display online users
import { useSocket } from '../hooks/useSocket';
import './OnlineUsers.css';

const OnlineUsers = ({ showCount = true, showList = true, maxDisplay = 5 }) => {
  const { onlineUsers, isConnected, getOnlineUsersCount } = useSocket();

  if (!isConnected) {
    return (
      <div className="online-users offline">
        <span className="status-indicator offline"></span>
        <span>Offline</span>
      </div>
    );
  }

  const onlineCount = getOnlineUsersCount();
  const displayUsers = onlineUsers.slice(0, maxDisplay);
  const remainingCount = Math.max(0, onlineCount - maxDisplay);

  return (
    <div className="online-users">
      {showCount && (
        <div className="online-count">
          <span className="status-indicator online"></span>
          <span>{onlineCount} online</span>
        </div>
      )}
      
      {showList && onlineCount > 0 && (
        <div className="online-list">
          {displayUsers.map((user) => (
            <div key={user.userId} className="online-user">
              <div className="user-avatar">
                {user.user.name ? user.user.name.charAt(0).toUpperCase() : 
                 user.user.email.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">
                  {user.user.name || user.user.email}
                </span>
                <span className="user-status">
                  {user.socketCount > 1 ? `${user.socketCount} sessions` : 'Online'}
                </span>
              </div>
            </div>
          ))}
          
          {remainingCount > 0 && (
            <div className="remaining-users">
              +{remainingCount} more
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;