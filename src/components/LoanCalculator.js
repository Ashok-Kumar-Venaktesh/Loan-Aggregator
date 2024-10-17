// App.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [breakdown, setBreakdown] = useState([]);

  const calculateLoan = () => {
    const loanAmount = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const loanTermInMonths = parseFloat(years) * 12;

    const x = Math.pow(1 + monthlyRate, loanTermInMonths);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);

    if (!isFinite(monthly)) {
      alert('Please check your inputs.');
      return;
    }

    const totalPay = (monthly * loanTermInMonths).toFixed(2);
    const totalInt = (totalPay - loanAmount).toFixed(2);
    setMonthlyPayment(monthly.toFixed(2));
    setTotalPayment(totalPay);
    setTotalInterest(totalInt);

    let remainingBalance = loanAmount;
    const breakdownArray = [];

    for (let i = 1; i <= loanTermInMonths; i++) {
      const interestForMonth = (remainingBalance * monthlyRate).toFixed(2);
      const principalForMonth = (monthly - interestForMonth).toFixed(2);
      remainingBalance = (remainingBalance - principalForMonth).toFixed(2);

      breakdownArray.push({
        month: i,
        interest: interestForMonth,
        principal: principalForMonth,
        remainingBalance: Math.abs(remainingBalance).toFixed(2)
      });
    }

    setBreakdown(breakdownArray);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Personal Loan Calculator</Typography>

      <TextField
        label="Loan Amount"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        margin="normal"
        type="number"
      />

      <TextField
        label="Annual Interest Rate (%)"
        fullWidth
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        margin="normal"
        type="number"
        step="0.01"
      />

      <TextField
        label="Loan Term (Years)"
        fullWidth
        value={years}
        onChange={(e) => setYears(e.target.value)}
        margin="normal"
        type="number"
      />

      <Button variant="contained" color="primary" onClick={calculateLoan} fullWidth>
        Calculate
      </Button>

      {monthlyPayment && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Results</Typography>
          <Typography>Monthly Payment: ${monthlyPayment}</Typography>
          <Typography>Total Payment: ${totalPayment}</Typography>
          <Typography>Total Interest: ${totalInterest}</Typography>

          <Typography variant="h6" style={{ marginTop: '20px' }}>Monthly Breakdown</Typography>
          <TableContainer component={Paper} style={{ marginTop: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {breakdown.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>${row.interest}</TableCell>
                    <TableCell>${row.principal}</TableCell>
                    <TableCell>${row.remainingBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Container>
  );
};

export default LoanCalculator;
