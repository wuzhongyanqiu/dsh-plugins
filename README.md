# Personal DeepSeek Harness Plugins

[中文](README.zh-CN.md) | English

Public DeepSeek Harness plugin bundle maintained for the `advanced_research` workspace.

## Included feature

### Unified AI quota

The bundle adds:

- the `query_ai_quota` model tool;
- an AI Quota page in Web Settings;
- an optional composer quota indicator;
- cached Codex, Kimi, DeepSeek, and OpenCode Go usage queries.

Kimi credentials resolve in this order:

1. the environment or DSH credential reference named by `kimiApiKeyEnv`;
2. the Kimi Code CLI OAuth files under `~/.kimi-code` or `~/.kimi`.

The shipped profile patch uses `LLM_MOONSHOT_API_KEY`, matching the central credential name in the workspace. No credential value is committed.

## Install

```sh
npx @deepseek-ai/dsh plugin --profile web add github:wuzhongyanqiu/dsh-plugins
```

Restart the Web profile after changing its Bundle list.

## Configuration

| Key | Default in this bundle | Meaning |
| --- | --- | --- |
| `timeoutMs` | `15000` | Per-provider query timeout in milliseconds |
| `refreshIntervalMs` | `120000` | Host cache refresh interval; `0` disables it |
| `codexCli` | `codex` | Codex CLI command or absolute path |
| `deepseekApiKeyEnv` | `DEEPSEEK_API_KEY` | DeepSeek credential reference |
| `kimiApiKeyEnv` | `LLM_MOONSHOT_API_KEY` | Kimi credential reference |
| `opencodeGoApiKeyEnv` | `OPENCODE_GO_API_KEY` | OpenCode Go credential reference |
| `kimiBaseUrl` | `https://api.kimi.com/coding/v1` | Kimi usage API base URL |

## External plugins

Third-party plugins adopted by the workspace are tracked in [PLUGINS.md](PLUGINS.md). They remain independently installed dependencies so their upstream updates and permissions stay visible.

## Security

- API keys and OAuth tokens are never included in tool or Remote results.
- This repository contains only credential reference names.
- Git dependencies execute as trusted host code. Pin a reviewed commit when reproducibility matters.

## Attribution

The initial quota implementation is derived from the MIT-licensed [`Carrick-K7/dsh-ai-quota`](https://github.com/Carrick-K7/dsh-ai-quota). See [NOTICE.md](NOTICE.md).

## License

MIT
