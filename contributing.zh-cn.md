# 贡献指南

[English](contributing.md) · [项目说明](readme.zh-cn.md)

参与 GimSell 前，请查看现有议题，避免与其他贡献者重复开发。议题和拉取请求都可以使用英文或简体中文。

请参照[缺陷报告模板](.github/issue_template/bug_report.md)填写[新缺陷报告](https://github.com/AMFI-Disable/GimSell_Gimkit-Seller/issues/new?title=%5BBUG%5D%20)。

## 验证方法

检查用户脚本语法，并在 Chrome 中打开测试储物柜。使用测试数据验证重复扫描、数量不明确以及页面切换。

```sh
node --check gimkit-seller.user.js
python3 tests/check-locker.py
```

## 提交拉取请求

说明改动对用户的影响，关联相关议题，并附上验证结果。提交说明的格式为 `type: three lowercase words`。在更新日志的 Unreleased 部分记录改动。发布验证通过后，版本标签使用 `vMAJOR.MINOR.PATCH` 格式。
