# Adopted Plugins

This catalog records third-party DeepSeek Harness plugins used by the workspace. They are not vendored into this repository.

| Plugin | Source | Reviewed version | Purpose | Operational note |
| --- | --- | --- | --- | --- |
| `dsh-vision-router` | `ysr666/dsh-vision-router` | `1.7.7` | Vision routing and image tools | MIT; anonymous OVH fallback is free but sends selected images to OVHcloud and is rate-limited |
| `@tencent-connect/dsh-qqbot` | `tencent-connect/dsh-qqbot` | `0.4.0` | QQ private/group message channel | MIT; requires QQ Bot AppID/AppSecret or first-run QR binding |

Install reviewed releases through the official DSH Profile manager:

```sh
npx @deepseek-ai/dsh plugin --profile web add dsh-vision-router@1.7.7
npx @deepseek-ai/dsh plugin --profile qqbot add @tencent-connect/dsh-qqbot@0.4.0
```
