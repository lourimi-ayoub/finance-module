"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  async function fetchSummary() {
    const res = await fetch("/api/summary?tenantId=YOUR_TENANT_ID");
    const data = await res.json();
    setSummary(data);
  }

  useEffect(() => {
    (async () => {
      await fetchSummary();
    })();
  }, []);

  return (
    <main>
      <h1>Finance Module</h1>
      <div>
        <p>Total Income: {summary.totalIncome}</p>
        <p>Total Expense: {summary.totalExpense}</p>
        <p>Balance: {summary.balance}</p>
      </div>
    </main>
  );
}
