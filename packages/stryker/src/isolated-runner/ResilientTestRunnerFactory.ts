import IsolatedTestRunnerAdapter from './IsolatedTestRunnerAdapter';
import TimeoutDecorator from './TimeoutDecorator';
import RetryDecorator from './RetryDecorator';
import TestRunnerDecorator from './TestRunnerDecorator';
import LoggingClientContext from '../logging/LoggingClientContext';
import { RunnerOptions } from 'stryker-api/test_runner';
import CommandTestRunner from '../test-runner/CommandTestRunner';


export default {
  create(testRunnerName: string, settings: RunnerOptions, sandboxWorkingDirectory: string, loggingContext: LoggingClientContext): TestRunnerDecorator {
    if (testRunnerName === 'command') {
      return new RetryDecorator(() => new TimeoutDecorator(() => new CommandTestRunner(sandboxWorkingDirectory, settings)));
    } else {
      return new RetryDecorator(() =>
        new TimeoutDecorator(() => new IsolatedTestRunnerAdapter(testRunnerName, settings, sandboxWorkingDirectory, loggingContext)));
    }
  }
};