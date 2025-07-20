// socketEventHandlers.js - Helper functions to handle socket events and dispatch Redux actions
import { 
  setOnlineUsersDetailed, 
  userCameOnline, 
  userWentOffline, 
  addTypingUser, 
  removeTypingUser,
  updateUser 
} from './Slices/userSlice';

import { 
  updateOrganisation 
} from './Slices/organizationSlice';

import { 
  setConnected, 
  setDisconnected, 
  updatePing,
  setConnectionError 
} from './Slices/socketSlice';

import { 
  updatePatient 
} from './Slices/patientsSlice';

// Setup socket event listeners and dispatch appropriate Redux actions
export const setupSocketEventHandlers = (socket, dispatch) => {
  if (!socket) return;

  // Connection status events
  socket.on('connect', () => {
    console.log('✅ Socket connected');
    dispatch(setConnected());
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Socket disconnected:', reason);
    dispatch(setDisconnected(reason));
  });

  socket.on('connect_error', (error) => {
    console.error('🔴 Socket connection error:', error);
    dispatch(setConnectionError(error.message));
  });

  // Online users events
  socket.on('online_users_updated', (onlineUsersList) => {
    dispatch(setOnlineUsersDetailed(onlineUsersList));
  });

  socket.on('user_online', (userData) => {
    dispatch(userCameOnline({
      userId: userData.userId,
      user: userData.user
    }));
  });

  socket.on('user_offline', (data) => {
    dispatch(userWentOffline({ userId: data.userId }));
  });

  // Typing indicators
  socket.on('user_typing', (data) => {
    dispatch(addTypingUser({
      userId: data.userId,
      context: data.context,
      contextId: data.contextId,
      user: data.user
    }));
  });

  socket.on('user_stopped_typing', (data) => {
    dispatch(removeTypingUser({
      userId: data.userId,
      context: data.context,
      contextId: data.contextId
    }));
  });

  // Ping/Pong for connection health
  socket.on('pong', () => {
    dispatch(updatePing());
  });

  // Generic data update events
  socket.on('user_updated', (updatedUser) => {
    dispatch(updateUser(updatedUser));
  });

  socket.on('users_updated', (users) => {
    console.log('Users updated:', users);
  });
};

// Helper functions to emit socket events
export const socketEmitters = {
  // Join/leave organization rooms
  joinOrganization: (socket, organizationId) => {
    if (socket) {
      socket.emit('join_organization', organizationId);
    }
  },

  leaveOrganization: (socket, organizationId) => {
    if (socket) {
      socket.emit('leave_organization', organizationId);
    }
  },

  // Patient viewing
  viewPatient: (socket, patientData) => {
    if (socket) {
      socket.emit('patient_viewed', patientData);
    }
  },

  // Typing indicators
  startTyping: (socket, context, contextId) => {
    if (socket) {
      socket.emit('user_typing', { context, contextId });
    }
  },

  stopTyping: (socket, context, contextId) => {
    if (socket) {
      socket.emit('user_stopped_typing', { context, contextId });
    }
  },

  // Manual signout
  signOut: (socket) => {
    if (socket) {
      socket.emit('user_signout');
    }
  },

  // Ping for connection health
  ping: (socket) => {
    if (socket) {
      socket.emit('ping');
    }
  },
};

// Cleanup function to remove all event listeners
export const cleanupSocketEventHandlers = (socket) => {
  if (!socket) return;

  const events = [
    'connect',
    'disconnect', 
    'connect_error',
    'online_users_updated',
    'user_online',
    'user_offline',
    'user_typing',
    'user_stopped_typing',
    'pong',
    'user_updated',
    'users_updated'
  ];

  events.forEach(event => {
    socket.off(event);
  });
};