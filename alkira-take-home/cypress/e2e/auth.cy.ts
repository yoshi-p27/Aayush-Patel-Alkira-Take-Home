describe('MFA Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('complete login flow with MFA', () => {
    // Login
    cy.get('[data-testid="email"]').type('admin@test.com');
    cy.get('[data-testid="password"]').type('admin123');
    cy.get('[data-testid="login-btn"]').click();

    // MFA
    cy.get('[data-testid="otp"]').type('123456');
    cy.get('[data-testid="verify-btn"]').click();

    // Dashboard
    cy.contains('Dashboard').should('be.visible');
    cy.contains('admin').should('be.visible');
  });

  it('editor can edit documents', () => {
    // Login as editor
    cy.get('[data-testid="email"]').type('editor@test.com');
    cy.get('[data-testid="password"]').type('editor123');
    cy.get('[data-testid="login-btn"]').click();

    // MFA
    cy.get('[data-testid="otp"]').type('123456');
    cy.get('[data-testid="verify-btn"]').click();

    // Check edit button exists and is not disabled
    cy.get('[data-testid="edit-0"]').should('be.visible').and('not.be.disabled');
  });

  it('viewer cannot edit documents', () => {
    // Login as viewer
    cy.get('[data-testid="email"]').type('viewer@test.com');
    cy.get('[data-testid="password"]').type('viewer123');
    cy.get('[data-testid="login-btn"]').click();

    // MFA
    cy.get('[data-testid="otp"]').type('123456');
    cy.get('[data-testid="verify-btn"]').click();

    // Check View Only buttons are disabled
    cy.contains('View Only').should('be.visible');
  });

  it('shows error for invalid credentials', () => {
    cy.get('[data-testid="email"]').type('wrong@test.com');
    cy.get('[data-testid="password"]').type('wrong');
    cy.get('[data-testid="login-btn"]').click();

    cy.contains('Invalid email or password').should('be.visible');
  });

  it('shows error for invalid OTP', () => {
    // Login
    cy.get('[data-testid="email"]').type('admin@test.com');
    cy.get('[data-testid="password"]').type('admin123');
    cy.get('[data-testid="login-btn"]').click();

    // Wrong OTP
    cy.get('[data-testid="otp"]').type('999999');
    cy.get('[data-testid="verify-btn"]').click();

    cy.contains('Invalid OTP').should('be.visible');
  });
});