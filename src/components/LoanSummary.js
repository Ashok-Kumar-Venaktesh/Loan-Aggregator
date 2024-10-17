import React, { useState } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const LoanSummary = ({ loan, onEdit }) => {
  const [showAmortization, setShowAmortization] = useState(false); // Toggle state for amortization

  const amortizationSchedule = [];
  let remainingBalance = loan.amount;
  const monthlyRate = loan.rate / 100 / 12;

  for (let i = 1; i <= loan.months; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = loan.monthlyEMI - interestPayment;
    remainingBalance -= principalPayment;

    const paymentDate = new Date(loan.startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);

    amortizationSchedule.push({
      month: i,
      date: paymentDate.toDateString(),
      interest: interestPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      balance: Math.abs(remainingBalance).toFixed(2),
    });
  }

  return (
    <Grid item xs={12}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6">{loan.name} Summary</Typography>
        <Typography>Loan Amount: {formatCurrency(loan.amount)}</Typography>
        <Typography>Monthly EMI: {formatCurrency(loan.monthlyEMI)}</Typography>
        <Typography>Total Interest: {formatCurrency(loan.totalInterest)}</Typography>
        <Typography>Start Date: {loan.startDate.toDateString()}</Typography>
        <Typography>End Date: {loan.endDate.toDateString()}</Typography>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setShowAmortization(!showAmortization)}
          style={{ marginTop: '20px' }}
        >
          {showAmortization ? 'Hide Amortization' : 'Show Amortization'}
        </Button>

        {showAmortization && (
          <div>
            <Typography variant="h6" style={{ marginTop: '20px' }}>Amortization Schedule</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Interest Paid</TableCell>
                    <TableCell>Principal Paid</TableCell>
                    <TableCell>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationSchedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{formatCurrency(row.interest)}</TableCell>
                      <TableCell>{formatCurrency(row.principal)}</TableCell>
                      <TableCell>{formatCurrency(row.balance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        
        <Button 
          variant="outlined" 
          color="primary" 
          style={{ marginTop: '20px' }} 
          onClick={() => onEdit(loan)}
        >
          Edit Loan
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoanSummary;
