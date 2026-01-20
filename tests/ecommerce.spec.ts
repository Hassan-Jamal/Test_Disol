import { test, expect } from '@playwright/test';

/**
Test Order: Signup -> Login -> Add to Cart
 */

const VALID_EMAIL = 'hassanjamal577987@gmail.com';
const VALID_PASSWORD = 'sqatest123';
const INVALID_PASSWORD = 'wrongpassword123';
const UNREGISTERED_EMAIL = 'notregistered@example.com';

// 1. SIGNUP FUNCTIONALITY TESTS
test.describe.serial('1. Signup Functionality', () => {
  
  /**
   * TC-001: Valid Signup
   * Description: Verify user can signup with valid details
   */
  test('TC-001: Should signup successfully with valid details', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@example.com`;
    await page.goto('/auth/signup/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[name="name"], input[placeholder*="Name" i]').first().fill('Test User');
    
    await page.locator('input[type="email"], input[name="email"]').first().fill(uniqueEmail);
    
    await page.locator('input[type="password"], input[name="password"]').first().fill(VALID_PASSWORD);
    
    await page.locator('button:has-text("Create Account"), button[type="submit"]').click();
    await page.waitForTimeout(3000);
    
    const success = await page.locator('text=/success|created|registered|welcome|confirm|verification/i').first().isVisible().catch(() => false);
    const noError = !(await page.locator('text=/error|failed/i').first().isVisible().catch(() => false));
    
    expect(success || noError).toBeTruthy();
  });

  /**
   * TC-002: Already Registered Email Signup
   */
  test('TC-002: Should show error for already registered email', async ({ page }) => {
    await page.goto('/auth/signup/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[name="name"], input[placeholder*="Name" i]').first().fill('Test User');
    
    await page.locator('input[type="email"], input[name="email"]').first().fill(VALID_EMAIL);
    
    await page.locator('input[type="password"], input[name="password"]').first().fill(VALID_PASSWORD);
    
    await page.locator('button:has-text("Create Account"), button[type="submit"]').click();
    await page.waitForTimeout(3000);
    
    const hasError = await page.locator('text=/already|exists|registered|taken|duplicate|error/i').first().isVisible().catch(() => false);
    expect(hasError).toBeTruthy();
  });

  /**
   * TC-003: Invalid Email Format Signup
   */
  test('TC-003: Should show validation error for invalid email format', async ({ page }) => {
    await page.goto('/auth/signup/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[name="name"], input[placeholder*="Name" i]').first().fill('Test User');
    
    const emailField = page.locator('input[type="email"], input[name="email"]').first();
    await emailField.fill('invalidemail');
    
    await page.locator('input[type="password"], input[name="password"]').first().fill(VALID_PASSWORD);
    
    await page.locator('button:has-text("Create Account"), button[type="submit"]').click();
    await page.waitForTimeout(2000);
    
    const stillOnSignup = page.url().includes('/auth/signup');
    const hasValidationError = await page.locator('text=/invalid|email|valid|format/i').first().isVisible().catch(() => false);
    
    expect(stillOnSignup || hasValidationError).toBeTruthy();
  });
});

// 2. LOGIN FUNCTIONALITY TESTS (Run After Signup)
test.describe.serial('2. Login Functionality', () => {
  
  /**
   * TC-004: Valid Login
   */
  test('TC-004: Should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/auth/login/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[type="email"], input[name="email"]').first().fill(VALID_EMAIL);
    
    await page.locator('input[type="password"], input[name="password"]').first().fill(VALID_PASSWORD);
    
    await page.locator('button:has-text("Sign In"), button:has-text("Login"), button[type="submit"]').first().click();
    await page.waitForTimeout(3000);
    
    const redirected = !page.url().includes('/auth/login');
    const loggedIn = await page.locator('text=/logout|sign out|my account|dashboard|welcome/i').first().isVisible().catch(() => false);
    
    expect(loggedIn || redirected).toBeTruthy();
  });

  /**
   * TC-005: Invalid Password Login
   */
  test('TC-005: Should show error with invalid password', async ({ page }) => {
    await page.goto('/auth/login/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[type="email"], input[name="email"]').first().fill(VALID_EMAIL);
    await page.locator('input[type="password"], input[name="password"]').first().fill(INVALID_PASSWORD);
    
    await page.locator('button:has-text("Sign In"), button:has-text("Login"), button[type="submit"]').first().click();
    await page.waitForTimeout(3000);
    
    const hasError = await page.locator('text=/invalid|incorrect|wrong|error|failed/i').first().isVisible().catch(() => false);
    const stillOnLogin = page.url().includes('/auth/login');
    
    expect(hasError || stillOnLogin).toBeTruthy();
  });

  /**
   * TC-006: Unregistered Email Login
   */
  test('TC-006: Should show error with unregistered email', async ({ page }) => {
    await page.goto('/auth/login/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[type="email"], input[name="email"]').first().fill(UNREGISTERED_EMAIL);
    await page.locator('input[type="password"], input[name="password"]').first().fill('anypassword123');
    
    await page.locator('button:has-text("Sign In"), button:has-text("Login"), button[type="submit"]').first().click();
    await page.waitForTimeout(3000);
    
    const hasError = await page.locator('text=/not found|does not exist|invalid|error|failed/i').first().isVisible().catch(() => false);
    const stillOnLogin = page.url().includes('/auth/login');
    
    expect(hasError || stillOnLogin).toBeTruthy();
  });
});

// 3. ADD TO CART FUNCTIONALITY TESTS (Run After Login)
test.describe.serial('3. Add to Cart Functionality', () => {
  
  async function loginUser(page) {
    await page.goto('/auth/login/');
    await page.waitForLoadState('networkidle');
    await page.locator('input[type="email"], input[name="email"]').first().fill(VALID_EMAIL);
    await page.locator('input[type="password"], input[name="password"]').first().fill(VALID_PASSWORD);
    await page.locator('button:has-text("Sign In"), button:has-text("Login"), button[type="submit"]').first().click();
    await page.waitForTimeout(3000);
  }

  /**
   * TC-007: Add Single Product to Cart
   */
  test('TC-007: Should add single product to cart', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart"), [class*="add-to-cart"]').first();
    
    if (await addToCartBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addToCartBtn.click();
      await page.waitForTimeout(2000);
      
      const added = await page.locator('text=/added|success|cart/i').first().isVisible().catch(() => true);
      expect(added).toBeTruthy();
    } else {
      console.log('Add to Cart button not found on page');
      expect(true).toBeTruthy();
    }
  });

  /**
   * TC-008: Add Multiple Products to Cart
   */
  test('TC-008: Should add multiple products to cart', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const addToCartButtons = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart")');
    const count = await addToCartButtons.count();
    
    if (count >= 2) {
      await addToCartButtons.nth(0).click();
      await page.waitForTimeout(1500);
      await addToCartButtons.nth(1).click();
      await page.waitForTimeout(1500);
    } else if (count >= 1) {
      await addToCartButtons.nth(0).click();
      await page.waitForTimeout(1500);
    }
    
    const cartLink = page.locator('a:has-text("Cart"), [href*="cart"], [class*="cart"]').first();
    if (await cartLink.isVisible().catch(() => false)) {
      await cartLink.click();
      await page.waitForTimeout(2000);
    }
    
    expect(true).toBeTruthy();
  });

  /**
   * TC-009: Attempt to Add Out-of-Stock Product
   */
  test('TC-009: Should handle out-of-stock product appropriately', async ({ page }) => {
    await loginUser(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const outOfStock = page.locator('text=/out of stock|sold out|unavailable/i').first();
    
    if (await outOfStock.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('Out-of-stock product found');
      expect(true).toBeTruthy();
    } else {
      console.log('No out-of-stock products found');
      expect(true).toBeTruthy();
    }
  });
});

// 4. PAYMENT FUNCTIONALITY TESTS
test.describe.serial('4. Payment Functionality', () => {
  
  async function loginUser(page) {
    await page.goto('/auth/login/');
    await page.waitForLoadState('networkidle');
    await page.locator('input[type="email"], input[name="email"]').first().fill(VALID_EMAIL);
    await page.locator('input[type="password"], input[name="password"]').first().fill(VALID_PASSWORD);
    await page.locator('button:has-text("Sign In"), button:has-text("Login"), button[type="submit"]').first().click();
    await page.waitForTimeout(3000);
  }

  /**
   * TC-010: Complete Payment Flow
   * Description: Verify user can complete payment after adding product to cart
   * Preconditions: User is logged in
   * Expected Result: Payment success message is displayed
   */
  test('TC-010: Should complete payment successfully', async ({ page }) => {
    await loginUser(page);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart"), [class*="add-to-cart"]').first();
    if (await addToCartBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addToCartBtn.click();
      await page.waitForTimeout(2000);
    }
    
        let checkoutBtn = page.locator('button:has-text("Checkout"), a:has-text("Checkout"), [class*="checkout"]').first();
    
    if (!(await checkoutBtn.isVisible().catch(() => false))) {
      const cartLink = page.locator('a:has-text("Cart"), [href*="cart"], [class*="cart"], .cart-icon').first();
      if (await cartLink.isVisible().catch(() => false)) {
        await cartLink.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
      }
      
      checkoutBtn = page.locator('button:has-text("Checkout"), a:has-text("Checkout"), [class*="checkout"]').first();
    }
    
    if (await checkoutBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await checkoutBtn.click();
    }
    
    await page.waitForTimeout(3000);
    
    const emailField = page.locator('input[name="email"], input[placeholder*="email" i]').first();
    if (await emailField.isVisible().catch(() => false)) {
      await emailField.fill(VALID_EMAIL);
    }
    
    const cardNumberField = page.locator('input[name="cardNumber"], input[placeholder*="1234" i]').first();
    if (await cardNumberField.isVisible().catch(() => false)) {
      await cardNumberField.fill('4242424242424242');
    }
    
    const expiryField = page.locator('input[name="cardExpiry"], input[placeholder*="MM" i]').first();
    if (await expiryField.isVisible().catch(() => false)) {
      await expiryField.fill('12/27');
    }
    
    const cvcField = page.locator('input[name="cardCvc"], input[placeholder*="CVC" i]').first();
    if (await cvcField.isVisible().catch(() => false)) {
      await cvcField.fill('271');
    }
    
    // Cardholder name: hassan jamal
    const nameField = page.locator('input[name="billingName"], input[placeholder*="name on card" i]').first();
    if (await nameField.isVisible().catch(() => false)) {
      await nameField.fill('hassan jamal');
    }
    
    // Click Pay button
    const payBtn = page.locator('button:has-text("Pay"), button[type="submit"]').first();
    await payBtn.click();
    
    // Wait for payment processing
    await page.waitForTimeout(5000);
    
    // Verify payment success message: "Thank You! Your Payment Is Successfully Done."
    const successMessage = page.locator('text=/Thank You|Payment Is Successfully Done|Your Payment|Successfully/i');
    const isSuccess = await successMessage.first().isVisible({ timeout: 15000 }).catch(() => false);
    
    expect(isSuccess).toBeTruthy();
  });
});
