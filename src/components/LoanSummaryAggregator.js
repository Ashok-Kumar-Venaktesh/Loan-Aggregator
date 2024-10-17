import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';

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
  const totalPrincipalPaid = loans.reduce((sum, loan) => sum + (loan.amount - loan.remainingBalance), 0);
  const totalInterestPaid = loans.reduce((sum, loan) => sum + parseFloat(loan.totalInterest), 0);

  const combinedAmortization = [];
  loans.forEach((loan) => {
    let remainingBalance = loan.amount;
    let totalInterestPaid = 0;
    const monthlyRate = loan.rate / 100 / 12;

    for (let i = 1; i <= loan.months; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = loan.monthlyEMI - interestPayment;
      remainingBalance -= principalPayment;

      totalInterestPaid += interestPayment;

      if (!combinedAmortization[i]) {
        combinedAmortization[i] = {
          month: i,
          totalInterestPaid: 0,
          totalPrincipalPaid: 0,
          remainingInterest: 0
        };
      }

      combinedAmortization[i].totalInterestPaid += interestPayment;
      combinedAmortization[i].totalPrincipalPaid += principalPayment;
      combinedAmortization[i].remainingInterest += Math.max(0, (loan.totalInterest - totalInterestPaid));
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
                  <TableCell>Total Interest Paid</TableCell>
                  <TableCell>Total Principal Paid</TableCell>
                  <TableCell>Remaining Interest</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {combinedAmortization.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{formatCurrency(row.totalInterestPaid)}</TableCell>
                    <TableCell>{formatCurrency(row.totalPrincipalPaid)}</TableCell>
                    <TableCell>{formatCurrency(row.remainingInterest)}</TableCell>
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
