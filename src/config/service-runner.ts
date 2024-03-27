import { spawnSync } from 'child_process';
import * as path from 'path';

function findArgIndex(arg: string): number {
	const index = process.argv.indexOf(arg);
	return index !== -1 ? index + 1 : -1;
}

const serviceIndex = findArgIndex('-s');
const environmentIndex = findArgIndex('-e');
const commandIndex = findArgIndex('-c');

if (serviceIndex === -1 || environmentIndex === -1 || serviceIndex >= process.argv.length || environmentIndex >= process.argv.length) {
	console.error('Uso: node service-runner.js -s <serviço> -e <ambiente>');
	process.exit(1);
}

console.log({ argv: process.argv });

const service = process.argv[serviceIndex];
const command = process.argv.slice(commandIndex).join(' ');
// const environment = process.argv[environmentIndex];

// Caminho para o diretório do serviço
const servicePath = path.join(__dirname, '..', 'src', 'adapters', 'services', service);

// Executar o comando serverless offline start com os argumentos fornecidos dentro da pasta do serviço
const result = spawnSync(`sls ${command}`, { cwd: servicePath, shell: true, stdio: 'inherit' });

// Encerrar o processo pai se houver um erro na execução do comando
if (result.error) {
	console.error(result.error);
	process.exit(1);
}

// Encerrar o processo pai com o código de saída do comando filho
process.exit(result.status || 0);
