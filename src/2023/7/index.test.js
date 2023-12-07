import { part1, part2, getInputData, calculateHandPower, calculateHandPowerWithJoker } from './index.js';
import { input } from './input-example.js';

describe('2023-7', () => {
  const data = getInputData(input);

  test('should correctly calculate hand power', () => {
    expect(calculateHandPower('AAAAA')).toBe(6);
    expect(calculateHandPower('AA8AA')).toBe(5);
    expect(calculateHandPower('23332')).toBe(4);
    expect(calculateHandPower('TTT98')).toBe(3);
    expect(calculateHandPower('23432')).toBe(2);
    expect(calculateHandPower('A23A4')).toBe(1);
    expect(calculateHandPower('23456')).toBe(0);
  });

  test('should correctly calculate hand power with joker', () => {
    expect(calculateHandPowerWithJoker('QQQQQ')).toBe(6);
    expect(calculateHandPowerWithJoker('QJQQQ')).toBe(6);
    expect(calculateHandPowerWithJoker('QJJQQ')).toBe(6);
    expect(calculateHandPowerWithJoker('QJJJQ')).toBe(6);
    expect(calculateHandPowerWithJoker('QJJJJ')).toBe(6);
    expect(calculateHandPowerWithJoker('JJJJJ')).toBe(6);
    expect(calculateHandPowerWithJoker('QQQQ2')).toBe(5);
    expect(calculateHandPowerWithJoker('QJQQ2')).toBe(5);
    expect(calculateHandPowerWithJoker('QJJQ2')).toBe(5);
    expect(calculateHandPowerWithJoker('QJJJ2')).toBe(5);
    expect(calculateHandPowerWithJoker('23232')).toBe(4);
    expect(calculateHandPowerWithJoker('23J32')).toBe(4);
    expect(calculateHandPowerWithJoker('TJT98')).toBe(3);
    expect(calculateHandPowerWithJoker('A23J4')).toBe(1);
  });

  test('part 1: should calculate the total winnings', () => {
    expect(part1(data)).toBe(6440);
  });

  test('part 2: should calculate the total winnings with the joker rule', () => {
    expect(part2(data)).toBe(5905);
  });
});
