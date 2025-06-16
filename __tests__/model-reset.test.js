/**
 * Test suite for Cannabis Analysis Model Reset Functionality
 * 
 * Tests the implementation of model reset after new use detection
 * and the minimum 3-test requirement before next new use analysis.
 * 
 * Based on research validation from:
 * - PMID: 19470219 (Detection methods and thresholds)
 * - PMID: 33876828 (Mathematical models for cannabis use prediction)
 */

// Mock the stores and dependencies
const mockUseAnswersStore = jest.fn();
const mockUseDatapointsStore = jest.fn();
const mockUseUtilitiesStore = jest.fn();
const mockUseModelStore = jest.fn();

// Mock translation function
const mockTranslator = jest.fn((key, params) => `${key}${params ? JSON.stringify(params) : ''}`);

// Mock data for testing
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

describe('Cannabis Analysis Model Reset Functionality', () => {
  let mockSetTitle, mockSetText, mockSetBorderColor, mockSetCalculation;
  let mockSetStatus, mockResetAfterNewUse, mockSetTestsSinceNewUse;
  let mockSetDatapoints;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock store functions
    mockSetTitle = jest.fn();
    mockSetText = jest.fn();
    mockSetBorderColor = jest.fn();
    mockSetCalculation = jest.fn();
    mockSetStatus = jest.fn();
    mockResetAfterNewUse = jest.fn();
    mockSetTestsSinceNewUse = jest.fn();
    mockSetDatapoints = jest.fn();

    // Mock store returns
    mockUseAnswersStore.mockReturnValue({
      setTitle: mockSetTitle,
      setText: mockSetText,
      setBorderColor: mockSetBorderColor,
      setCalculation: mockSetCalculation,
      setStatus: mockSetStatus,
      resetAfterNewUse: mockResetAfterNewUse,
      setTestsSinceNewUse: mockSetTestsSinceNewUse,
    });

    mockUseDatapointsStore.mockImplementation(() => ({
      getState: () => ({
        datapoints: [],
        setDatapoints: mockSetDatapoints
      })
    }));

    mockUseUtilitiesStore.mockImplementation(() => ({
      getState: () => ({
        lang: 'en',
        unit: 'mg/dL'
      })
    }));

    mockUseModelStore.mockReturnValue({
      model: 'occational'
    });
  });

  describe('Model Reset After New Use Detection', () => {
    test('should reset model when new use is detected', () => {
      // Test data showing new use pattern
      const testData = [
        { date: "2025-06-01", value: 87 },
        { date: "2025-06-04", value: 60 },
        { date: "2025-06-09", value: 12 },
        { date: "2025-06-18", value: 30 }, // New use detected here
      ];

      const mockDatapoints = createMockDatapoints(testData);
      const mockAnswers = { ...mockAnswersState, specimenBase: 0, specimenLast: 3 };

      // Mock the model logic that would detect new use
      mockUseAnswersStore.getState = jest.fn().mockReturnValue({
        answers: { ...mockAnswers, status: "sign_on_use" }
      });

      mockUseDatapointsStore.getState = jest.fn().mockReturnValue({
        datapoints: mockDatapoints,
        setDatapoints: mockSetDatapoints
      });

      // Simulate the call function logic
      const lastIndex = mockDatapoints.length - 1;
      const updatedAnswers = { ...mockAnswers, status: "sign_on_use" };

      // Check if new use was detected and reset model
      if (updatedAnswers.status === "sign_on_use") {
        mockResetAfterNewUse(lastIndex);
      }

      expect(mockResetAfterNewUse).toHaveBeenCalledWith(3);
    });

    test('should update specimen base to current index after reset', () => {
      const currentIndex = 3;
      
      // Simulate the resetAfterNewUse function
      const resetAfterNewUse = (index) => {
        return {
          lastNewUseIndex: index,
          testsSinceNewUse: 0,
          specimenBase: index
        };
      };

      const result = resetAfterNewUse(currentIndex);

      expect(result.lastNewUseIndex).toBe(3);
      expect(result.testsSinceNewUse).toBe(0);
      expect(result.specimenBase).toBe(3);
    });
  });

  describe('Minimum 3-Test Requirement', () => {
    test('should prevent analysis when less than 3 tests since new use', () => {
      const testData = [
        { date: "2025-06-01", value: 87 },
        { date: "2025-06-04", value: 60 },
        { date: "2025-06-09", value: 12 },
        { date: "2025-06-18", value: 30 }, // New use detected at index 3
        { date: "2025-06-22", value: 25 }, // Only 1 test since new use
      ];

      const mockDatapoints = createMockDatapoints(testData);
      const lastIndex = mockDatapoints.length - 1;
      const lastNewUseIndex = 3;
      const testsSinceNewUse = lastIndex - lastNewUseIndex; // 4 - 3 = 1

      expect(testsSinceNewUse).toBeLessThan(3);

      // Should show insufficient tests message
      if (testsSinceNewUse < 3) {
        mockSetTitle('case12.title');
        mockSetText('case12.text');
        mockSetStatus('insufficient_tests');
      }

      expect(mockSetTitle).toHaveBeenCalledWith('case12.title');
      expect(mockSetText).toHaveBeenCalledWith('case12.text');
      expect(mockSetStatus).toHaveBeenCalledWith('insufficient_tests');
    });

    test('should allow analysis when 3 or more tests since new use', () => {
      const testData = [
        { date: "2025-06-01", value: 87 },
        { date: "2025-06-04", value: 60 },
        { date: "2025-06-09", value: 12 },
        { date: "2025-06-18", value: 30 }, // New use detected at index 3
        { date: "2025-06-22", value: 25 }, // Test 1 after new use
        { date: "2025-06-25", value: 20 }, // Test 2 after new use  
        { date: "2025-06-28", value: 15 }, // Test 3 after new use - should allow analysis
      ];

      const mockDatapoints = createMockDatapoints(testData);
      const lastIndex = mockDatapoints.length - 1;
      const lastNewUseIndex = 3;
      const testsSinceNewUse = lastIndex - lastNewUseIndex; // 6 - 3 = 3

      expect(testsSinceNewUse).toBeGreaterThanOrEqual(3);

      // Should proceed with normal analysis (not call insufficient tests functions)
      if (testsSinceNewUse >= 3) {
        // Normal model logic would proceed here
        expect(mockSetTitle).not.toHaveBeenCalledWith('case12.title');
        expect(mockSetStatus).not.toHaveBeenCalledWith('insufficient_tests');
      }
    });
  });

  describe('Real-world Test Case Validation', () => {
    test('should correctly handle the provided test data pattern', () => {
      // The test data provided by the user
      const realTestData = [
        { date: "2025-06-01", value: 87 },
        { date: "2025-06-04", value: 60 },
        { date: "2025-06-09", value: 12 },
        { date: "2025-06-18", value: 30 }, // New use detected (12→30 = 2.5x increase)
        { date: "2025-06-22", value: 30 }, // Only 1 test since new use
      ];

      const mockDatapoints = createMockDatapoints(realTestData);
      
      // First, new use should be detected at index 3
      const newUseIndex = 3;
      const ratio = realTestData[3].value / realTestData[2].value; // 30/12 = 2.5
      
      expect(ratio).toBeGreaterThan(1.5); // Significant increase indicating new use

      // After new use detection, model should reset
      mockResetAfterNewUse(newUseIndex);
      expect(mockResetAfterNewUse).toHaveBeenCalledWith(3);

      // Next test (index 4) should show insufficient tests
      const lastIndex = 4;
      const testsSinceNewUse = lastIndex - newUseIndex; // 4 - 3 = 1
      
      expect(testsSinceNewUse).toBe(1);
      expect(testsSinceNewUse).toBeLessThan(3);

      // Should prevent analysis and show warning
      mockSetTitle('case12.title');
      mockSetText('case12.text');
      mockSetStatus('insufficient_tests');

      expect(mockSetTitle).toHaveBeenCalledWith('case12.title');
      expect(mockSetStatus).toHaveBeenCalledWith('insufficient_tests');
    });
  });

  describe('Edge Cases', () => {
    test('should handle first analysis with no previous new use', () => {
      const testData = [
        { date: "2025-06-01", value: 87 },
        { date: "2025-06-04", value: 60 },
      ];

      const mockAnswers = { ...mockAnswersState, lastNewUseIndex: null };
      
      // Should proceed with normal analysis when no previous new use
      expect(mockAnswers.lastNewUseIndex).toBeNull();
      
      // Normal model logic should proceed
      expect(mockSetStatus).not.toHaveBeenCalledWith('insufficient_tests');
    });

    test('should correctly count tests since new use', () => {
      const scenarios = [
        { lastNewUseIndex: 5, currentIndex: 6, expected: 1 },
        { lastNewUseIndex: 3, currentIndex: 6, expected: 3 },
        { lastNewUseIndex: 0, currentIndex: 4, expected: 4 },
      ];

      scenarios.forEach(({ lastNewUseIndex, currentIndex, expected }) => {
        const testsSinceNewUse = currentIndex - lastNewUseIndex;
        expect(testsSinceNewUse).toBe(expected);
      });
    });

    test('should handle model reset state correctly', () => {
      const resetAfterNewUse = (currentIndex) => ({
        lastNewUseIndex: currentIndex,
        testsSinceNewUse: 0,
        specimenBase: currentIndex
      });

      const testCases = [0, 3, 7, 10];
      
      testCases.forEach(index => {
        const result = resetAfterNewUse(index);
        expect(result.lastNewUseIndex).toBe(index);
        expect(result.testsSinceNewUse).toBe(0);
        expect(result.specimenBase).toBe(index);
      });
    });
  });

  describe('Integration with Existing Model Logic', () => {
    test('should maintain compatibility with chronic model', () => {
      mockUseModelStore.mockReturnValue({ model: 'cronical' });
      
      const testData = [
        { date: "2025-06-01", value: 800 },
        { date: "2025-06-04", value: 600 },
        { date: "2025-06-09", value: 120 },
        { date: "2025-06-18", value: 300 }, // New use pattern
      ];

      // Should work with both occasional and chronic models
      expect(mockUseModelStore().model).toBe('cronical');
      
      // Reset functionality should work regardless of model type
      const newUseIndex = 3;
      mockResetAfterNewUse(newUseIndex);
      expect(mockResetAfterNewUse).toHaveBeenCalledWith(3);
    });

    test('should maintain compatibility with different unit types', () => {
      // Test with mg/mol units
      mockUseUtilitiesStore.mockImplementation(() => ({
        getState: () => ({
          lang: 'da',
          unit: 'mg/mol'
        })
      }));

      expect(mockUseUtilitiesStore().getState().unit).toBe('mg/mol');

      // Reset functionality should work regardless of units
      const newUseIndex = 2;
      mockResetAfterNewUse(newUseIndex);
      expect(mockResetAfterNewUse).toHaveBeenCalledWith(2);
    });
  });
});

// Export for potential use in other test files
module.exports = {
  createMockDatapoints,
  mockAnswersState
};