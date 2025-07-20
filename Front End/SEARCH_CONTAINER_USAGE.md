# Dynamic SearchContainer & UserForm Usage Guide

## Overview
The SearchContainer component is now dynamic and reusable across different pages with conditional Add button functionality. The UserForm component handles user creation/editing with your backend signup endpoint.

## SearchContainer Props

```jsx
<SearchContainer
  placeholder="Search..." // Custom placeholder text
  onSearch={handleSearch} // Function called when search value changes
  showAddButton={true/false} // Show/hide Add button
  addButtonText="Add New" // Custom Add button text
  onAdd={handleAddClick} // Function called when Add button is clicked
  searchValue="" // Controlled search value
  className="" // Additional CSS classes
  disabled={false} // Disable the entire component
/>
```

## Usage Examples

### 1. Users Page (with Add Button)
```jsx
// src/pages/OBGYN.jsx (Users)
import SearchContainer from "../components/SearchContainer";
import UserForm from "../components/UserForm";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  
  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
  }, []);

  const handleAddUser = useCallback(() => {
    setShowUserForm(true);
  }, []);

  return (
    <div>
      <SearchContainer
        placeholder="Search users by name, email, ID, or role..."
        onSearch={handleSearch}
        showAddButton={true} // ✅ Show Add button for users
        addButtonText="Add User"
        onAdd={handleAddUser}
        searchValue={searchTerm}
      />
      
      <UserForm
        isOpen={showUserForm}
        onClose={() => setShowUserForm(false)}
        onSubmit={handleSubmitUser}
        loading={formLoading}
        error={formError}
      />
    </div>
  );
};
```

### 2. Patients Page (without Add Button)
```jsx
// src/pages/Patients.jsx
import SearchContainer from "../components/SearchContainer";

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
  }, []);

  return (
    <div>
      <SearchContainer
        placeholder="Search patients by name, ID, hospital, or condition..."
        onSearch={handleSearch}
        showAddButton={false} // ❌ No Add button for patients
        searchValue={searchTerm}
      />
    </div>
  );
};
```

### 3. Organizations Page (without Add Button)
```jsx
// src/pages/Organisations.jsx
import SearchContainer from "../components/SearchContainer";

const OrganisationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = useCallback((searchValue) => {
    setSearchTerm(searchValue);
  }, []);

  return (
    <div>
      <SearchContainer
        placeholder="Search organisations by name, ID, or owner..."
        onSearch={handleSearch}
        showAddButton={false} // ❌ No Add button for organisations
        searchValue={searchTerm}
      />
    </div>
  );
};
```

## UserForm Component

### Props
```jsx
<UserForm
  isOpen={boolean} // Show/hide modal
  onClose={function} // Close modal function
  onSubmit={function} // Submit form function
  user={object|null} // User object for editing (null for new user)
  loading={boolean} // Show loading state
  error={string|null} // Error message to display
/>
```

### Form Data Structure
The UserForm handles data that matches your backend signup endpoint:

```javascript
{
  email: "user@example.com",
  password: "password123", // Required for new users, optional for editing
  name: "John Doe",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  avatar: "https://...",
  hospitals: ["Hospital 1", "Hospital 2"], // Array of hospital names
  organizationName: "Custom Org Name" // Optional, auto-generated if empty
}
```

## Backend Integration

### Required Endpoints

1. **User Creation**: `POST /auth/signup`
2. **User Update**: `PUT /users/:id` (you may need to create this)
3. **Check Credentials**: `POST /auth/check-credentials`
4. **Change Password**: `POST /auth/change-password`

### Example Backend Handler
Your existing `handleUserSignup` function works perfectly with the UserForm:

```javascript
export const handleUserSignup = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      firstName,
      lastName,
      phone,
      avatar,
      hospitals = [],
      organizationName,
    } = req.body;

    // Your existing logic...
    const result = await userSignupTransaction({
      email,
      password,
      name,
      firstName,
      lastName,
      phone,
      avatar,
      hospitals,
      organizationName,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: result.user,
      organization: result.organization,
      tenants: result.tenants,
    });
  } catch (error) {
    // Error handling...
  }
};
```

## Search Functionality

Each page implements its own search logic:

```javascript
useEffect(() => {
  if (!searchTerm.trim()) {
    setFilteredItems(items || []);
  } else {
    const filtered = (items || []).filter(item => 
      // Custom search logic for each page
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
      // Add more fields as needed
    );
    setFilteredItems(filtered);
  }
}, [items, searchTerm]);
```

## Features

### ✅ Implemented
- Dynamic SearchContainer with conditional Add button
- UserForm with hospital/tenant management
- Search functionality across all pages
- Responsive design
- Form validation
- Loading states
- Error handling
- Password visibility toggle
- Dynamic hospital inputs

### 🎯 Key Benefits
- **Reusable**: Same component across different pages
- **Flexible**: Conditional Add button based on page requirements
- **Consistent**: Same design and behavior everywhere
- **Accessible**: Proper form labels and keyboard navigation
- **Responsive**: Works on mobile and desktop
- **Integrated**: Works with your existing backend API

## Usage Summary

- **Users Page**: SearchContainer WITH Add button + UserForm
- **Patients Page**: SearchContainer WITHOUT Add button
- **Organizations Page**: SearchContainer WITHOUT Add button
- **Any other page**: Use SearchContainer with appropriate props

The system is now fully integrated and ready to use! 🚀