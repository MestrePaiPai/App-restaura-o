import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const rootTarget = path.resolve('Instalar-Restaurante-Demo.exe');

if (!fs.existsSync(distDir)) {
  console.error('Pasta dist não encontrada. Execute primeiro o build do instalador.');
  process.exit(1);
}

const files = fs.readdirSync(distDir).filter((f) => f.toLowerCase().endsWith('.exe'));
if (!files.length) {
  console.error('Nenhum ficheiro .exe encontrado em dist/.');
  process.exit(1);
}

// Prioriza o setup NSIS
const preferred = files.find((f) => /setup/i.test(f)) ?? files[0];
const source = path.join(distDir, preferred);
fs.copyFileSync(source, rootTarget);

console.log(`Instalador copiado para: ${rootTarget}`);
