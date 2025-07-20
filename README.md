# MobileUurka Admin System

<div align="center">
  <img src="public/logo.png" alt="MobileUurka Logo" width="120" height="120">
  
  <h3>Advanced Healthcare Management Platform</h3>
  <p>A comprehensive admin system for managing healthcare organizations, users, patients, and real-time communications.</p>

  [![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
  [![Socket.io](https://img.shields.io/badge/Socket.io-4.0+-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
  [![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

## 🚀 Features

### 👥 User Management
- **Dynamic User Creation**: Auto-generated secure passwords with copy functionality
- **Role-Based Access**: Owner, Admin, and User roles with different permissions
- **Real-time Status**: Live online/offline status tracking
- **Organization Assignment**: Multi-tenant organization management

### 🏥 Healthcare Management
- **Patient Records**: Comprehensive patient data management
- **Hospital/Tenant System**: Multi-hospital support with tenant isolation
- **Organization Structure**: Hierarchical organization management
- **Real-time Updates**: Live data synchronization across all clients

### 🔐 Security & Authentication
- **Multi-Factor Authentication**: Email + OTP verification
- **Password Management**: Auto-generated passwords with mandatory change on first login
- **reCAPTCHA Integration**: Bot protection and security verification
- **Session Management**: Secure cookie-based authentication

### 🌐 Real-time Features
- **Live User Presence**: See who's online in real-time
- **Typing Indicators**: Know when users are typing
- **Patient Viewing Status**: Track who's viewing patient records
- **Organization Rooms**: Real-time communication within organizations

### 🔍 Advanced Search
- **Dynamic Search**: Real-time search across users, patients, and organizations
- **Smart Filtering**: Context-aware search with multiple criteria
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **React Icons** - Icon library
- **Vite** - Fast build tool and dev server

### Backend Integration
- **Node.js** - Server runtime
- **Prisma** - Database ORM
- **Socket.io** - Real-time engine
- **bcrypt** - Password hashing
- **JWT** - Token-based authentication

### Development Tools
- **ESLint** - Code linting
- **Vite** - Development server and bundler
- **CSS Modules** - Scoped styling

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API server running

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mobileuurka-admin-system.git
   cd mobileuurka-admin-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   VITE_SERVER_URL=http://localhost:3000
   VITE_SOCKET_URL=http://localhost:3000
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── SearchContainer.jsx    # Dynamic search component
│   ├── UserForm.jsx          # User creation/editing form
│   ├── OnlineUsers.jsx       # Real-time user presence
│   ├── ChangePassword.jsx    # Password change component
│   └── ...
├── pages/               # Main application pages
│   ├── Auth.jsx              # Authentication page
│   ├── Patients.jsx          # Patient management
│   ├── OBGYN.jsx            # User management
│   ├── Organisations.jsx     # Organization management
│   └── ...
├── realtime/            # Real-time state management
│   ├── Slices/              # Redux slices
│   │   ├── userSlice.js     # User state management
│   │   ├── organizationSlice.js
│   │   ├── patientsSlice.js
│   │   └── socketSlice.js
│   └── socketEventHandlers.js
├── config/              # Configuration files
│   ├── store.js             # Redux store configuration
│   └── socket.js            # Socket.io client setup
├── hooks/               # Custom React hooks
│   └── useSocket.js         # Socket management hook
├── css/                 # Styling files
└── assets/              # Static assets
```

## 🎯 Key Components

### SearchContainer
Dynamic, reusable search component with conditional Add button:
```jsx
<SearchContainer
  placeholder="Search users..."
  onSearch={handleSearch}
  showAddButton={true}
  addButtonText="Add User"
  onAdd={handleAddUser}
/>
```

### UserForm
Comprehensive user creation form with auto-generated passwords:
```jsx
<UserForm
  isOpen={showUserForm}
  onClose={handleCloseForm}
  onSubmit={handleSubmitUser}
  user={selectedUser}
  loading={formLoading}
  error={formError}
/>
```

### Real-time Integration
```jsx
const { isConnected, onlineUsers, joinOrganization } = useSocket();
```

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_SERVER_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000

# Security
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# Optional
VITE_APP_NAME=MobileUurka Admin
VITE_APP_VERSION=1.0.0
```

### Redux Store
The application uses Redux Toolkit for state management with the following slices:
- `userSlice` - User data and online status
- `organizationSlice` - Organization management
- `patientsSlice` - Patient records
- `tenantsSlice` - Hospital/tenant data
- `socketSlice` - Real-time connection status

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables for Production
Make sure to set these in your deployment platform:
- `VITE_SERVER_URL` - Your production API URL
- `VITE_SOCKET_URL` - Your production Socket.io URL
- `VITE_RECAPTCHA_SITE_KEY` - Your reCAPTCHA site key

## 🔐 Security Features

- **Auto-generated Passwords**: Secure 12-character passwords
- **Password Change Enforcement**: Users must change default passwords
- **reCAPTCHA Protection**: Bot protection on forms
- **Real-time Security**: Socket authentication and authorization
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Configured for production domains

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1024px+) - Full grid layouts
- **Tablet** (768px-1024px) - Adapted layouts
- **Mobile** (< 768px) - Stacked, touch-friendly interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs`

## 🎉 Acknowledgments

- React team for the amazing framework
- Redux team for state management
- Socket.io team for real-time capabilities
- All contributors who helped build this system

---

<div align="center">
  <p>Built with ❤️ for healthcare management</p>
  <p>© 2024 MobileUurka. All rights reserved.</p>
</div>