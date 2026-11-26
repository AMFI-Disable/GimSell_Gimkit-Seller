# GimSell

[English](readme.md) · [贡献指南](contributing.zh-cn.md) · [更新日志](changelog.md) · [安全政策](security.md)

[![Website: Live](https://img.shields.io/badge/Website-Live-66BB6A.svg?style=flat-square)](https://amfi-disable.github.io/GimSell_Gimkit-Seller/)
[![Browser: Chrome / Firefox / Safari](https://img.shields.io/badge/Browser-Chrome%20%7C%20Firefox%20%7C%20Safari-blue.svg?style=flat-square&logo=googlechrome)](https://google.com/chrome)
[![Manager: Tampermonkey](https://img.shields.io/badge/Manager-Tampermonkey%20%7C%20Violentmonkey-orange.svg?style=flat-square&logo=tampermonkey)](https://tampermonkey.net)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](license)
[![Privacy: 100% Client-Side](https://img.shields.io/badge/Privacy-100%25%20Client--Side-purple.svg?style=flat-square)](#功能和使用范围)

## 星标历史

<a href="https://www.star-history.com/?type=date&repos=amfi-disable%2Fgimsell_gimkit-seller">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=amfi-disable%2Fgimsell_gimkit-seller&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=amfi-disable%2Fgimsell_gimkit-seller&type=date&legend=top-left" />
    <img alt="AMFI-Disable/GimSell_Gimkit-Seller Star History Chart" src="https://api.star-history.com/chart?repos=amfi-disable%2Fgimsell_gimkit-seller&type=date&legend=top-left" />
  </picture>
</a>

## 功能和使用范围

GimSell 在 Gimkit 的 `/rewards/locker` 页面显示一个可收起的面板，帮助你找出当前视图中超过一件的装饰品。该脚本适用于学习、研究和个人物品核对。使用时请遵守平台规则。

1. 打开储物柜，用面板扫描当前可见的物品。结果列出可读的数量及超过一件的份数。
2. 如决定出售，请在 Gimkit 自带的界面选择数量并确认。
3. 再扫描一次即可比较前后数量。面板会单独标明已被筛选掉的卡片、缺少数量的卡片及读数有歧义的卡片。

记录只保存在当前页面的内存中，离开储物柜时即清除。可单击面板的关闭按钮将它收起到右下角，再单击锁形图标展开。

## 快捷键

| 系统 | 显示或隐藏面板 |
| --- | --- |
| macOS | `Option + S` 或 `Option + G` |
| Windows、Linux | `Alt + S` 或 `Alt + G` |

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)。
2. 打开仓库中的 `gimkit-seller.user.js` 并复制完整源码。
3. 在脚本管理器中新建脚本，粘贴源码并保存。
4. 打开 [Gimkit 储物柜](https://www.gimkit.com/rewards/locker)，面板会自动出现。

## 许可

本项目采用 [MIT 许可证](license)。
