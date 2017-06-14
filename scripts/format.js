import fs from 'fs';
import { CLIEngine } from 'eslint';

if (!process.env.CI) {
  new CLIEngine({ fix: true, useEslintrc: true })
    .executeOnFiles(['.'])
    .results.filter(r => r.output)
    .forEach(r =>
      fs.writeFile(r.filePath, r.output, { encoding: 'utf8' }, () => {})
    );
}
