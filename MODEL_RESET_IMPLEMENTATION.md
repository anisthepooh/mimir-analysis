# Cannabis Analysis Model Reset Implementation

## Overview

This document describes the implementation of model reset functionality after new use detection and the minimum 3-test requirement before allowing subsequent new use analysis.

## Problem Statement

The original model implementation had a critical flaw where it could continuously detect "new use" without proper reset, leading to unreliable analysis. After detecting new use, the model needed to:

1. **Reset the baseline** - Start fresh analysis from the point of new use detection
2. **Require minimum tests** - Ensure at least 3 tests after new use before allowing another new use detection

## Research Validation

The implementation is based on validated research:

- **PMID: 19470219**: Validates ratio-based detection methods and time-dependent thresholds
- **PMID: 33876828**: Provides mathematical models for cannabis use prediction
- **Threshold validation**: 15 ng/mL and 6 ng/mL cutoffs align with research standards

## Implementation Details

### 1. State Management Updates

#### New State Properties (`types.ts`)
```typescript
export type Answers = {
  // ... existing properties
  lastNewUseIndex: number | null;  // Index of last detected new use
  testsSinceNewUse: number;        // Count of tests since last new use
}

export type AnswersState = {
  // ... existing functions
  setLastNewUseIndex: (index: number | null) => void;
  setTestsSinceNewUse: (count: number) => void;
  resetAfterNewUse: (currentIndex: number) => void;
}
```

#### Store Implementation (`answersStore.ts`)
```typescript
resetAfterNewUse: (currentIndex) =>
  set((state) => ({ 
    answers: { 
      ...state.answers, 
      lastNewUseIndex: currentIndex,
      testsSinceNewUse: 0,
      specimenBase: currentIndex 
    } 
  }))
```

### 2. Model Logic Updates (`model.js`)

#### Pre-Analysis Check
```javascript
// Check if we have enough tests since last new use detection
if (answers.lastNewUseIndex !== null) {
  const testsSinceNewUse = lastIndex - answers.lastNewUseIndex;
  setTestsSinceNewUse(testsSinceNewUse);
  
  if (testsSinceNewUse < 3) {
    // Show warning and skip analysis
    setTitle(t("case12.title"));
    setText(t("case12.text", {required: 3, current: testsSinceNewUse}));
    setStatus("insufficient_tests");
    return;
  }
}
```

#### Post-Analysis Reset
```javascript
// Check if new use was detected and reset model
if (updatedAnswers.status === "sign_on_use") {
  resetAfterNewUse(lastIndex);
}
```

### 3. Internationalization Support

#### Danish (`da`)
```json
"case12": {
  "title": "Utilstrækkelige tests siden sidste nye indtag",
  "text": "Der skal være mindst {required} tests siden sidste detekterede nye indtag. Nuværende antal: {current}. Tag flere tests før næste analyse.",
  "calculation": "Model nulstillet efter detektering af nyt indtag - kræver flere tests"
}
```

#### English (`en`)
```json
"case12": {
  "title": "Insufficient tests since last new use",
  "text": "At least {required} tests are required since the last detected new use. Current count: {current}. Take more tests before next analysis.",
  "calculation": "Model reset after new use detection - requires more tests"
}
```

## Test Case Validation

### Real-World Scenario
Using the provided test data:
```javascript
[
  { date: "01/06/2025", value: 87 },  // Baseline
  { date: "04/06/2025", value: 60 },  // Normal decline
  { date: "09/06/2025", value: 12 },  // Continued decline
  { date: "18/06/2025", value: 30 },  // NEW USE detected (2.5x increase)
  { date: "22/06/2025", value: 30 },  // BLOCKED - only 1 test since new use
]
```

**Expected behavior:**
1. Tests 1-3: Normal analysis shows declining pattern
2. Test 4: New use detected (ratio 30/12 = 2.5), model resets
3. Test 5: Analysis blocked - insufficient tests (need 3, have 1)

### Test Coverage

Our comprehensive test suite covers:

- ✅ Model reset after new use detection
- ✅ Minimum 3-test requirement enforcement
- ✅ Real-world data pattern validation
- ✅ Edge cases (first analysis, null states)
- ✅ Integration with existing model types (chronic/occasional)
- ✅ Research-based ratio validation
- ✅ Concentration threshold validation

## Clinical Benefits

### 1. **Improved Accuracy**
- Prevents false positive cascade effects
- Ensures reliable baseline establishment
- Reduces clinical uncertainty

### 2. **Research Compliance**
- Aligns with published detection methodologies
- Validates against peer-reviewed thresholds
- Maintains scientific rigor

### 3. **User Experience**
- Clear feedback on insufficient data
- Prevents misleading interpretations
- Guides proper testing protocols

## Usage Examples

### Scenario 1: Proper Reset
```
Test 1: 87 ng/mL → Baseline established
Test 2: 60 ng/mL → Normal decline
Test 3: 12 ng/mL → Continued decline
Test 4: 30 ng/mL → NEW USE detected, model resets
Test 5: 25 ng/mL → Warning: Need 2 more tests
Test 6: 20 ng/mL → Warning: Need 1 more test  
Test 7: 15 ng/mL → Analysis resumes normally
```

### Scenario 2: No New Use
```
Test 1: 87 ng/mL → Baseline
Test 2: 60 ng/mL → Normal decline
Test 3: 40 ng/mL → Normal decline
Test 4: 30 ng/mL → Normal decline (ratio 0.75)
```

## Technical Notes

### Performance Impact
- Minimal computational overhead
- O(1) reset operation
- No significant memory increase

### Backward Compatibility
- Existing data structures preserved
- New fields have sensible defaults
- Legacy behavior maintained where appropriate

### Future Enhancements
- Configurable minimum test count
- Advanced statistical validation
- Integration with external research data

## Files Modified

1. **`app/_store/types.ts`** - Added new state properties
2. **`app/_store/answersStore.ts`** - Implemented reset functionality  
3. **`app/utils/model.js`** - Added reset logic and 3-test requirement
4. **`app/utils/locals/local.js`** - Added internationalization support
5. **`__tests__/model-reset.test.js`** - Comprehensive test suite
6. **`test-runner.js`** - Simple test runner for validation

## Conclusion

This implementation provides a robust, research-validated solution for cannabis metabolite analysis that prevents false positive cascades while maintaining clinical accuracy. The 3-test minimum requirement ensures reliable detection of subsequent new use events, significantly improving the tool's clinical utility.