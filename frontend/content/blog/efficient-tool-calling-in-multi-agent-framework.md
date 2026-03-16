---
title: Efficient Tool calling in Multi-agent framework
slug: efficient-tool-calling-in-multi-agent-framework
description: How to ensure your agent calls different tools in efficient time?
author: Mukesh Barnwal
date: '2026-03-16'
tags:
  - '#AI #Agents #Tools'
published: true
---
The key is to make the agent’s communication with the tools asynchronous so that when tools are called, the second tool call happens without waiting for the first tool process to end. Ultimately, when all the tools run, the agent gets the required information from the tools.

To write this in Python, we use async def to define the function, write the required tool call, and apply await so that execution moves to different tool functions and arrives back when it finishes. All of this is controlled and managed by the event loop (or a manager). In Python, we run this using asyncio.run(...).

This kind of asynchronous communication enables higher throughput as it allows more agents to interact with the tools (via MCP), and lower latency as agents can get faster output from the tools through asynchronous communication.

It is surprising that every AI concept now boils down to software engineering principles, including design patterns, networking, communication, and system design.
