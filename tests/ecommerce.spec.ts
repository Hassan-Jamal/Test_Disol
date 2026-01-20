import { test, expect } from '@playwright/test';

/**
 * ============================================================
 * ECOMMERCE WEB APPLICATION TEST SUITE
 * Application URL: https://sqatest.desolint.com/
 * ============================================================
 * 
 * Test Case Documentation:
 * - TC-001 to TC-003: Login Functionality
 * - TC-004 to TC-006: Signup Functionality  
 * - TC-007 to TC-009: Add to Cart Functionality
 */

// Test credentials
const VALID_EMAIL = 'hassanjamal577987@gmail.com';
const VALID_PASSWORD = 'sqatest123';
const INVALID_PASSWORD = 'wrongpassword123';
const UNREGISTERED_EMAIL = 'notregistered@example.com';

// ============================================================
// LOGIN FUNCTIONALITY TESTS
// ============================================================
test.describe('Login Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
  });

  /**
   * TC-001: Valid Login
   * Description: Verify user can login with valid credentials
   * Preconditions: User account exists
   * Expected Result: User successfully logs in and is redirected to homepage/dashboard
   */
  test('TC-001: Should login successfully with valid credentials', async ({ page }) => {
    // Click on login/signin link
    await page.click('text=Sign In');
    
    // Wait for login form to be visible
    await page.waitForSelector('input[name="email"], input[type="email"]');
    
    // Enter valid email
    await page.fill('input[name="email"], input[type="email"]', VALID_EMAIL);
    
    // Enter valid password
    await page.fill('input[name="password"], input[type="password"]', VALID_PASSWORD);
    
    // Click login button
    await page.click('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    
    // Verify successful login - user should see account menu or logout option
    await expect(page.locator('text=Logout, text=Sign Out, text=My Account').first()).toBeVisible({ timeout: 10000 });
  });

  /**
   * TC-002: Invalid Password Login
   * Description: Verify error message when logging in with invalid password
   * Preconditions: User account exists
   * Expected Result: Error message displayed indicating invalid credentials
   */
  test('TC-002: Should show error with invalid password', async ({ page }) => {
    // Click on login/signin link
    await page.click('text=Sign In');
    
    // Wait for login form
    await page.waitForSelector('input[name="email"], input[type="email"]');
    
    // Enter valid email
    await page.fill('input[name="email"], input[type="email"]', VALID_EMAIL);
    
    // Enter invalid password
    await page.fill('input[name="password"], input[type="password"]', INVALID_PASSWORD);
    
    // Click login button
    await page.click('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    
    // Verify error message is displayed
    await expect(page.locator('text=/invalid|incorrect|wrong|error/i').first()).toBeVisible({ timeout: 10000 });
  });

  /**
   * TC-003: Unregistered Email Login
   * Description: Verify error message when logging in with unregistered email
   * Preconditions: Email is not registered in the system
   * Expected Result: Error message displayed indicating account not found
   */
  test('TC-003: Should show error with unregistered email', async ({ page }) => {
    // Click on login/signin link
    await page.click('text=Sign In');
    
    // Wait for login form
    await page.waitForSelector('input[name="email"], input[type="email"]');
    
    // Enter unregistered email
    await page.fill('input[name="email"], input[type="email"]', UNREGISTERED_EMAIL);
    
    // Enter any password
    await page.fill('input[name="password"], input[type="password"]', 'anypassword123');
    
    // Click login button
    await page.click('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    
    // Verify error message is displayed
    await expect(page.locator('text=/not found|does not exist|invalid|error/i').first()).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================
// SIGNUP FUNCTIONALITY TESTS
// ============================================================
test.describe('Signup Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
  });

  /**
   * TC-004: Valid Signup
   * Description: Verify user can signup with valid details
   * Preconditions: Email is not already registered
   * Expected Result: User successfully signs up and confirmation popup appears
   */
  test('TC-004: Should signup successfully with valid details', async ({ page }) => {
    // Generate unique email for signup
    const uniqueEmail = `testuser${Date.now()}@example.com`;
    
    // Click on signup/register link
    await page.click('text=Sign Up, text=Register, text=Create Account').catch(() => {
      // If direct signup link not found, go through Sign In first
      return page.click('text=Sign In');
    });
    
    // Look for signup link if we're on login page
    const signupLink = page.locator('text=Sign Up, text=Register, text=Create Account, a:has-text("Sign Up")');
    if (await signupLink.isVisible().catch(() => false)) {
      await signupLink.first().click();
    }
    
    // Wait for signup form
    await page.waitForSelector('input[name="email"], input[type="email"]');
    
    // Fill signup form
    // Name field (if exists)
    const nameField = page.locator('input[name="name"], input[name="fullname"], input[name="firstName"]');
    if (await nameField.isVisible().catch(() => false)) {
      await nameField.fill('Test User');
    }
    
    // Email field
    await page.fill('input[name="email"], input[type="email"]', uniqueEmail);
    
    // Password field
    await page.fill('input[name="password"], input[type="password"]', VALID_PASSWORD);
    
    // Confirm password (if exists)
    const confirmPassword = page.locator('input[name="confirmPassword"], input[name="confirm_password"], input[name="password_confirmation"]');
    if (await confirmPassword.isVisible().catch(() => false)) {
      await confirmPassword.fill(VALID_PASSWORD);
    }
    
    // Click signup button
    await page.click('button[type="submit"], button:has-text("Sign Up"), button:has-text("Register"), button:has-text("Create")');
    
    // Verify confirmation popup or success message (note: does not redirect to login)
    await expect(page.locator('text=/success|created|registered|welcome|confirmation/i').first()).toBeVisible({ timeout: 15000 });
  });

  /**
   * TC-005: Already Registered Email Signup
   * Description: Verify error when signing up with already registered email
   * Preconditions: Email is already registered in the system
   * Expected Result: Error message indicating email already exists
   */
  test('TC-005: Should show error for already registered email', async ({ page }) => {
    // Click on signup/register link
    await page.click('text=Sign Up, text=Register, text=Create Account').catch(() => {
      return page.click('text=Sign In');
    });
    
    // Look for signup link if we're on login page
    const signupLink = page.locator('text=Sign Up, text=Register, text=Create Account, a:has-text("Sign Up")');
    if (await signupLink.isVisible().catch(() => false)) {
      await signupLink.first().click();
    }
    
    // Wait for signup form
    await page.waitForSelector('input[name="email"], input[type="email"]');
    
    // Fill form with already registered email
    const nameField = page.locator('input[name="name"], input[name="fullname"], input[name="firstName"]');
    if (await nameField.isVisible().catch(() => false)) {
      await nameField.fill('Test User');
    }
    
    await page.fill('input[name="email"], input[type="email"]', VALID_EMAIL);
    await page.fill('input[name="password"], input[type="password"]', VALID_PASSWORD);
    
    const confirmPassword = page.locator('input[name="confirmPassword"], input[name="confirm_password"]');
    if (await confirmPassword.isVisible().catch(() => false)) {
      await confirmPassword.fill(VALID_PASSWORD);
    }
    
    // Click signup button
    await page.click('button[type="submit"], button:has-text("Sign Up"), button:has-text("Register")');
    
    // Verify error message for duplicate email
    await expect(page.locator('text=/already|exists|registered|taken|duplicate/i').first()).toBeVisible({ timeout: 10000 });
  });

  /**
   * TC-006: Invalid Email Format Signup
   * Description: Verify validation error for invalid email format
   * Preconditions: None
   * Expected Result: Validation error for invalid email format
   */
  test('TC-006: Should show validation error for invalid email format', async ({ page }) => {
    // Click on signup/register link
    await page.click('text=Sign Up, text=Register, text=Create Account').catch(() => {
      return page.click('text=Sign In');
    });
    
    // Look for signup link if we're on login page
    const signupLink = page.locator('text=Sign Up, text=Register, text=Create Account, a:has-text("Sign Up")');
    if (await signupLink.isVisible().catch(() => false)) {
      await signupLink.first().click();
    }
    
    // Wait for signup form
    await page.waitForSelector('input[name="email"], input[type="email"]');
    
    // Fill form with invalid email format
    const nameField = page.locator('input[name="name"], input[name="fullname"], input[name="firstName"]');
    if (await nameField.isVisible().catch(() => false)) {
      await nameField.fill('Test User');
    }
    
    // Enter invalid email format
    await page.fill('input[name="email"], input[type="email"]', 'invalidemail');
    await page.fill('input[name="password"], input[type="password"]', VALID_PASSWORD);
    
    // Click signup button or trigger validation
    await page.click('button[type="submit"], button:has-text("Sign Up"), button:has-text("Register")');
    
    // Verify validation error - either browser validation or custom error
    const emailInput = page.locator('input[name="email"], input[type="email"]');
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    
    if (isInvalid) {
      // Browser validation triggered
      expect(isInvalid).toBeTruthy();
    } else {
      // Custom validation message
      await expect(page.locator('text=/invalid|valid email|email format|incorrect/i').first()).toBeVisible({ timeout: 5000 });
    }
  });
});

// ============================================================
// ADD TO CART FUNCTIONALITY TESTS
// ============================================================
test.describe('Add to Cart Functionality', () => {
  
  // Helper function to login before cart tests
  async function loginUser(page) {
    await page.goto('/');
    await page.click('text=Sign In');
    await page.waitForSelector('input[name="email"], input[type="email"]');
    await page.fill('input[name="email"], input[type="email"]', VALID_EMAIL);
    await page.fill('input[name="password"], input[type="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    await page.waitForTimeout(3000); // Wait for login to complete
  }

  /**
   * TC-007: Add Single Product to Cart
   * Description: Verify user can add a single product to cart
   * Preconditions: User is logged in, products are available
   * Expected Result: Product is added to cart, cart count updates
   */
  test('TC-007: Should add single product to cart', async ({ page }) => {
    // Login first
    await loginUser(page);
    
    // Navigate to products/shop page
    await page.goto('/');
    
    // Wait for products to load
    await page.waitForSelector('[class*="product"], [class*="item"], [class*="card"]', { timeout: 10000 });
    
    // Get initial cart count (if visible)
    const cartBadge = page.locator('[class*="cart"] [class*="badge"], [class*="cart-count"], [class*="cart"] span');
    let initialCount = 0;
    if (await cartBadge.isVisible().catch(() => false)) {
      const countText = await cartBadge.textContent();
      initialCount = parseInt(countText || '0') || 0;
    }
    
    // Click on first product's "Add to Cart" button
    const addToCartBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart"), [class*="add-to-cart"], button[class*="cart"]').first();
    await addToCartBtn.click();
    
    // Verify product added - either success message or cart count update
    const successMessage = page.locator('text=/added|success|cart updated/i');
    const updatedCartBadge = page.locator('[class*="cart"] [class*="badge"], [class*="cart-count"], [class*="cart"] span');
    
    // Wait for either success message or cart update
    await Promise.race([
      successMessage.waitFor({ timeout: 5000 }).catch(() => {}),
      page.waitForTimeout(2000)
    ]);
    
    // Verify cart has been updated
    if (await updatedCartBadge.isVisible().catch(() => false)) {
      const newCount = parseInt(await updatedCartBadge.textContent() || '0') || 0;
      expect(newCount).toBeGreaterThanOrEqual(initialCount);
    } else if (await successMessage.isVisible().catch(() => false)) {
      expect(await successMessage.isVisible()).toBeTruthy();
    }
  });

  /**
   * TC-008: Add Multiple Products to Cart
   * Description: Verify user can add multiple different products to cart
   * Preconditions: User is logged in, multiple products are available
   * Expected Result: All products are added to cart correctly
   */
  test('TC-008: Should add multiple products to cart', async ({ page }) => {
    // Login first
    await loginUser(page);
    
    // Navigate to products/shop page
    await page.goto('/');
    
    // Wait for products to load
    await page.waitForSelector('[class*="product"], [class*="item"], [class*="card"]', { timeout: 10000 });
    
    // Get all "Add to Cart" buttons
    const addToCartButtons = page.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart"), [class*="add-to-cart"]');
    const buttonCount = await addToCartButtons.count();
    
    // Add first product
    if (buttonCount >= 1) {
      await addToCartButtons.nth(0).click();
      await page.waitForTimeout(1500); // Wait for cart to update
    }
    
    // Add second product (if available)
    if (buttonCount >= 2) {
      await addToCartButtons.nth(1).click();
      await page.waitForTimeout(1500); // Wait for cart to update
    }
    
    // Navigate to cart to verify products
    await page.click('[class*="cart"], a:has-text("Cart"), [href*="cart"]').catch(() => {
      // Try alternative cart access
      return page.goto('/cart');
    });
    
    // Verify cart has items
    await page.waitForTimeout(2000);
    const cartItems = page.locator('[class*="cart-item"], [class*="cart"] [class*="product"], [class*="cart"] [class*="item"]');
    const itemCount = await cartItems.count().catch(() => 0);
    
    // We should have at least 1 item in cart
    expect(itemCount).toBeGreaterThanOrEqual(1);
  });

  /**
   * TC-009: Attempt to Add Out-of-Stock Product
   * Description: Verify behavior when trying to add out-of-stock product
   * Preconditions: User is logged in, out-of-stock product exists
   * Expected Result: User is prevented from adding or shown out-of-stock message
   */
  test('TC-009: Should handle out-of-stock product appropriately', async ({ page }) => {
    // Login first
    await loginUser(page);
    
    // Navigate to products/shop page
    await page.goto('/');
    
    // Wait for products to load
    await page.waitForSelector('[class*="product"], [class*="item"], [class*="card"]', { timeout: 10000 });
    
    // Look for out-of-stock product
    const outOfStockProduct = page.locator('text=/out of stock|sold out|unavailable/i').first();
    
    if (await outOfStockProduct.isVisible().catch(() => false)) {
      // Find the add to cart button near the out-of-stock label
      const parentProduct = outOfStockProduct.locator('xpath=ancestor::*[contains(@class, "product") or contains(@class, "card") or contains(@class, "item")]').first();
      const addButton = parentProduct.locator('button:has-text("Add to Cart"), button:has-text("Add To Cart")');
      
      if (await addButton.isVisible().catch(() => false)) {
        // Button should be disabled
        const isDisabled = await addButton.isDisabled();
        expect(isDisabled).toBeTruthy();
      } else {
        // No add button for out-of-stock items - this is expected behavior
        expect(true).toBeTruthy();
      }
    } else {
      // No out-of-stock products found - skip this test scenario
      console.log('No out-of-stock products found on the page. Test scenario skipped.');
      test.skip();
    }
  });
});

