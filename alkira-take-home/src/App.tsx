import React, { useState } from 'react';

// Simple types
interface User {
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  name: string;
}

// Mock users database (now mutable for sign-up)
const USERS = [
  { email: 'admin@test.com', password: 'admin123', role: 'admin' as const, name: 'Admin' },
  { email: 'editor@test.com', password: 'editor123', role: 'editor' as const, name: 'Editor' },
  { email: 'viewer@test.com', password: 'viewer123', role: 'viewer' as const, name: 'Viewer' },
];

// Simple auth functions
const mockLogin = (email: string, password: string) => {
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  return { user, otp: '123456' };
};

const mockSignUp = (email: string, password: string, name: string, role: 'admin' | 'editor' | 'viewer') => {
  // Check if user already exists
  const existingUser = USERS.find(u => u.email === email);
  if (existingUser) throw new Error('Email already registered');
  
  // Add new user to database
  const newUser = { email, password, role, name };
  USERS.push(newUser);
  
  return { user: newUser, otp: '123456' };
};

const mockVerifyOTP = (otp: string) => {
  return otp === '123456';
};

function App() {
  // ✅ ALL hooks at the top level - no conditional hooks!
  const [view, setView] = useState<'login' | 'signup' | 'mfa' | 'dashboard'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [tempOTP, setTempOTP] = useState('');
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');
  
  // MFA form state
  const [otp, setOTP] = useState('');
  
  // Error state
  const [error, setError] = useState('');

  // Validation helper
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Login handler
  const handleLogin = () => {
    setError('');
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      setError('Invalid email or password');
      return;
    }
    
    try {
      const result = mockLogin(email, password);
      setUser(result.user);
      setTempOTP(result.otp);
      setView('mfa');
      setError('');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Sign up handler
  const handleSignUp = () => {
    setError('');
    
    if (!signupName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!validateEmail(signupEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const result = mockSignUp(signupEmail, signupPassword, signupName, signupRole);
      setUser(result.user);
      setTempOTP(result.otp);
      setView('mfa');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    }
  };

  // MFA verification handler
  const handleVerify = () => {
    if (mockVerifyOTP(otp)) {
      setView('dashboard');
      setError('');
    } else {
      setError('Invalid OTP');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setView('login');
    setUser(null);
    setEmail('');
    setPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setOTP('');
    setError('');
  };

  // Login Page
  if (view === 'login') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Login</h1>
          {error && <div style={styles.error}>{error}</div>}
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="email"
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password"
          />
          <button style={styles.button} onClick={handleLogin} data-testid="login-btn">
            Login
          </button>
          <div style={styles.divider}>
            <span>Don't have an account?</span>
          </div>
          <button 
            style={{...styles.button, ...styles.secondaryButton}} 
            onClick={() => setView('signup')}
            data-testid="goto-signup-btn"
          >
            Sign Up
          </button>
          <div style={styles.demo}>
            <p><strong>Demo Accounts:</strong></p>
            <p>admin@test.com / admin123</p>
            <p>editor@test.com / editor123</p>
            <p>viewer@test.com / viewer123</p>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Page
  if (view === 'signup') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Sign Up</h1>
          {error && <div style={styles.error}>{error}</div>}
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            data-testid="signup-name"
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            data-testid="signup-email"
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password (min 6 characters)"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            data-testid="signup-password"
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={signupConfirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
            data-testid="signup-confirm-password"
          />
          <select
            style={styles.input}
            value={signupRole}
            onChange={(e) => setSignupRole(e.target.value as 'admin' | 'editor' | 'viewer')}
            data-testid="signup-role"
          >
            <option value="viewer">Viewer (Read Only)</option>
            <option value="editor">Editor (Read/Write)</option>
            <option value="admin">Admin (Full Access)</option>
          </select>
          <button 
            style={styles.button} 
            onClick={handleSignUp}
            data-testid="signup-btn"
          >
            Create Account
          </button>
          <div style={styles.divider}>
            <span>Already have an account?</span>
          </div>
          <button 
            style={{...styles.button, ...styles.secondaryButton}} 
            onClick={() => setView('login')}
            data-testid="goto-login-btn"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // MFA Page
  if (view === 'mfa') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Enter OTP</h1>
          <div style={styles.otpDemo}>Demo OTP: {tempOTP}</div>
          {error && <div style={styles.error}>{error}</div>}
          <input
            style={styles.input}
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            maxLength={6}
            data-testid="otp"
          />
          <button style={styles.button} onClick={handleVerify} data-testid="verify-btn">
            Verify
          </button>
          <button 
            style={{...styles.button, ...styles.secondaryButton}} 
            onClick={() => setView('login')}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Dashboard
  if (view === 'dashboard' && user) {
    const canEdit = user.role === 'admin' || user.role === 'editor';

    return (
      <div style={styles.container}>
        <div style={styles.nav}>
          <h2>Dashboard</h2>
          <div>
            <span style={styles.userInfo}>
              {user.name} ({user.role})
            </span>
            <button 
              style={{...styles.button, ...styles.logoutButton}} 
              onClick={handleLogout}
              data-testid="logout-btn"
            >
              Logout
            </button>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.accessCard}>
            <h3>Access Level: {user.role.toUpperCase()}</h3>
            <p>{canEdit ? '✅ Can Edit Documents' : '👁️ View Only'}</p>
          </div>

          <div style={styles.documentsCard}>
            <h3>Documents</h3>
            {['Report Q4', 'Budget 2025', 'Strategy Doc'].map((doc, i) => (
              <div key={i} style={styles.docItem}>
                <span>{doc}</span>
                {canEdit ? (
                  <button 
                    style={styles.editButton} 
                    data-testid={`edit-${i}`}
                    onClick={() => alert(`Editing: ${doc}`)}
                  >
                    Edit
                  </button>
                ) : (
                  <button 
                    style={styles.disabledButton} 
                    disabled
                    data-testid={`view-only-${i}`}
                  >
                    View Only
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Simple inline styles (no Tailwind needed)
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '8px',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  error: {
    padding: '10px',
    backgroundColor: '#fee',
    color: '#c33',
    borderRadius: '4px',
    marginBottom: '12px',
    fontSize: '14px',
  },
  demo: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    fontSize: '12px',
  },
  divider: {
    textAlign: 'center' as const,
    margin: '16px 0',
    color: '#666',
    fontSize: '14px',
  },
  otpDemo: {
    padding: '10px',
    backgroundColor: '#e7f3ff',
    borderRadius: '4px',
    marginBottom: '12px',
    textAlign: 'center' as const,
    fontWeight: 'bold' as const,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  content: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  userInfo: {
    marginRight: '15px',
    fontWeight: 'bold' as const,
  },
  logoutButton: {
    width: 'auto',
    padding: '8px 16px',
    display: 'inline-block',
  },
  accessCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  documentsCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  docItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  disabledButton: {
    padding: '8px 16px',
    backgroundColor: '#ccc',
    color: '#666',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
  },
};

export default App;