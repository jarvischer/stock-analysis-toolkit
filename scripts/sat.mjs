// npm run sat -- <extract|calc|validate> … — one entry point for the value analyst tools.
import { spawnSync } from 'node:child_process';

const [command, ...rest] = process.argv.slice(2);
const usage = 'Usage: npm run sat -- extract TICKER | calc TICKER [--price N --price-date YYYY-MM-DD] [--adjust file] | compare TICKER [--out report.md] [--export-dir directory] | validate FILE';

if (command === 'extract') {
  const r = spawnSync('uv', ['run', '--project', 'tools/extract', 'python', '-m', 'sat_extract', ...rest], { stdio: 'inherit' });
  process.exit(r.status ?? 1);
} else if (command === 'calc') {
  process.exit((await import('../tools/calc/cli.mjs')).main(rest));
} else if (command === 'validate') {
  process.exit((await import('../tools/agent/validate.mjs')).main(rest));
} else if (command === 'compare') {
  process.exit((await import('../tools/agent/compare.mjs')).main(rest));
} else {
  console.error(usage);
  process.exit(1);
}
