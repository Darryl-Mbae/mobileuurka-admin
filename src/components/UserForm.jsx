import React, { useState, useCallback, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaTimes, FaCopy, FaRedo } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import './UserForm.css';

const UserForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  user = null, // For editing existing user
  loading = false,
  error = null 
}) => {
  const tenants = useSelector((s) => s.tenant.tenants);
  
  // Generate a random password
  const generatePassword = useCallback(() => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }, []);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: user ? '' : generatePassword(), // Auto-generate for new users
    name: user?.name || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    hospitals: user?.hospitals || [],
    organizationName: user?.organizationName || '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [hospitalInputs, setHospitalInputs] = useState(
    user?.hospitals?.length > 0 ? user.hospitals : []
  );
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleHospitalChange = useCallback((index, value) => {
    const newHospitals = [...hospitalInputs];
    newHospitals[index] = value;
    setHospitalInputs(newHospitals);
    setFormData(prev => ({ 
      ...prev, 
      hospitals: newHospitals.filter(h => h.trim() !== '') 
    }));
  }, [hospitalInputs]);

  const addHospitalInput = useCallback(() => {
    setHospitalInputs(prev => [...prev, '']);
  }, []);

  const removeHospitalInput = useCallback((index) => {
    const newHospitals = hospitalInputs.filter((_, i) => i !== index);
    setHospitalInputs(newHospitals);
    setFormData(prev => ({ 
      ...prev, 
      hospitals: newHospitals.filter(h => h.trim() !== '') 
    }));
  }, [hospitalInputs]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.name) {
      return;
    }
    
    if (!user && !formData.password) {
      return;
    }

    const submitData = {
      ...formData,
      hospitals: hospitalInputs.filter(h => h.trim() !== '')
    };

    onSubmit(submitData);
  }, [formData, hospitalInputs, onSubmit, user]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const regeneratePassword = useCallback(() => {
    const newPassword = generatePassword();
    setFormData(prev => ({ ...prev, password: newPassword }));
    setCopySuccess(false);
  }, [generatePassword]);

  const copyPassword = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(formData.password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  }, [formData.password]);

  const handleTenantSelect = useCallback((index, tenantName) => {
    const newHospitals = [...hospitalInputs];
    newHospitals[index] = tenantName;
    setHospitalInputs(newHospitals);
    setFormData(prev => ({ 
      ...prev, 
      hospitals: newHospitals.filter(h => h.trim() !== '') 
    }));
  }, [hospitalInputs]);

  // Filter available tenants (exclude already selected ones)
  const getAvailableTenants = useCallback((currentIndex) => {
    const selectedTenants = hospitalInputs.filter((_, i) => i !== currentIndex);
    return tenants.filter(tenant => 
      tenant.type === 'hospital' && 
      !selectedTenants.includes(tenant.name)
    );
  }, [tenants, hospitalInputs]);

  if (!isOpen) return null;

  return (
    <div className="user-form-overlay">
      <div className="user-form-modal">
        <div className="user-form-header">
          <h2>{user ? 'Edit User' : 'Add New User'}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-grid">
            {/* Left Side - Personal Details */}
            <div className="form-section personal-details">
              <h3 className="section-title">Personal Details</h3>
              
              <div className="input-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="input-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="input-group password-group">
                <label htmlFor="password">
                  {user ? 'New Password (leave empty to keep current)' : 'Password *'}
                </label>
                <div className="password-input-container">
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      required={!user}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={loading}
                    />
                    <span
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                      role="button"
                      tabIndex={0}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash className="icon" /> : <FaEye className="icon" />}
                    </span>
                  </div>
                  <div className="password-controls">
                    {/* <button
                      type="button"
                      className="password-control-btn"
                      onClick={regeneratePassword}
                      disabled={loading}
                      title="Generate new password"
                    >
                      <FaRedo />
                    </button> */}
                    <button
                      type="button"
                      className={`password-control-btn ${copySuccess ? 'success' : ''}`}
                      onClick={copyPassword}
                      disabled={loading || !formData.password}
                      title={copySuccess ? "Copied!" : "Copy password"}
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                {!user && (
                  <small className="password-hint">
                    Password is auto-generated. User will change it on first login.
                  </small>
                )}
              </div>
            </div>

            {/* Right Side - Organization & Hospitals */}
            <div className="form-section organization-details">
              <h3 className="section-title">Organization & Hospitals</h3>
              
              <div className="input-group">
                <label htmlFor="organizationName">Organization Name</label>
                <input
                  type="text"
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  placeholder="Leave empty to auto-generate"
                  disabled={loading}
                />
              </div>

              <div className="input-group">
                <label>Hospitals/Tenants</label>
                <div className="hospitals-container">
                  {hospitalInputs.map((hospital, index) => (
                    <div key={index} className="hospital-input-row">
                      <div className="hospital-select-container">
                        <select
                          value={hospital}
                          onChange={(e) => handleTenantSelect(index, e.target.value)}
                          disabled={loading}
                          className="hospital-select"
                        >
                          <option value="">Select existing hospital or type new...</option>
                          {getAvailableTenants(index).map((tenant) => (
                            <option key={tenant.id} value={tenant.name}>
                              {tenant.name}
                            </option>
                          ))}
                        </select>
                        <span className="select-or">OR</span>
                        <input
                          type="text"
                          value={hospital}
                          onChange={(e) => handleHospitalChange(index, e.target.value)}
                          placeholder="Type new hospital name"
                          disabled={loading}
                          className="hospital-input"
                        />
                      </div>
                      {hospitalInputs.length > 0 && (
                        <button
                          type="button"
                          className="remove-hospital-btn"
                          onClick={() => removeHospitalInput(index)}
                          disabled={loading}
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-hospital-btn"
                    onClick={addHospitalInput}
                    disabled={loading}
                  >
                    + Add Hospital
                  </button>
                </div>
                <small className="hospitals-hint">
                  Select from existing hospitals or type new ones. New hospitals will be created automatically.
                </small>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : (user ? 'Update User' : 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;