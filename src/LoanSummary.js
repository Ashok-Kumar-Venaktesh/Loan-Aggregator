import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, CardActions, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LoanSummary = ({ loan, onEdit }) => {
  const [showAmortization, setShowAmortization] = useState(false);

  const amortizationSchedule = [];
  let remainingBalance = loan.amount;
  const monthlyRate = loan.rate / 100 / 12;

  for (let i = 1; i <= loan.tenure; i++) {
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
      remainingBalance: Math.abs(remainingBalance).toFixed(2),
    });
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card elevation={3} style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            {loan.name} Summary
          </Typography>
          <Divider style={{ marginBottom: '10px' }} />
          <Typography><strong>Loan Amount:</strong> ₹{loan.amount.toLocaleString()}</Typography>
          <Typography><strong>Monthly EMI:</strong> ₹{loan.monthlyEMI.toFixed(2)}</Typography>
          <Typography><strong>Total Interest:</strong> ₹{loan.totalInterest.toFixed(2)}</Typography>
          <Typography><strong>Loan Type:</strong> {loan.loanType}</Typography>
          <Typography><strong>Start Date:</strong> {loan.startDate.toDateString()}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => setShowAmortization(!showAmortization)}>
            {showAmortization ? 'Hide Amortization' : 'Show Amortization'}
          </Button>
          <Button onClick={() => onEdit(loan)} style={{ marginLeft: 'auto' }}>Edit Loan</Button>
        </CardActions>

        {showAmortization && (
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
              Amortization Schedule
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
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
                  {amortizationSchedule.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>₹{row.interest}</TableCell>
                      <TableCell>₹{row.principal}</TableCell>
                      <TableCell>₹{row.remainingBalance}</TableCell>
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
