import test from 'node:test';
import assert from 'node:assert/strict';
import { ensureSchedules, schedule, isDue } from '../js/scheduler.js';

const base = { id: 'word-1', german: 'sprechen', dueDate: '2026-11-04', interval: 0 };
test('Leitner and SM-2 schedules are initialized independently', () => {
  const word = ensureSchedules(base, 'sm2');
  assert.ok(word.scheduling.leitner);
  assert.ok(word.scheduling.sm2);
  assert.equal(word.scheduling.leitner.box, 1);
  assert.equal(word.scheduling.sm2.easeFactor, 2.5);
});
test('reviewing with Leitner does not mutate SM-2 state', () => {
  const word = ensureSchedules(base, 'sm2');
  const before = structuredClone(word.scheduling.sm2);
  const after = schedule(word, 'good', 'leitner');
  assert.deepEqual(after.scheduling.sm2, before);
  assert.equal(after.scheduling.leitner.box, 2);
});
test('reviewing with SM-2 does not mutate Leitner state', () => {
  const word = ensureSchedules(base, 'leitner');
  const before = structuredClone(word.scheduling.leitner);
  const after = schedule(word, 'good', 'sm2');
  assert.deepEqual(after.scheduling.leitner, before);
  assert.equal(after.scheduling.sm2.repetitions, 1);
});
test('due state is read from the selected algorithm', () => {
  const word = ensureSchedules(base, 'sm2');
  word.scheduling.leitner.dueDate = '9999-12-31';
  word.scheduling.sm2.dueDate = '2000-01-01';
  assert.equal(isDue(word, 'leitner'), false);
  assert.equal(isDue(word, 'sm2'), true);
});
