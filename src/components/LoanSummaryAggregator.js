import React, { useState } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const LoanSummaryAggregator = ({ loans }) => {
  const [showAmortization, setShowAmortization] = useState(false);

  const totalEMI = loans.reduce((sum, loan) => sum + parseFloat(loan.monthlyEMI), 0);

  const combinedAmortization = [];
  loans.forEach((loan) => {
    let remainingBalance = loan.amount;
    const monthlyRate = loan.rate / 100 / 12;

    for (let i = 1; i <= loan.months; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = loan.monthlyEMI - interestPayment;
      remainingBalance -= principalPayment;

      if (!combinedAmortization[i]) {
        combinedAmortization[i] = {
          month: i,
          interest: 0,
          principal: 0,
        };
      }

      combinedAmortization[i].interest += parseFloat(interestPayment.toFixed(2));
      combinedAmortization[i].principal += parseFloat(principalPayment.toFixed(2));
    }
  });

  return (
    <Grid item xs={12}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6">Overall Loan Summary</Typography>
        <Typography>Total Loans: {loans.length}</Typography>
        <Typography>Total Monthly EMI: {formatCurrency(totalEMI)}</Typography>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setShowAmortization(!showAmortization)}
          style={{ marginTop: '20px' }}
        >
          {showAmortization ? 'Hide Amortization' : 'Show Amortization'}
        </Button>

        {showAmortization && (
          <TableContainer style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Interest Paid</TableCell>
                  <TableCell>Principal Paid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {combinedAmortization.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{formatCurrency(row.interest)}</TableCell>
                    <TableCell>{formatCurrency(row.principal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Grid>
  );
};

export default LoanSummaryAggregator;
