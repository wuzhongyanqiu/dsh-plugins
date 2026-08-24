# 个人 DeepSeek Harness 插件

中文 | [English](README.md)

这是为 `advanced_research` 工作区维护的公开 DeepSeek Harness 插件 Bundle。

## 已包含功能

### 统一 AI 额度

Bundle 提供：

- 模型工具 `query_ai_quota`；
- Web 设置中的 AI Quota 页面；
- 可选的输入框额度提示；
- Codex、Kimi、DeepSeek 和 OpenCode Go 的定时额度缓存。

Kimi 凭据按以下顺序解析：

1. `kimiApiKeyEnv` 指定的环境变量或 DSH 凭据引用；
2. `~/.kimi-code` 或 `~/.kimi` 下的 Kimi Code CLI OAuth 登录态。

随附 Profile patch 使用工作区中央凭据名称 `LLM_MOONSHOT_API_KEY`，仓库不会保存真实密钥。

## 安装

```sh
npx @deepseek-ai/dsh plugin --profile web add github:wuzhongyanqiu/dsh-plugins
```

Bundle 列表变化后需要重启 Web Profile。

## 配置

| 配置项 | 本 Bundle 默认值 | 作用 |
| --- | --- | --- |
| `timeoutMs` | `15000` | 单个提供商的查询超时，单位毫秒 |
| `refreshIntervalMs` | `120000` | Host 缓存刷新间隔；`0` 表示关闭 |
| `codexCli` | `codex` | Codex CLI 命令或绝对路径 |
| `deepseekApiKeyEnv` | `DEEPSEEK_API_KEY` | DeepSeek 凭据引用 |
| `kimiApiKeyEnv` | `LLM_MOONSHOT_API_KEY` | Kimi 凭据引用 |
| `opencodeGoApiKeyEnv` | `OPENCODE_GO_API_KEY` | OpenCode Go 凭据引用 |
| `kimiBaseUrl` | `https://api.kimi.com/coding/v1` | Kimi 额度接口基地址 |

## 外部插件

工作区采用的第三方插件记录在 [PLUGINS.md](PLUGINS.md)。它们保持为独立安装依赖，方便审查各自的更新和权限。

## 安全

- API Key 和 OAuth Token 不会出现在工具结果或 Remote 返回值中。
- 本仓库只保存凭据变量名。
- Git 依赖属于宿主机可信代码；需要可复现安装时应固定到已审查 commit。

## 来源

初始额度实现基于 MIT 许可的 [`Carrick-K7/dsh-ai-quota`](https://github.com/Carrick-K7/dsh-ai-quota)，详见 [NOTICE.md](NOTICE.md)。

## 许可

MIT
