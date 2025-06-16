/**
 * Master Test Runner
 * 
 * Runs all test suites in the application:
 * - Model reset functionality tests
 * - Comprehensive model tests  
 * - Store functionality tests
 * - Clinical scenario tests
 * 
 * Usage: node __tests__/run-all-tests.js
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class MasterTestRunner {
  constructor() {
    this.totalPassed = 0;
    this.totalFailed = 0;
    this.suiteResults = [];
  }

  async runTestFile(testFile) {
    return new Promise((resolve, reject) => {
      console.log(`\n🚀 Running ${testFile}...`);
      console.log('='.repeat(50));
      
      const child = spawn('node', [testFile], { 
        stdio: 'inherit',
        cwd: process.cwd()
      });

      child.on('close', (code) => {
        const success = code === 0;
        this.suiteResults.push({
          file: testFile,
          success,
          exitCode: code
        });
        
        if (success) {
          console.log(`✅ ${testFile} completed successfully`);
        } else {
          console.log(`❌ ${testFile} failed with exit code ${code}`);
        }
        
        resolve(success);
      });

      child.on('error', (error) => {
        console.error(`❌ Error running ${testFile}:`, error.message);
        this.suiteResults.push({
          file: testFile,
          success: false,
          error: error.message
        });
        resolve(false);
      });
    });
  }

  async runAllTests() {
    console.log('🧪 Master Test Runner - Cannabis Analysis Application');
    console.log('====================================================');
    console.log('Running comprehensive test suite...\n');

    const testFiles = [
      'test-runner.js',
      '__tests__/comprehensive-model.test.js',
      '__tests__/store-functionality.test.js',
      '__tests__/clinical-scenarios.test.js'
    ];

    const startTime = Date.now();
    
    for (const testFile of testFiles) {
      const filePath = path.resolve(testFile);
      
      if (fs.existsSync(filePath)) {
        await this.runTestFile(testFile);
      } else {
        console.log(`⚠️  Test file not found: ${testFile}`);
        this.suiteResults.push({
          file: testFile,
          success: false,
          error: 'File not found'
        });
      }
    }

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    this.generateSummaryReport(totalTime);
  }

  generateSummaryReport(totalTime) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 MASTER TEST SUMMARY REPORT');
    console.log('='.repeat(60));

    const successfulSuites = this.suiteResults.filter(r => r.success).length;
    const failedSuites = this.suiteResults.filter(r => !r.success).length;

    console.log(`\n📈 Suite Results:`);
    console.log(`   ✅ Successful: ${successfulSuites}`);
    console.log(`   ❌ Failed:     ${failedSuites}`);
    console.log(`   📁 Total:      ${this.suiteResults.length}`);

    console.log(`\n⏱️  Execution Time: ${totalTime}ms`);

    console.log(`\n📋 Individual Suite Results:`);
    this.suiteResults.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      const fileName = path.basename(result.file);
      console.log(`   ${index + 1}. ${status} ${fileName}`);
      
      if (result.error) {
        console.log(`      Error: ${result.error}`);
      }
    });

    // Test coverage summary
    console.log(`\n🔍 Test Coverage Summary:`);
    console.log(`   🧪 Model Reset Functionality: ${this.getTestStatus('test-runner.js')}`);
    console.log(`   🔬 Comprehensive Model Logic: ${this.getTestStatus('comprehensive-model.test.js')}`);
    console.log(`   🗃️  Store Management: ${this.getTestStatus('store-functionality.test.js')}`);
    console.log(`   🏥 Clinical Scenarios: ${this.getTestStatus('clinical-scenarios.test.js')}`);

    // Recommendations
    console.log(`\n💡 Recommendations:`);
    
    if (failedSuites === 0) {
      console.log(`   🎉 All tests passing! Application is ready for production.`);
      console.log(`   ✓ Model reset functionality working correctly`);
      console.log(`   ✓ Cannabis analysis algorithms validated`);
      console.log(`   ✓ State management robust`);
      console.log(`   ✓ Clinical scenarios handled properly`);
    } else {
      console.log(`   ⚠️  ${failedSuites} test suite(s) failing - review before deployment`);
      
      const failedFiles = this.suiteResults.filter(r => !r.success);
      failedFiles.forEach(result => {
        console.log(`   - Fix issues in: ${path.basename(result.file)}`);
      });
    }

    // Quality metrics
    console.log(`\n📏 Quality Metrics:`);
    const successRate = (successfulSuites / this.suiteResults.length) * 100;
    console.log(`   Success Rate: ${successRate.toFixed(1)}%`);
    
    if (successRate >= 100) {
      console.log(`   Quality Grade: A+ (Excellent)`);
    } else if (successRate >= 90) {
      console.log(`   Quality Grade: A (Very Good)`);
    } else if (successRate >= 80) {
      console.log(`   Quality Grade: B (Good)`);
    } else if (successRate >= 70) {
      console.log(`   Quality Grade: C (Needs Improvement)`);
    } else {
      console.log(`   Quality Grade: F (Critical Issues)`);
    }

    const overallSuccess = failedSuites === 0;
    
    if (overallSuccess) {
      console.log(`\n🎯 RESULT: ALL TESTS PASSED ✅`);
      console.log(`Cannabis analysis application is fully validated!`);
    } else {
      console.log(`\n⚠️  RESULT: ${failedSuites} TEST SUITE(S) FAILED ❌`);
      console.log(`Review and fix failing tests before deployment.`);
    }

    return overallSuccess;
  }

  getTestStatus(fileName) {
    const result = this.suiteResults.find(r => r.file.includes(fileName));
    return result ? (result.success ? '✅ PASS' : '❌ FAIL') : '⚠️  NOT RUN';
  }
}

// Additional validation checks
function performSystemChecks() {
  console.log('\n🔧 Performing System Checks...');
  
  const checks = [
    {
      name: 'Node.js Version',
      check: () => {
        const version = process.version;
        const majorVersion = parseInt(version.substring(1).split('.')[0]);
        return majorVersion >= 14;
      },
      requirement: 'Node.js 14+ required'
    },
    {
      name: 'Test Files Present',
      check: () => {
        const requiredFiles = [
          'test-runner.js',
          '__tests__/comprehensive-model.test.js',
          '__tests__/store-functionality.test.js',
          '__tests__/clinical-scenarios.test.js'
        ];
        return requiredFiles.every(file => fs.existsSync(path.resolve(file)));
      },
      requirement: 'All test files must exist'
    },
    {
      name: 'Source Files Present',
      check: () => {
        const sourceFiles = [
          'app/utils/model.js',
          'app/utils/parameters.js',
          'app/_store/types.ts',
          'app/_store/answersStore.ts'
        ];
        return sourceFiles.every(file => fs.existsSync(path.resolve(file)));
      },
      requirement: 'Core source files must exist'
    }
  ];

  let allChecksPassed = true;
  
  checks.forEach(({ name, check, requirement }) => {
    const passed = check();
    console.log(`   ${passed ? '✅' : '❌'} ${name}: ${passed ? 'OK' : 'FAILED'}`);
    
    if (!passed) {
      console.log(`      Requirement: ${requirement}`);
      allChecksPassed = false;
    }
  });

  return allChecksPassed;
}

// Main execution
async function main() {
  const systemChecksPass = performSystemChecks();
  
  if (!systemChecksPass) {
    console.log('\n❌ System checks failed. Fix issues before running tests.');
    process.exit(1);
  }

  const runner = new MasterTestRunner();
  await runner.runAllTests();
  
  // Exit with appropriate code
  const allPassed = runner.suiteResults.every(r => r.success);
  process.exit(allPassed ? 0 : 1);
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Run if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Master test runner failed:', error);
    process.exit(1);
  });
}

module.exports = { MasterTestRunner };