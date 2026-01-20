# Test_Disol - Ecommerce Web Application Test Suite

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
## Test Cases

| ID | Test Case | Functionality |
|----|-----------|---------------|
| TC-001 | Valid Signup | Signup |
| TC-002 | Already Registered Email | Signup |
| TC-003 | Invalid Email Format | Signup |
| TC-004 | Valid Login | Login |
| TC-005 | Invalid Password Login | Login |
| TC-006 | Unregistered Email Login | Login |
| TC-007 | Add Single Product | Add to Cart |
| TC-008 | Add Multiple Products | Add to Cart |
| TC-009 | Out-of-Stock Product | Add to Cart |
| TC-010 | Complete Payment Flow | Payment |
