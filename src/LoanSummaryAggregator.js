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
import { numberToWords } from './utility';  // Utility for number to words conversion

// Amortization calculation for a loan
const calculateAmortization = (loan) => {
  const { amount, interestRate, tenure, frequency } = loan;
  const monthlyRate = (interestRate / 100) / 12; // Monthly interest rate
  const totalPayments = tenure * 12; // Total number of months

  let amortizationSchedule = [];
  let remainingBalance = amount;

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const emi = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments)); // EMI formula
    const principalPayment = emi - interestPayment;

    remainingBalance -= principalPayment;

    amortizationSchedule.push({
      month: i,
      interest: interestPayment,
      principal: principalPayment,
      remainingBalance: remainingBalance < 0 ? 0 : remainingBalance,
    });
  }

  return amortizationSchedule;
};

const LoanSummaryAggregator = ({ loans }) => {
  const [showAmortization, setShowAmortization] = useState(false);

  // Correct total principal calculation
  const totalPrincipal = loans.reduce((acc, loan) => acc + loan.amount, 0);
  
  // Calculate totals for EMI and interest
  const totalEMI = loans.reduce((acc, loan) => acc + loan.monthlyEMI, 0);
  const totalInterest = loans.reduce((acc, loan) => acc + loan.totalInterest, 0);

  // Function to calculate estimated loan end date for each loan
  const calculateLoanEndDate = (startDate, tenure) => {
    const loanStart = new Date(startDate);
    loanStart.setMonth(loanStart.getMonth() + tenure); // Adding the tenure in months
    return loanStart;
  };

  // Find the latest loan completion date
  const loanEndDates = loans.map((loan) => calculateLoanEndDate(loan.startDate, loan.tenure));
  const latestCompletionDate = new Date(Math.max(...loanEndDates.map((date) => date.getTime())));

  // Format the completion date (e.g., "July 2035")
  const completionDateString = latestCompletionDate.toLocaleString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

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
          <strong>Total Monthly EMI:</strong> ₹{totalEMI.toLocaleString('en-IN')} ({numberToWords(totalEMI)})
        </Typography>
        <Typography variant="subtitle1">
          <strong>Total Interest:</strong> ₹{totalInterest.toLocaleString('en-IN')} ({numberToWords(totalInterest)})
        </Typography>
        <Typography variant="subtitle1">
          <strong>Total Principal:</strong> ₹{totalPrincipal.toLocaleString('en-IN')} ({numberToWords(totalPrincipal)})
        </Typography>
        <Typography variant="subtitle1">
          <strong>Estimated Completion Date for All Loans:</strong> {completionDateString}
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
                    <TableCell align="right">₹{Number(row.interest).toLocaleString('en-IN')} ({numberToWords(Number(row.interest))})</TableCell>
                    <TableCell align="right">₹{Number(row.principal).toLocaleString('en-IN')} ({numberToWords(Number(row.principal))})</TableCell>
                    <TableCell align="right">₹{Number(row.remainingBalance).toLocaleString('en-IN')} ({numberToWords(Number(row.remainingBalance))})</TableCell>
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
