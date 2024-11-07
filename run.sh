set -e
esbuild src/test.ts --outdir=target
node target/test.js