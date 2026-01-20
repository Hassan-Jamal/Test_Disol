# Bug Report Template - Ecommerce Web Application

**Application URL:** https://sqatest.desolint.com/  
**Reporter:** Hassan-Jamal (hassanjamal6577987@gmail.com)

---

## Bug Report Format

Use the following template to report any bugs discovered during testing:

---

### BUG-XXX: [Bug Title]

| Field | Description |
|-------|-------------|
| **Bug ID** | BUG-XXX |
| **Title** | Brief description of the bug |
| **Severity** | Critical / High / Medium / Low |
| **Priority** | P1 / P2 / P3 / P4 |
| **Environment** | Browser, OS, Screen Resolution |
| **Related Test Case** | TC-XXX |
| **Date Reported** | YYYY-MM-DD |

#### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

#### Expected Behavior
Describe what should happen.

#### Actual Behavior
Describe what actually happens.

#### Screenshots/Evidence
Attach screenshots or screen recordings if applicable.

#### Additional Notes
Any other relevant information.

---

## Reported Bugs

<!-- Add bugs below as they are discovered -->

### BUG-001: [Example] Signup confirmation does not redirect to login page

| Field | Description |
|-------|-------------|
| **Bug ID** | BUG-001 |
| **Title** | After successful signup, user is not redirected to login page |
| **Severity** | Low |
| **Priority** | P3 |
| **Environment** | Chrome 120, macOS |
| **Related Test Case** | TC-004 |
| **Date Reported** | 2026-01-20 |

#### Steps to Reproduce
1. Navigate to the application
2. Click on "Sign Up"
3. Fill in valid registration details
4. Click "Sign Up" button
5. Observe the confirmation popup

#### Expected Behavior
After successful signup and confirmation popup, user should be automatically redirected to the login page.

#### Actual Behavior
After signup confirmation popup appears, the user remains on the same page and is NOT redirected to the login screen.

#### Screenshots/Evidence
N/A

#### Additional Notes
User must manually navigate to the login page after registration.

---

<!-- Add more bugs as discovered during test execution -->

