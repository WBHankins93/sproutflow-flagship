import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

describe('public copy guard', () => {
  const script = resolve(__dirname, '../../scripts/check-copy.mjs');
  let fixture: string;

  beforeEach(() => {
    fixture = mkdtempSync(join(tmpdir(), 'sproutflow-copy-'));
    mkdirSync(join(fixture, 'components'));
  });

  afterEach(() => rmSync(fixture, { recursive: true, force: true }));

  it('rejects the founder photography production note that escaped the old guard', () => {
    writeFileSync(join(fixture, 'components', 'About.tsx'), '<p>Founder and studio photography strip expands here</p>');
    const result = spawnSync(process.execPath, [script], { cwd: fixture, encoding: 'utf8' });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('[placeholder-prose]');
  });

  it('allows customer-facing photography and review instructions', () => {
    writeFileSync(join(fixture, 'components', 'About.tsx'), '<p>Share your existing photography. Review the working pages before launch.</p>');
    const result = spawnSync(process.execPath, [script], { cwd: fixture, encoding: 'utf8' });
    expect(result.status).toBe(0);
  });
});
