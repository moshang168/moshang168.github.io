---
title: "Ventoy 新手教程：一个 U 盘装多个系统镜像"
date: 2026-11-01
draft: false
description: "学会下载 Ventoy、正确识别 U 盘、安装启动盘并复制 ISO 镜像；说明数据清除、启动菜单和常见问题。"
tags: ["开源软件", "Ventoy", "U盘启动", "Windows"]
categories: ["开源工具"]
cover: "/images/covers/software-ventoy.jpg"
---

## Ventoy 的方便之处

常见启动盘工具会把一个镜像写进 U 盘；换一个系统镜像时，通常要重新制作。Ventoy 的用法不同：先在 U 盘上安装 Ventoy，之后把 ISO 等镜像文件像普通文件一样复制进去，开机时再从列表选择要启动的镜像。

它适合维护系统安装盘、救援盘或 Linux 体验盘。镜像文件仍需从相应操作系统的官方来源获取，Ventoy 不会替你提供系统镜像。

![多个系统镜像文件复制到 Ventoy U 盘的插图](/images/covers/software-ventoy.jpg)

```mermaid
flowchart LR
  A[备份 U 盘文件] --> B[运行 Ventoy2Disk]
  B --> C[选中正确 U 盘]
  C --> D[安装并格式化启动分区]
  D --> E[复制 ISO 镜像文件]
  E --> F[开机选择镜像启动]
```

## 下载与准备

访问 [Ventoy 官方下载页](https://www.ventoy.net/en/download.html)，选择 Windows 压缩包下载并解压。官方提供 Windows 启动盘工具和命令行说明，可参阅[快速入门](https://www.ventoy.net/en/doc_start.html)。

准备一个容量足够且没有需要保留数据的 U 盘。**安装 Ventoy 会重新分区并格式化所选 U 盘，原有文件可能全部丢失。**先把文件复制到电脑或其他硬盘，并确认备份可打开。拔掉其他移动硬盘和 U 盘，减少误选风险。

## 在 Windows 上安装 Ventoy

1. 右键运行 Ventoy2Disk.exe，必要时选择以管理员身份运行。
2. 查看设备容量和盘符，确认列表里选的是目标 U 盘。
3. 再核对一次盘符，点击 Install。
4. 按提示确认格式化。完成后可安全弹出并重新插入 U 盘。
5. 打开 U 盘，在根目录复制你信任的 ISO 镜像文件。

安装工具有 Install 和 Update 等操作。初次使用点 Install；更新已有 Ventoy 时也先备份 U 盘里的镜像和资料，再按官方说明操作。不要对电脑系统盘点安装。

## 使用 U 盘启动

重启电脑，在开机时按主板或笔记本的启动菜单键。按键因品牌而异，可能是 F12、F11、Esc 或其他键；看开机提示或设备说明书。选择 U 盘对应的 UEFI 启动项，进入 Ventoy 菜单后选择要启动的镜像。

如果启动失败，先在 BIOS/UEFI 中确认 USB 启动顺序和 Secure Boot 设置。Ventoy 支持 Secure Boot 的流程可能需要额外确认或登记密钥；仔细阅读官方说明，不要在不理解的情况下关闭安全启动或改动磁盘设置。

## 以后怎么换镜像

需要新系统时，将新的 ISO 文件复制到 U 盘；不需要时可以像删除普通文件一样移除镜像。不同系统镜像对启动方式的支持不同，遇到某个 ISO 无法启动时，查看 Ventoy 兼容说明和该镜像发布方的建议。

## 常见问题

**启动菜单里没有 U 盘：**换 USB 接口、检查启动菜单键、确认 U 盘已由 Ventoy 安装，并在固件设置里检查 USB 启动权限。

**列表没有显示刚复制的 ISO：**确认文件复制完成、扩展名没有变成 .iso.txt，并尝试安全弹出后重新插入。

**镜像启动后报错：**重新从系统官方站点下载镜像并核对校验值；损坏或被修改的镜像不要继续使用。

**装错了磁盘：**如果还没确认格式化，立即取消。已完成格式化则不要继续写入该盘，先评估是否需要专业数据恢复。

官方资料：[Ventoy 下载](https://www.ventoy.net/en/download.html)、[快速入门](https://www.ventoy.net/en/doc_start.html)。
