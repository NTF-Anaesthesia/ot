// worker/routes.js: which folder each address serves, and what it must never serve. Run: node --test 'worker/test/*.test.mjs'
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { resolve, SITES } from '../routes.js';

test('a root host serves its folder', () => {
  assert.deepEqual(resolve('ot.anantf.com', '/'), { file: 'ot/' });
  assert.deepEqual(resolve('ot.anantf.com', '/js/main.js'), { file: 'ot/js/main.js' });
  assert.deepEqual(resolve('OT.anantf.com:443', '/'), { file: 'ot/' });
  assert.deepEqual(resolve('ot.anantf.com', '/ot'), { redirect: '/ot/' });
  assert.deepEqual(resolve('ot.anantf.com', '/ot/index.html'), { file: 'ot/index.html' });
});

test('unknown hosts serve nothing; localhost serves the repo', () => {
  assert.deepEqual(resolve('x.workers.dev', '/ot/'), { notFound: true });
  assert.deepEqual(resolve('other.anantf.com', '/'), { notFound: true });
  assert.deepEqual(resolve('localhost:8787', '/ot/'), { file: 'ot/' });
});

test('nothing escapes its folder', () => {
  for (const p of ['/../wrangler.jsonc', '/%2e%2e/x', '/a%2fb', '/a\\b', '/./x'])
    assert.deepEqual(resolve('ot.anantf.com', p), { notFound: true }, p);
});

test('every folder in SITES exists', () => {
  for (const [host, s] of Object.entries(SITES))
    for (const f of [s.root, ...Object.values(s.prefixes || {})].filter(Boolean))
      assert.ok(fs.existsSync(new URL(`../../${f}`, import.meta.url)), `${host}: ${f}`);
});
