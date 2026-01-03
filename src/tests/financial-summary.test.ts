test('balance calculation', () => {
  const transactions = [
    { type: 'INCOME', amount: 1000 },
    { type: 'EXPENSE', amount: 400 }
  ];

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((a,b) => a+ b.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((a,b) => a+ b.amount, 0);
  const balance = totalIncome - totalExpense;

  expect(balance).toBe(600);
});
