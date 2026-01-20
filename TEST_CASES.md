# Test Cases Document - Ecommerce Web Application

**Application URL:** https://sqatest.desolint.com/  
**Tester:** Hassan-Jamal (hassanjamal6577987@gmail.com)  
**Date:** January 20, 2026

---

## Login Functionality

### TC-001: Valid Login
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-001 |
| **Test Case Title** | Valid Login with Correct Credentials |
| **Description** | Verify that a user can successfully login with valid email and password |
| **Preconditions** | User account exists in the system |
| **Test Steps** | 1. Navigate to the application<br>2. Click on "Sign In" link<br>3. Enter valid email<br>4. Enter valid password<br>5. Click "Login/Sign In" button |
| **Expected Results** | User is logged in successfully and redirected to homepage/dashboard. Logout option becomes visible. |
| **Actual Results** | |
| **Pass/Fail** | |

---

### TC-002: Invalid Password Login
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-002 |
| **Test Case Title** | Login with Invalid Password |
| **Description** | Verify that appropriate error message is displayed when user enters wrong password |
| **Preconditions** | User account exists in the system |
| **Test Steps** | 1. Navigate to the application<br>2. Click on "Sign In" link<br>3. Enter valid email<br>4. Enter incorrect password<br>5. Click "Login/Sign In" button |
| **Expected Results** | Error message is displayed indicating invalid credentials. User remains on login page. |
| **Actual Results** | |
| **Pass/Fail** | |

---

### TC-003: Unregistered Email Login
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-003 |
| **Test Case Title** | Login with Unregistered Email |
| **Description** | Verify that appropriate error message is displayed when user tries to login with an email not registered in the system |
| **Preconditions** | Email is not registered in the system |
| **Test Steps** | 1. Navigate to the application<br>2. Click on "Sign In" link<br>3. Enter unregistered email<br>4. Enter any password<br>5. Click "Login/Sign In" button |
| **Expected Results** | Error message is displayed indicating account not found or invalid credentials. |
| **Actual Results** | |
| **Pass/Fail** | |

---

## Signup Functionality

### TC-004: Valid Signup
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-004 |
| **Test Case Title** | Successful Signup with Valid Details |
| **Description** | Verify that a new user can successfully create an account with valid details |
| **Preconditions** | Email is not already registered |
| **Test Steps** | 1. Navigate to the application<br>2. Click on "Sign Up" link<br>3. Enter valid name (if required)<br>4. Enter valid email<br>5. Enter valid password<br>6. Confirm password (if required)<br>7. Click "Sign Up/Register" button |
| **Expected Results** | User account is created successfully. Confirmation popup/message is displayed. (Note: Does not redirect to login screen) |
| **Actual Results** | |
| **Pass/Fail** | |

---

### TC-005: Already Registered Email Signup
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-005 |
| **Test Case Title** | Signup with Already Registered Email |
| **Description** | Verify that appropriate error is shown when user tries to signup with an email that already exists |
| **Preconditions** | Email is already registered in the system |
| **Test Steps** | 1. Navigate to the application<br>2. Click on "Sign Up" link<br>3. Enter name (if required)<br>4. Enter already registered email<br>5. Enter password<br>6. Click "Sign Up/Register" button |
| **Expected Results** | Error message is displayed indicating email already exists or is already registered. |
| **Actual Results** | |
| **Pass/Fail** | |

---

### TC-006: Invalid Email Format Signup
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-006 |
| **Test Case Title** | Signup with Invalid Email Format |
| **Description** | Verify that validation error is shown for invalid email format |
| **Preconditions** | None |
| **Test Steps** | 1. Navigate to the application<br>2. Click on "Sign Up" link<br>3. Enter name (if required)<br>4. Enter invalid email format (e.g., "invalidemail")<br>5. Enter password<br>6. Click "Sign Up/Register" button |
| **Expected Results** | Validation error is displayed indicating invalid email format. Form submission is prevented. |
| **Actual Results** | |
| **Pass/Fail** | |

---

## Add to Cart Functionality

### TC-007: Add Single Product to Cart
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-007 |
| **Test Case Title** | Add Single Product to Cart |
| **Description** | Verify that a logged-in user can add a single product to the shopping cart |
| **Preconditions** | User is logged in, Products are available on the page |
| **Test Steps** | 1. Login to the application<br>2. Navigate to products page<br>3. Click "Add to Cart" button on any product<br>4. Verify cart update |
| **Expected Results** | Product is added to cart. Cart count/badge updates to reflect the addition. Success message may be displayed. |
| **Actual Results** | |
| **Pass/Fail** | |

---

### TC-008: Add Multiple Products to Cart
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-008 |
| **Test Case Title** | Add Multiple Products to Cart |
| **Description** | Verify that a user can add multiple different products to the cart |
| **Preconditions** | User is logged in, Multiple products are available |
| **Test Steps** | 1. Login to the application<br>2. Navigate to products page<br>3. Click "Add to Cart" on first product<br>4. Click "Add to Cart" on second product<br>5. Navigate to cart page |
| **Expected Results** | Both products are visible in the cart. Cart displays correct items and quantities. |
| **Actual Results** | |
| **Pass/Fail** | |

---

### TC-009: Add Out-of-Stock Product to Cart
| Field | Description |
|-------|-------------|
| **Test Case ID** | TC-009 |
| **Test Case Title** | Attempt to Add Out-of-Stock Product |
| **Description** | Verify system behavior when user tries to add an out-of-stock product |
| **Preconditions** | User is logged in, Out-of-stock product exists |
| **Test Steps** | 1. Login to the application<br>2. Navigate to products page<br>3. Locate an out-of-stock product<br>4. Attempt to add it to cart |
| **Expected Results** | "Add to Cart" button should be disabled or hidden for out-of-stock items. If clicked, appropriate message should be displayed. |
| **Actual Results** | |
| **Pass/Fail** | |

---

## Test Execution Summary

| Test Case ID | Title | Status | Notes |
|--------------|-------|--------|-------|
| TC-001 | Valid Login | | |
| TC-002 | Invalid Password Login | | |
| TC-003 | Unregistered Email Login | | |
| TC-004 | Valid Signup | | |
| TC-005 | Already Registered Email Signup | | |
| TC-006 | Invalid Email Format Signup | | |
| TC-007 | Add Single Product to Cart | | |
| TC-008 | Add Multiple Products to Cart | | |
| TC-009 | Add Out-of-Stock Product | | |

