import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const LoanSummaryAggregator = ({ loans }) => {
  const [showAmortization, setShowAmortization] = useState(false);

  // Calculate totals
  const totalEMI = loans.reduce((acc, loan) => acc + loan.monthlyEMI, 0);
  const totalInterest = loans.reduce((acc, loan) => acc + loan.totalInterest, 0);
  const totalPrincipal = loans.reduce((acc, loan) => acc + loan.amount, 0);

  // Helper function to calculate the EMI, principal, and interest for each loan
  const calculateAmortization = (loan) => {
    const monthlyRate = loan.rate / 100 / 12;
    const schedule = [];
    let remainingBalance = loan.amount;

    for (let i = 1; i <= loan.tenure; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = loan.monthlyEMI - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month: i,
        interest: interestPayment,
        principal: principalPayment,
        remainingBalance: remainingBalance,
      });
    }

    return schedule;
  };

  // Aggregate amortization schedule across all loans
  const aggregatedAmortization = [];
  const totalTenure = Math.max(...loans.map((loan) => loan.tenure));

  for (let i = 1; i <= totalTenure; i++) {
    let monthInterest = 0;
    let monthPrincipal = 0;
    let remainingBalance = 0;

    loans.forEach((loan) => {
      const schedule = calculateAmortization(loan);
      if (i <= schedule.length) {
        monthInterest += schedule[i - 1].interest;
        monthPrincipal += schedule[i - 1].principal;
        remainingBalance += schedule[i - 1].remainingBalance;
      }
    });

    aggregatedAmortization.push({
      month: i,
      interest: monthInterest.toFixed(2),
      principal: monthPrincipal.toFixed(2),
      remainingBalance: Math.abs(remainingBalance).toFixed(2),
    });
  }

  return (
    <Card elevation={3} style={{ marginBottom: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Aggregated Loan Summary
        </Typography>
        <Divider style={{ marginBottom: '15px' }} />
        <Typography variant="subtitle1">
          <strong>Total Monthly EMI:</strong> ₹{totalEMI.toLocaleString('en-IN')}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Total Interest:</strong> ₹{totalInterest.toLocaleString('en-IN')}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Total Principal:</strong> ₹{totalPrincipal.toLocaleString('en-IN')}
        </Typography>
      </CardContent>

      <CardContent>
        <Button 
          onClick={() => setShowAmortization(!showAmortization)} 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '10px' }}
        >
          {showAmortization ? 'Hide Amortization' : 'Show Amortization'}
        </Button>
      </CardContent>

      {showAmortization && (
        <CardContent>
          <Typography variant="h6" style={{ marginBottom: '10px', color: '#34495e' }}>
            Aggregated Amortization Schedule
          </Typography>
          <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Month</strong></TableCell>
                  <TableCell align="right"><strong>Interest Paid</strong></TableCell>
                  <TableCell align="right"><strong>Principal Paid</strong></TableCell>
                  <TableCell align="right"><strong>Remaining Balance</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aggregatedAmortization.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">₹{Number(row.interest).toLocaleString('en-IN')}</TableCell>
                    <TableCell align="right">₹{Number(row.principal).toLocaleString('en-IN')}</TableCell>
                    <TableCell align="right">₹{Number(row.remainingBalance).toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      )}
    </Card>
  );
};

export default LoanSummaryAggregator;
