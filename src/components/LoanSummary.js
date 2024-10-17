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
  Button,
  Card,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const LoanSummary = ({ loan, onEdit }) => {
  const [showAmortization, setShowAmortization] = useState(false);

  const amortizationSchedule = [];
  let remainingBalance = loan.amount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  const monthlyRate = loan.rate / 100 / 12;

  for (let i = 1; i <= loan.tenure; i++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = loan.monthlyEMI - interestPayment;
    remainingBalance -= principalPayment;

    totalInterestPaid += interestPayment;
    totalPrincipalPaid += principalPayment;

    const paymentDate = new Date(loan.startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);

    amortizationSchedule.push({
      month: i,
      date: paymentDate.toDateString(),
      interest: interestPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      remainingBalance: Math.abs(remainingBalance).toFixed(2),
      totalInterestPaid: totalInterestPaid.toFixed(2),
      totalPrincipalPaid: totalPrincipalPaid.toFixed(2),
      remainingInterest: Math.max(0, (loan.totalInterest - totalInterestPaid)).toFixed(2)
    });
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card elevation={3} style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            {loan.name} Summary
          </Typography>
          <Divider style={{ marginBottom: '10px' }} />
          <Typography variant="body1"><strong>Loan Amount:</strong> {formatCurrency(loan.amount)}</Typography>
          <Typography variant="body1"><strong>Monthly EMI:</strong> {formatCurrency(loan.monthlyEMI)}</Typography>
          <Typography variant="body1"><strong>Total Interest:</strong> {formatCurrency(loan.totalInterest)}</Typography>
          <Typography variant="body1"><strong>Loan Type:</strong> {loan.loanType}</Typography>
          <Typography variant="body1"><strong>Start Date:</strong> {loan.startDate ? loan.startDate.toDateString() : 'N/A'}</Typography>
          <Typography variant="body1"><strong>End Date:</strong> {loan.endDate ? loan.endDate.toDateString() : 'N/A'}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAmortization(!showAmortization)}
            style={{ marginLeft: '10px' }}
          >
            {showAmortization ? 'Hide Amortization' : 'Show Amortization'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onEdit(loan)}
            style={{ marginLeft: 'auto' }}
          >
            Edit Loan
          </Button>
        </CardActions>

        {showAmortization && (
          <CardContent>
            <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '10px' }}>
              Amortization Schedule
            </Typography>
            <Divider style={{ marginBottom: '10px' }} />
            <TableContainer component={Paper} elevation={0} style={{ maxHeight: '300px', overflow: 'auto' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Interest Paid</TableCell>
                    <TableCell>Principal Paid</TableCell>
                    <TableCell>Remaining Balance</TableCell>
                    <TableCell>Total Interest Paid</TableCell>
                    <TableCell>Total Principal Paid</TableCell>
                    <TableCell>Remaining Interest</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationSchedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{formatCurrency(row.interest)}</TableCell>
                      <TableCell>{formatCurrency(row.principal)}</TableCell>
                      <TableCell>{formatCurrency(row.remainingBalance)}</TableCell>
                      <TableCell>{formatCurrency(row.totalInterestPaid)}</TableCell>
                      <TableCell>{formatCurrency(row.totalPrincipalPaid)}</TableCell>
                      <TableCell>{formatCurrency(row.remainingInterest)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

export default LoanSummary;
