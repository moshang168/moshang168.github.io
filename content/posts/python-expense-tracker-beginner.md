---
title: "Python 零基础实战：一步一步做一个命令行记账小程序"
date: 2026-11-01
draft: false
description: "从安装 Python、创建项目到保存 CSV 账目，带新手理解输入、循环、函数和文件读写，最后做出可运行的小工具。"
tags: ["编程", "Python", "零基础", "实战项目"]
categories: ["编程工具"]
cover: "/images/covers/code-python-expense.jpg"
---

## 这次要做什么

我们会写一个很小的命令行记账工具：输入金额和用途，程序把记录保存到 CSV 文件；输入 list 时查看账目。CSV 是一种普通表格文件格式，Excel 和多数表格软件都能打开。

这篇文章的重点不是做出专业财务软件，而是理解程序如何接收输入、检查数据、调用函数和保存文件。先使用虚拟测试数据，不要把真实银行卡信息或敏感账单放进练习文件。

![笔记本电脑上编写 Python 记账工具的插图](/images/covers/code-python-expense.jpg)

```mermaid
flowchart TD
  A[启动程序] --> B{输入命令}
  B -->|add| C[读取金额和用途]
  C --> D[检查金额]
  D --> E[追加到 CSV]
  B -->|list| F[读取并显示 CSV]
  B -->|quit| G[结束]
```

## 第一步：安装开发环境

从 [Python 官方下载页](https://www.python.org/downloads/) 安装 Python 3，再安装 [Visual Studio Code](https://code.visualstudio.com/Download)。在 VS Code 扩展页搜索并安装 Microsoft 发布的 Python 扩展。

新建一个文件夹，例如 my-expense-tracker，在 VS Code 里打开它，再创建 expense_tracker.py。第一次启动 VS Code 时，如果提示选择 Python 解释器，选你刚安装的 Python 3。

在终端运行：

```powershell
python --version
```

如果 Windows 找不到命令，可以尝试 py --version；如果仍失败，重新打开终端，或回到 Python 安装程序确认已加入 PATH。

## 第二步：认识程序的输入和函数

Python 里，input() 读取用户键入的文字，def 用来定义函数。把重复操作放进函数，主程序就更容易看懂。

把下面代码放入文件：

```python
import csv
from datetime import date
from decimal import Decimal, InvalidOperation
from pathlib import Path

DATA_FILE = Path("expenses.csv")

def add_expense():
    raw_amount = input("金额（例如 12.50）：").strip()
    category = input("用途（例如 午餐）：").strip()
    try:
        amount = Decimal(raw_amount)
        if amount <= 0:
            print("金额必须大于 0。")
            return
    except InvalidOperation:
        print("请输入有效数字，例如 12.50。")
        return

    file_exists = DATA_FILE.exists()
    with DATA_FILE.open("a", newline="", encoding="utf-8-sig") as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(["日期", "金额", "用途"])
        writer.writerow([date.today().isoformat(), f"{amount:.2f}", category])
    print("已保存一笔记录。")

def list_expenses():
    if not DATA_FILE.exists():
        print("还没有记录。")
        return
    with DATA_FILE.open("r", newline="", encoding="utf-8-sig") as file:
        for row in csv.reader(file):
            print(" | ".join(row))

def main():
    while True:
        command = input("输入 add、list 或 quit：").strip().lower()
        if command == "add":
            add_expense()
        elif command == "list":
            list_expenses()
        elif command == "quit":
            print("再见。")
            break
        else:
            print("没认出这个命令，请输入 add、list 或 quit。")

if __name__ == "__main__":
    main()
```

## 第三步：运行并试着记一笔

在 VS Code 终端输入：

```powershell
python expense_tracker.py
```

输入 add，金额写 12.50，用途写“午餐”；随后输入 list，你会看到标题行和刚保存的记录。关闭程序后再打开一次，记录仍然存在，因为它写进了 expenses.csv。

## 看懂关键代码

- import csv：让程序使用 Python 自带的 CSV 工具。
- Path("expenses.csv")：表示当前文件夹里的数据文件。
- try / except：尝试把文字转成数字；格式不对时显示提示，而不是让程序崩溃。
- while True：反复显示菜单，直到用户输入 quit。
- if __name__ == "__main__"：只有直接运行这个文件时，才启动主菜单。

这里用 Decimal 处理金额，比直接用二进制浮点数更适合简单账目。真实财务系统还需要备份、权限保护和更完整的数据校验。

## 可以继续练习的功能

你可以加一个“删除错误记录”功能、按月份筛选、统计总支出，或让程序识别分类。每次只加一件事，并先复制一份 CSV 备份。不要在还没理解原代码时一次性粘贴整套网上程序。

## 常见问题

**文件保存在哪里？**默认在你运行命令时所在的项目文件夹。VS Code 里先打开正确项目，再从该文件夹启动终端。

**中文乱码？**代码以 utf-8-sig 读写，常见电子表格软件通常能正确识别；若仍有问题，可用 UTF-8 格式导入 CSV。

**输入负数会怎样？**程序会提示金额必须大于 0，不写入文件。

官方资料：[Python 下载](https://www.python.org/downloads/)、[Python 教程](https://docs.python.org/3/tutorial/)、[VS Code Python 入门](https://code.visualstudio.com/docs/python/python-tutorial)。
