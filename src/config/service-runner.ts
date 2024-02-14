import * as fs from "fs";
import { join } from "path";
import { spawn, spawnSync } from "child_process";
import yargs from "yargs";

interface Args {
	c?: string;
	i?: string;
	e?: string;
	s?: string;
	a?: boolean;
	p?: string;
	[key: string]: unknown;
}

const parseArgs = async (): Promise<Args> => yargs.parse();

const main = async (): Promise<void> => {
	const args: Args = await parseArgs();

	const runner: string = /^win/.test(process.platform) ? "yarn.cmd" : "yarn";

	const sites: string[] = ["backoffice", "site"];

	const command: string | undefined = args.c;
	const includes: string | undefined = args.i;
	const stage: string | undefined = args.s;
	const isAsync: boolean = !!args.a;
	const parameters: string | undefined = args.p;

	const path: string = "src/services";

	let dirs: string[] = fs.readdirSync(path);

	dirs = dirs.filter((item) => item === includes);

	const options: string[] = [
		command,
		"--force",
		...(stage ? ["--stage", stage] : []),
		...(parameters ? [parameters] : []),
	];

	const executeAsync = async (
		servicePath: string,
		currentOptions: string[],
	): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			const proc = spawn(runner, currentOptions, {
				env: process.env,
				cwd: servicePath,
				stdio: "inherit",
			});

			proc.on("exit", (code) => {
				if (code !== 0) {
					reject(new Error(`Failed execution. Exit code ${code}`));
				} else {
					resolve();
				}
			});
		});
	};

	const executeSync = (servicePath: string, currentOptions: string[]): void => {
		const proc = spawnSync(runner, currentOptions, {
			env: process.env,
			cwd: servicePath,
			stdio: "inherit",
		});

		if (proc.status !== 0) {
			throw new Error(`Failed execution. Exit code ${proc.status}`);
		}
	};

	const executeCommand = async (
		servicePath: string,
		currentOptions: string[],
	): Promise<void> => {
		if (isAsync) {
			await executeAsync(servicePath, currentOptions);
		} else {
			executeSync(servicePath, currentOptions);
		}
	};

	for (let i = 0; i < dirs.length; i++) {
		const currentOptions: string[] = [...options];
		const servicePath: string = join(process.cwd(), path, dirs[i]);

		if (sites.includes(dirs[i])) {
			const stageIndex: number = currentOptions.indexOf("--stage");
			if (stageIndex !== -1) {
				currentOptions.splice(stageIndex, 2);
				currentOptions[0] += `:${stage}`;
			}
		}

		try {
			await executeCommand(servicePath, currentOptions);
		} catch (error) {
			console.error(error);
		}
	}
};

main().catch((error) => {
	console.error(error);
});
