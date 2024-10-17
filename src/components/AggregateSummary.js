import React from 'react';
import { Paper, Typography } from '@mui/material';

const AggregateSummary = ({ loans }) => {
  const totalEMI = loans.reduce((acc, loan) => acc + parseFloat(loan.monthlyEMI), 0).toFixed(2);
  const totalInterest = loans.reduce((acc, loan) => acc + parseFloat(loan.totalInterest), 0).toFixed(2);

  // Calculate the latest closure date among all loans
  const closureDate = loans.reduce((latest, loan) => {
    return new Date(loan.closureDate) > latest ? new Date(loan.closureDate) : latest;
  }, new Date());

  return (
    <Paper style={{ padding: 16, marginTop: 20 }}>
      <Typography variant="h6">Aggregated Summary</Typography>
      <Typography>Total Monthly EMI: ${totalEMI}</Typography>
      <Typography>Total Interest: ${totalInterest}</Typography>
      <Typography>Estimated Closure Date: {closureDate.toDateString()}</Typography>
    </Paper>
  );
};

export default AggregateSummary;
