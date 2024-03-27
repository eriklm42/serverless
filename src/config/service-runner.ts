import { spawnSync } from "child_process";
import * as path from "path";
import { parse as getArgs } from "yargs";
import { ParsedArgs } from "src/models";

async function main() {
	let args: unknown;
	try {
		args = await getArgs();
		if (!isParsedArgs(args))
			throw new Error("Parsed arguments do not match expected format.");
	} catch (error) {
		console.error("Error parsing arguments:", error);
		process.exit(1);
	}

	const { c: command, s: service, e: environment } = args as ParsedArgs;

	if (!command || !service || !environment) {
		console.error(
			"Uso: node service-runner.js -s <service> -e <environment> -c <command>",
		);
		process.exit(1);
	}

	const servicePath = path.join(
		__dirname,
		"..",
		"adapters",
		"services",
		service,
	);

	const result = spawnSync("yarn", [command], {
		env: process.env,
		cwd: servicePath,
		stdio: "inherit",
	});

	if (result.error) {
		console.error(result.error);
		process.exit(1);
	}

	process.exit(result.status || 0);
}

function isParsedArgs(args: unknown): args is ParsedArgs {
	return (
		typeof args === "object" &&
		args !== null &&
		typeof (args as ParsedArgs).c === "string" &&
		typeof (args as ParsedArgs).s === "string" &&
		typeof (args as ParsedArgs).e === "string"
	);
}

main().catch((error) => {
	console.error("Error occurred:", error);
	process.exit(1);
});
