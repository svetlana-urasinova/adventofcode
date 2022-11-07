import { getInputData, executeOpcode } from './index.js';

describe('2019-5', () => {
  test("part 1: should create a correct program for input `3,0,4,0,99` and param 10", () => {
    const res = executeOpcode(getInputData(`3,0,4,0,99`), 10);
    expect(res.data).toEqual([10, 0, 4, 0, 99]);
    expect(res.outputValue).toBe(10);
  });

  test("part 1: should create a correct program for input `1,9,10,3,2,3,11,0,99,30,40,50`", () => {
    const res = executeOpcode(getInputData(`1,9,10,3,2,3,11,0,99,30,40,50`));
    expect(res.data).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
    expect(res.outputValue).toBe(undefined);
  });

  test("part 1: should create a correct program for input `1002,4,3,4,33`", () => {
    const res = executeOpcode(getInputData(`1002,4,3,4,33`));
    expect(res.data).toEqual([1002, 4, 3, 4, 99]);
    expect(res.outputValue).toBe(undefined);
  });

  test("part 1: should create a correct program for input `1101,100,-1,4,0`", () => {
    const res = executeOpcode(getInputData(`1101,100,-1,4,0`));
    expect(res.data).toEqual([1101, 100, -1, 4, 99]);
    expect(res.outputValue).toBe(undefined);
  });
  test("part 1: should create a correct program for input `1002,4,3,4,33`", () => {
    const res = executeOpcode(getInputData(`1002,4,3,4,33`));
    expect(res.data).toEqual([1002, 4, 3, 4, 99]);
    expect(res.outputValue).toBe(undefined);
  });

  test("part 1: should create a correct program for input `1101,100,-1,4,0`", () => {
    const res = executeOpcode(getInputData(`1101,100,-1,4,0`));
    expect(res.data).toEqual([1101, 100, -1, 4, 99]);
    expect(res.outputValue).toBe(undefined);
  });

  test("part 2: should return 1 if input is equal to 8 and 0 if not", () => {
    const data = getInputData(`3,9,8,9,10,9,4,9,99,-1,8`);
    expect(executeOpcode(data, 8).outputValue).toBe(1);
    expect(executeOpcode(data, 10).outputValue).toBe(0);
  });

  test("part 2: should return 1 if input is less than 8 and 0 if not", () => {
    const data = getInputData(`3,9,7,9,10,9,4,9,99,-1,8`);
    expect(executeOpcode(data, 5).outputValue).toBe(1);
    expect(executeOpcode(data, 8).outputValue).toBe(0);
    expect(executeOpcode(data, 13).outputValue).toBe(0);
  });


  test("part 2: using immediate mode should return 1 if input is equal to 8 and 0 if not", () => {
    const data = getInputData(`3,3,1108,-1,8,3,4,3,99`);
    expect(executeOpcode(data, 8).outputValue).toBe(1);
    expect(executeOpcode(data, 10).outputValue).toBe(0);
  });

  test("part 2: using immediate mode should return 1 if input is less than 8 and 0 if not", () => {
    const data = getInputData(`3,3,1107,-1,8,3,4,3,99`);
    expect(executeOpcode(data, 5).outputValue).toBe(1);
    expect(executeOpcode(data, 8).outputValue).toBe(0);
    expect(executeOpcode(data, 13).outputValue).toBe(0);
  });

  test("part 2: should return 0 if input is zero and 1 if not", () => {
    const data = getInputData(`3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9`);
    expect(executeOpcode(data, 3).outputValue).toBe(1);
    expect(executeOpcode(data, 0).outputValue).toBe(0);
  });

  test("part 2: using immediate mode should return 0 if input is zero and 1 if not", () => {
    const data = getInputData(`3,3,1105,-1,9,1101,0,0,12,4,12,99,1`);
    expect(executeOpcode(data, 3).outputValue).toBe(1);
    expect(executeOpcode(data, 0).outputValue).toBe(0);
  });

  test("part 2: should return 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8", () => {
    const data = getInputData(`3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`);
    expect(executeOpcode(data, 5).outputValue).toBe(999);
    expect(executeOpcode(data, 8).outputValue).toBe(1000);
    expect(executeOpcode(data, 13).outputValue).toBe(1001);
  });
});