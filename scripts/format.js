import fs from 'fs';
import { CLIEngine } from 'eslint';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

if (!process.env.CI) {
  new CLIEngine({ fix: true, useEslintrc: true })
    .executeOnFiles(['.'])
    .results.filter(r => r.output)
    .forEach(r =>
      fs.writeFile(r.filePath, r.output, { encoding: 'utf8' }, () => {})
    );
}
