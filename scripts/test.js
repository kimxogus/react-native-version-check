import path from 'path';
import jest from 'jest';

process.env.RNVC_ENV = 'test';
process.env.HOME = path.join(process.cwd(), 'testHome');

const argv = process.argv.slice(2);

if (process.env.CI) {
  argv.push('--runInBand');
}

jest.run(argv);
