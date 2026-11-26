# Contributing

[中文文档](contributing.zh-cn.md) · [Project Guide](readme.md)

Before working on GimSell, check open issues and coordinate overlapping changes. Issues and pull requests accept English or Simplified Chinese.

Use the [bug report outline](.github/issue_template/bug_report.md) to [open a bug report](https://github.com/AMFI-Disable/GimSell_Gimkit-Seller/issues/new?title=%5BBUG%5D%20).

## Verification

Check the userscript syntax and exercise the sample locker in Chrome. Cover rescans, uncertain quantities and navigation without using a real account.

```sh
node --check gimkit-seller.user.js
python3 tests/check-locker.py
```

## Preparing A Pull Request

Describe the observable change, link related issues and include test results. Keep commit messages in the form `type: three lowercase words`. Record changes under Unreleased. Release tags use `vMAJOR.MINOR.PATCH` after verification.
