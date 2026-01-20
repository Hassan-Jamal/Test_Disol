# Test_Disol - Ecommerce Web Application Test Suite

Playwright automated test suite for the ecommerce web application at https://sqatest.desolint.com/

**Author:** Hassan-Jamal (hassanjamal6577987@gmail.com)

## Features Tested

- ✅ **Login Functionality** - Valid/Invalid credentials, unregistered email
- ✅ **Signup Functionality** - Valid signup, duplicate email, invalid email format
- ✅ **Add to Cart Functionality** - Single product, multiple products, out-of-stock handling

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View test report
npm run report
```

## Project Structure

```
├── tests/
│   └── ecommerce.spec.ts    # All test cases
├── playwright.config.ts      # Playwright configuration
├── TEST_CASES.md            # Test case documentation
├── BUG_REPORT.md            # Bug report template
├── package.json
└── README.md
```

## Test Cases

| ID | Test Case | Functionality |
|----|-----------|---------------|
| TC-001 | Valid Login | Login |
| TC-002 | Invalid Password Login | Login |
| TC-003 | Unregistered Email Login | Login |
| TC-004 | Valid Signup | Signup |
| TC-005 | Already Registered Email | Signup |
| TC-006 | Invalid Email Format | Signup |
| TC-007 | Add Single Product | Add to Cart |
| TC-008 | Add Multiple Products | Add to Cart |
| TC-009 | Out-of-Stock Product | Add to Cart |

## Documentation

- **TEST_CASES.md** - Detailed test case documentation with steps and expected results
- **BUG_REPORT.md** - Template for reporting bugs discovered during testing
