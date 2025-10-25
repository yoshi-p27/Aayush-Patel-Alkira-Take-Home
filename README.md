# Login + MFA Take-Home Exercise

A React application demonstrating login flow with Multi-Factor Authentication (MFA) and role-based access control.

## Features

- 🔐 User login with email/password validation
- 📱 Multi-Factor Authentication (OTP)
- ✍️ User sign-up flow with role selection
- 🛡️ Role-based access control (Admin, Editor, Viewer)
- ✅ Comprehensive form validation
- 🎨 Clean, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd alkira-take-home
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the app for production:

```bash
npm run build
```

## Running Cypress Tests

### Prerequisites for Testing

Ensure Cypress is installed:

```bash
npm install cypress --save-dev
```

### Run Tests

#### Interactive Mode (Cypress Test Runner)

Open Cypress Test Runner to run tests interactively:

```bash
npx cypress open
```

Then:
1. Click on "E2E Testing"
2. Select your preferred browser
3. Click on `auth.cy.ts` to run the authentication tests

#### Headless Mode (CI/CD)

Run all tests in headless mode:

```bash
npx cypress run
```

Run specific test file:

```bash
npx cypress run --spec "cypress/e2e/auth.cy.ts"
```

### Important: Running Tests

**Make sure the development server is running before executing tests:**

```bash
# Terminal 1
npm start

# Terminal 2 (in a new terminal)
npx cypress open
# or
npx cypress run
```

## Demo Accounts

Use these pre-configured accounts to test the application:

| Email | Password | Role | Permissions |
|-------|----------|------|-------------|
| admin@test.com | admin123 | Admin | Full access, can edit documents |
| editor@test.com | editor123 | Editor | Can edit documents |
| viewer@test.com | viewer123 | Viewer | Read-only access |

**Demo OTP:** `123456` (displayed on MFA screen)

## User Flows

### Login Flow
1. Enter email and password
2. Click "Login"
3. Enter OTP code (123456)
4. Access dashboard based on role

### Sign-Up Flow
1. Click "Sign Up" from login page
2. Enter full name, email, password, and confirm password
3. Select desired role (Viewer, Editor, or Admin)
4. Click "Create Account"
5. Enter OTP code (123456)
6. Access dashboard with selected role

### Access Control
- **Viewer**: Can view documents only
- **Editor**: Can view and edit documents
- **Admin**: Full access to view and edit documents

## Project Structure

```
alkira-take-home/
├── cypress/
│   └── e2e/
│       └── auth.cy.ts          # Cypress test suite
├── public/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── App.test.tsx
│   ├── index.tsx
│   └── ...
├── cypress.config.ts
├── package.json
└── README.md
```

## Technical Implementation

### Authentication
- Mock authentication service with in-memory user database
- Email and password validation
- OTP-based multi-factor authentication

### Validation
- Email format validation using regex
- Password minimum length (6 characters)
- Password confirmation matching
- Duplicate email detection during sign-up
- Required field validation

### Error Handling
- Clear error messages for validation failures
- Invalid credentials handling
- Duplicate account detection
- Invalid OTP handling

### Access Control
- Role-based permissions (Admin, Editor, Viewer)
- Conditional rendering based on user role
- Edit button visibility based on permissions

## Test Coverage

The Cypress test suite (`cypress/e2e/auth.cy.ts`) includes tests for:
- Successful login flow with MFA
- Sign-up flow with validation
- Invalid credentials handling
- Email format validation
- Password validation
- OTP verification
- Role-based access control
- Logout functionality

## Technologies Used

- **React** (TypeScript)
- **Cypress** (E2E Testing)
- **Mock Authentication** (No external dependencies)
- Inline CSS (No UI framework dependencies)

## Development Notes

- No database required - uses in-memory mock data
- No external authentication service - fully self-contained
- All state managed with React hooks
- Test-friendly with data-testid attributes on all interactive elements

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm test` | Run Jest unit tests |
| `npm run build` | Create production build |
| `npx cypress open` | Open Cypress Test Runner |
| `npx cypress run` | Run Cypress tests headless |

## Troubleshooting

### Cypress Tests Not Running
- Ensure the development server is running on `http://localhost:3000`
- Check that Cypress is installed: `npm install cypress --save-dev`
- Clear Cypress cache: `npx cypress cache clear`

### Application Not Starting
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v14+)

## License

This project was created as a take-home exercise.
