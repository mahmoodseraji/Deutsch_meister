import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const app = await readFile(new URL('../js/app.js', import.meta.url), 'utf8');

test('the simplified app has five main pages and four bottom navigation items', () => {
  assert.equal((html.match(/class="view(?: active)?"/g) || []).length, 5);
  assert.equal((html.match(/class="nav-item/g) || []).length, 4);
});

test('the interface has no CEFR or collection navigation', () => {
  assert.doesNotMatch(html, /CEFR|A1|A2|B1|B2|Collections|collection/i);
});

test('the library uses bounded rendering and retains individual and batch deletion', () => {
  assert.match(app, /libraryLimit=100/);
  assert.match(app, /slice\(0,libraryLimit\)/);
  assert.match(html, /id="loadMoreWords"/);
  assert.match(app, /data-delete-import-batch/);
  assert.match(app, /data-delete=/);
});

test('CSV import remains in the Library and imported batches remain in Settings', () => {
  assert.match(html, /id="importCsvOpen"/);
  assert.match(html, /id="importCsv"/);
  assert.match(html, /id="importBatchList"/);
});

test('practice visibility depends on available imported data', () => {
  assert.match(app, /function renderPracticeAvailability\(\)/);
  assert.match(app, /import \{[^}]*inferPartOfSpeech[^}]*\} from '\.\/challenges\.js'/);
  assert.match(app, /new Set\(words\.filter\(w=>String\(w\.translation/);
  assert.match(app, /pluralOptions\(w,words\)\.length>=3/);
  assert.match(app, /buildVerbQuestions\(buildVerbBank\(words\)\)/);
});

test('the redesigned pages remove redundant home shortcuts and library filters', () => {
  assert.doesNotMatch(html, /home-links|categoryFilter|favoritesOnly/);
  assert.match(html, /id="wordSearch"/);
  assert.match(html, /id="addWordOpen"/);
  assert.match(html, /id="importCsvOpen"/);
  assert.match(html, /id="progressDue"/);
});
