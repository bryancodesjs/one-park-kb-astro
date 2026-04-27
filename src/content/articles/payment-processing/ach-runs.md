---
title: Daily ACH Runs
dateCreated: '2026-04-23'
summary: When ACH runs go out, posting timing, and how to handle returned items.
tags: [payment, ach, processing]
readTime: 3 min
order: 1
quickAccess: true
---

<h2>Schedule</h2>
<p>ACH files are released at 3:00 PM ET, Monday–Friday. Funds typically post within 1–2 business days.</p>

<h2>Returns</h2>
<ul>
  <li>R01 (insufficient funds) — auto-retry once after 3 business days.</li>
  <li>R02 (account closed) — outreach required, no retry.</li>
  <li>R10 (unauthorized) — escalate immediately to compliance.</li>
</ul>
