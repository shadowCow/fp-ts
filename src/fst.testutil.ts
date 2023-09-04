import { FstFactory } from './fst';

export const STATE_IS_UNCHANGED = Symbol('STATE_IS_UNCHANGED');

export type FstTest<I, O, S> = (testCase: FstTestCase<I, O, S>) => () => void;

export type FstTesterFactory = typeof createFstTester;
export function createFstTester<I, O, S>(
  fstFactory: FstFactory<I, O, S>,
  assertStatesEqual: (expected: S, actual: S) => void,
  assertOutputsEqual: (expected: Array<O>, actual: Array<O>) => void,
): FstTest<I, O, S> {
  return (testCase) => {
    return () => {
      const fst = fstFactory(testCase.Given);

      const outputs = fst.onInput(testCase.When);
      const nextState = fst.getState();

      if (testCase.Then === STATE_IS_UNCHANGED) {
        assertStatesEqual(testCase.Given, nextState);
      } else {
        assertStatesEqual(testCase.Then, nextState);
      }

      assertOutputsEqual(testCase.And, outputs);
    };
  };
}

export type FstTestCase<I, O, S> = {
  Given: S;
  When: I;
  Then: S | typeof STATE_IS_UNCHANGED;
  And: Array<O>;
};
