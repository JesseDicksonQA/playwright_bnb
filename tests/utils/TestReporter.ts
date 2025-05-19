/**
 * TestReporter class to track test executions and results
 * This utility helps track pass/fail statistics and test details
 */
export class TestReporter {
  private static instance: TestReporter;
  private testResults: Map<string, TestResult> = new Map();
  
  /**
   * Get singleton instance of TestReporter
   */
  public static getInstance(): TestReporter {
    if (!TestReporter.instance) {
      TestReporter.instance = new TestReporter();
    }
    return TestReporter.instance;
  }

  /**
   * Record a test execution
   * @param testId - Unique identifier for the test
   * @param testName - Descriptive name of the test
   * @param passed - Whether the test passed or failed
   * @param details - Optional details about the test execution
   */
  public recordTest(testId: string, testName: string, passed: boolean, details?: string): void {
    if (!this.testResults.has(testId)) {
      this.testResults.set(testId, new TestResult(testId, testName));
    }
    
    const result = this.testResults.get(testId)!;
    passed ? result.addPass(details) : result.addFail(details);
    
    // Log the result immediately for real-time feedback
    console.log(`Test: ${testName} (${testId}) - ${passed ? 'PASSED' : 'FAILED'}`);
    if (details) {
      console.log(`Details: ${details}`);
    }
  }

  /**
   * Get summary of all test results
   */
  public getSummary(): TestSummary {
    const summary: TestSummary = {
      totalTests: this.testResults.size,
      passedTests: 0,
      failedTests: 0,
      totalExecutions: 0,
      passRate: 0,
      testDetails: []
    };

    this.testResults.forEach(result => {
      summary.totalExecutions += result.totalRuns;
      summary.passedTests += result.passed > 0 ? 1 : 0;
      summary.failedTests += result.failed > 0 ? 1 : 0;
      summary.testDetails.push({
        id: result.id,
        name: result.name,
        passed: result.passed,
        failed: result.failed,
        lastResult: result.lastPassed,
        details: result.details
      });
    });

    summary.passRate = summary.totalTests > 0 
      ? Math.round((summary.passedTests / summary.totalTests) * 100) 
      : 0;
    
    return summary;
  }

  /**
   * Print summary to console
   */
  public printSummary(): void {
    const summary = this.getSummary();
    
    console.log('\n=== TEST EXECUTION SUMMARY ===');
    console.log(`Total Tests: ${summary.totalTests}`);
    console.log(`Passed Tests: ${summary.passedTests}`);
    console.log(`Failed Tests: ${summary.failedTests}`);
    console.log(`Total Executions: ${summary.totalExecutions}`);
    console.log(`Pass Rate: ${summary.passRate}%`);
    
    console.log('\n=== TEST DETAILS ===');
    summary.testDetails.forEach(detail => {
      console.log(`\nTest: ${detail.name} (${detail.id})`);
      console.log(`Passed: ${detail.passed} | Failed: ${detail.failed}`);
      console.log(`Last Result: ${detail.lastResult ? 'PASS' : 'FAIL'}`);
      if (detail.details && detail.details.length > 0) {
        console.log('Recent Details:');
        // Show the last 3 execution details
        detail.details.slice(-3).forEach(d => {
          console.log(`  - ${d}`);
        });
      }
    });
  }

  /**
   * Reset all test results
   */
  public reset(): void {
    this.testResults.clear();
  }
}

/**
 * Class to store individual test result details
 */
class TestResult {
  public id: string;
  public name: string;
  public passed: number = 0;
  public failed: number = 0;
  public lastPassed: boolean = false;
  public details: string[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  get totalRuns(): number {
    return this.passed + this.failed;
  }

  /**
   * Record a passing test
   * @param detail - Optional detail about the passing test
   */
  public addPass(detail?: string): void {
    this.passed++;
    this.lastPassed = true;
    if (detail) {
      this.details.push(`PASS [${new Date().toISOString()}]: ${detail}`);
    }
  }

  /**
   * Record a failing test
   * @param detail - Optional detail about the failing test
   */
  public addFail(detail?: string): void {
    this.failed++;
    this.lastPassed = false;
    if (detail) {
      this.details.push(`FAIL [${new Date().toISOString()}]: ${detail}`);
    }
  }
}

/**
 * Interface for test summary data
 */
export interface TestSummary {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  totalExecutions: number;
  passRate: number;
  testDetails: TestDetail[];
}

/**
 * Interface for individual test detail in summary
 */
export interface TestDetail {
  id: string;
  name: string;
  passed: number;
  failed: number;
  lastResult: boolean;
  details: string[];
}
