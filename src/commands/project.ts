import { spinner } from "@clack/prompts";
import { Command } from "commander";
import fse from "fs-extra";
import pc from "picocolors";

import { loadConfig } from "../core/config";
import { PROJECTS_DIR } from "../utils/paths";
import { isTUICommand, openWithIDE } from "../utils/shell";
import { brand, printError } from "../utils/ui";

export const projectCommand = new Command("project")
	.alias("projects")
	.description("打开项目目录")
	.action(async () => {
		const config = loadConfig();

		// 确保 projects 目录存在
		await fse.ensureDir(PROJECTS_DIR);

		if (isTUICommand(config.ide)) {
			// TUI（如 claude）前台运行，不能用 spinner
			try {
				await openWithIDE(config.ide, PROJECTS_DIR);
			} catch (error) {
				printError((error as Error).message);
				console.log(pc.dim("  项目目录: ") + pc.underline(PROJECTS_DIR));
				process.exit(1);
			}
			return;
		}

		const s = spinner();
		s.start(`正在用 ${config.ide} 打开项目目录...`);

		try {
			await openWithIDE(config.ide, PROJECTS_DIR);
			s.stop(
				`${brand.success("✓")} 已打开项目目录: ${brand.primary(PROJECTS_DIR)}`,
			);
		} catch (error) {
			s.stop("打开失败");
			console.log();
			printError((error as Error).message);
			console.log();
			console.log(pc.dim("  项目目录: ") + pc.underline(PROJECTS_DIR));
			console.log();
			process.exit(1);
		}
	});
