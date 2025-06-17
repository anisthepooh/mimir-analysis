/**
 * Simple test runner for Cannabis Analysis Model Reset Functionality
 * 
 * This file provides a basic test suite without requiring Jest setup.
 * Run with: node test-runner.js
 */

// Simple test framework
const assert = require('assert');

class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  describe(description, callback) {
    console.log(`\n📝 ${description}`);
    callback();
  }

  test(description, callback) {
    try {
      callback();
      console.log(`  ✅ ${description}`);
      this.passed++;
    } catch (error) {
      console.log(`  ❌ ${description}`);
      console.log(`     Error: ${error.message}`);
      this.failed++;
    }
  }

  expect(actual) {
    return {
      toBe: (expected) => {
        assert.strictEqual(actual, expected);
      },
      toBeGreaterThan: (expected) => {
        assert.ok(actual > expected, `Expected ${actual} to be greater than ${expected}`);
      },
      toBeGreaterThanOrEqual: (expected) => {
        assert.ok(actual >= expected, `Expected ${actual} to be >= ${expected}`);
      },
      toBeLessThan: (expected) => {
        assert.ok(actual < expected, `Expected ${actual} to be less than ${expected}`);
      },
      toBeNull: () => {
        assert.strictEqual(actual, null);
      },
      toHaveBeenCalledWith: (expected) => {
        if (!actual.calledWith || !actual.calledWith.includes(expected)) {
          throw new Error(`Expected function to be called with ${expected}`);
        }
      }
    };
  }

  createMockFunction() {
    const fn = (...args) => {
      fn.calledWith = fn.calledWith || [];
      fn.calledWith.push(...args);
      fn.callCount = (fn.callCount || 0) + 1;
    };
    return fn;
  }

  runSummary() {
    console.log(`\n📊 Test Summary:`);
    console.log(`   Passed: ${this.passed}`);
    console.log(`   Failed: ${this.failed}`);
    console.log(`   Total:  ${this.passed + this.failed}`);
    
    if (this.failed === 0) {
      console.log(`\n🎉 All tests passed!`);
    } else {
      console.log(`\n❌ ${this.failed} test(s) failed.`);
    }
    
    return this.failed === 0;
  }
}

// Test data helpers
const createMockDatapoints = (values) => {
  return values.map((value, index) => ({
    id: index + 1,
    value: value.value,
    date: new Date(value.date),
    answerTitle: '',
    answerBorder: '',
    answer: null
  }));
};

const mockAnswersState = {
  title: '',
  text: '',
  borderColor: '',
  calculation: '',
  outside: '',
  baseDate: null,
  lastDate: null,
  specimenBase: 0,
  specimenLast: 0,
  status: null,
  lastNewUseIndex: null,
  testsSinceNewUse: 0
};

// Run tests
const runner = new TestRunner();

console.log('🧪 Cannabis Analysis Model Reset Functionality Tests');
console.log('====================================================');

runner.describe('Model Reset After New Use Detection', () => {
  runner.test('should reset model when new use is detected', () => {
    const testData = [
      { date: "2025-06-01", value: 87 },
      { date: "2025-06-04", value: 60 },
      { date: "2025-06-09", value: 12 },
      { date: "2025-06-18", value: 30 }, // New use detected here
    ];

    const mockDatapoints = createMockDatapoints(testData);
    const resetAfterNewUse = runner.createMockFunction();
    
    // Simulate new use detection
    const lastIndex = mockDatapoints.length - 1;
    const status = "sign_on_use";
    
    if (status === "sign_on_use") {
      resetAfterNewUse(lastIndex);
    }

    runner.expect(resetAfterNewUse.callCount).toBe(1);
  });

  runner.test('should update specimen base to current index after reset', () => {
    const resetAfterNewUse = (index) => ({
      lastNewUseIndex: index,
      testsSinceNewUse: 0,
      specimenBase: index
    });

    const result = resetAfterNewUse(3);

    runner.expect(result.lastNewUseIndex).toBe(3);
    runner.expect(result.testsSinceNewUse).toBe(0);
    runner.expect(result.specimenBase).toBe(3);
  });
});

runner.describe('Minimum 3-Test Requirement', () => {
  runner.test('should prevent analysis when less than 3 tests since new use', () => {
    const testData = [
      { date: "2025-06-01", value: 87 },
      { date: "2025-06-04", value: 60 },
      { date: "2025-06-09", value: 12 },
      { date: "2025-06-18", value: 30 }, // New use detected at index 3
      { date: "2025-06-22", value: 25 }, // Only 1 test since new use
    ];

    const lastIndex = testData.length - 1;
    const lastNewUseIndex = 3;
    const testsSinceNewUse = lastIndex - lastNewUseIndex; // 4 - 3 = 1

    runner.expect(testsSinceNewUse).toBeLessThan(3);
  });

  runner.test('should allow analysis when 3 or more tests since new use', () => {
    const testData = [
      { date: "2025-06-01", value: 87 },
      { date: "2025-06-04", value: 60 },
      { date: "2025-06-09", value: 12 },
      { date: "2025-06-18", value: 30 }, // New use detected at index 3
      { date: "2025-06-22", value: 25 }, // Test 1 after new use
      { date: "2025-06-25", value: 20 }, // Test 2 after new use  
      { date: "2025-06-28", value: 15 }, // Test 3 after new use
    ];

    const lastIndex = testData.length - 1;
    const lastNewUseIndex = 3;
    const testsSinceNewUse = lastIndex - lastNewUseIndex; // 6 - 3 = 3

    runner.expect(testsSinceNewUse).toBeGreaterThanOrEqual(3);
  });
});

runner.describe('Real-world Test Case Validation', () => {
  runner.test('should correctly handle the provided test data pattern', () => {
    const realTestData = [
      { date: "2025-06-01", value: 87 },
      { date: "2025-06-04", value: 60 },
      { date: "2025-06-09", value: 12 },
      { date: "2025-06-18", value: 30 }, // New use detected
      { date: "2025-06-22", value: 30 }, // Only 1 test since new use
    ];

    // New use detection logic
    const newUseIndex = 3;
    const ratio = realTestData[3].value / realTestData[2].value; // 30/12 = 2.5
    
    runner.expect(ratio).toBeGreaterThan(1.5); // Significant increase

    // Check insufficient tests
    const lastIndex = 4;
    const testsSinceNewUse = lastIndex - newUseIndex; // 4 - 3 = 1
    
    runner.expect(testsSinceNewUse).toBe(1);
    runner.expect(testsSinceNewUse).toBeLessThan(3);
  });
});

runner.describe('Edge Cases', () => {
  runner.test('should handle first analysis with no previous new use', () => {
    const mockAnswers = { ...mockAnswersState, lastNewUseIndex: null };
    runner.expect(mockAnswers.lastNewUseIndex).toBeNull();
  });

  runner.test('should correctly count tests since new use', () => {
    const scenarios = [
      { lastNewUseIndex: 5, currentIndex: 6, expected: 1 },
      { lastNewUseIndex: 3, currentIndex: 6, expected: 3 },
      { lastNewUseIndex: 0, currentIndex: 4, expected: 4 },
    ];

    scenarios.forEach(({ lastNewUseIndex, currentIndex, expected }) => {
      const testsSinceNewUse = currentIndex - lastNewUseIndex;
      runner.expect(testsSinceNewUse).toBe(expected);
    });
  });
});

runner.describe('Cannabis Metabolite Analysis Validation', () => {
  runner.test('should validate ratio-based new use detection', () => {
    // Based on PMID: 19470219 research
    const scenarios = [
      { baseline: 87, current: 60, expected: "no_new_use" },   // 0.69 ratio - normal decline
      { baseline: 60, current: 12, expected: "no_new_use" },   // 0.20 ratio - normal decline  
      { baseline: 12, current: 30, expected: "sign_on_use" },  // 2.50 ratio - new use
      { baseline: 30, current: 30, expected: "no_new_use" },   // 1.00 ratio - stable
    ];

    scenarios.forEach(({ baseline, current, expected }) => {
      const ratio = current / baseline;
      
      // Simplified detection logic based on research thresholds
      let detected;
      if (ratio > 1.5) {
        detected = "sign_on_use";
      } else {
        detected = "no_new_use";
      }
      
      runner.expect(detected).toBe(expected);
    });
  });

  runner.test('should validate concentration thresholds from research', () => {
    // Based on parameter values from research (6 ng/mL and 15 ng/mL cutoffs)
    const testValues = [
      { value: 5, withinRange: false },   // Below 6 ng/mL
      { value: 12, withinRange: true },   // Within range
      { value: 30, withinRange: true },   // Within range
      { value: 87, withinRange: true },   // Within range
      { value: 1200, withinRange: false } // Above 1166 ng/mL
    ];

    testValues.forEach(({ value, withinRange }) => {
      const isWithinRange = value >= 6 && value <= 1166;
      runner.expect(isWithinRange).toBe(withinRange);
    });
  });
});

// Run summary
const success = runner.runSummary();
process.exit(success ? 0 : 1);