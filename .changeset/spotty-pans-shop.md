---
"p": minor
---

feat: 支持用 Claude Code 等 AI CLI 打开项目，默认 ide 改为 claude

- `openWithIDE` 识别终端 TUI 命令（claude, codex, gemini, aider）：以 cwd 进入目录、继承 stdio 前台运行，路径为文件时进入其所在目录
- 默认配置 `ide: claude`，所有打开项目的命令（new/open/clone/copy/recent 等）在 TUI 模式下跳过 spinner，避免污染交互界面
- `p new` 新增 `-i, --ide <ide>` 选项，临时指定打开方式（如 `p new foo -i cursor`）
- `p recent` 打开项目前先释放 stdin/恢复终端状态，避免与 TUI 抢占键盘输入
