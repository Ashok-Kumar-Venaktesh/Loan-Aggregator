import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import LoanForm from './LoanForm';
import LoanSummary from './LoanSummary';
import LoanSummaryAggregator from './LoanSummaryAggregator';

const App = () => {
  const [loans, setLoans] = useState([
    {
      name: 'Home Loan',
      amount: 9875111,
      startDate: new Date('2023-12-05'),
      tenure: 140,
      loanType: 'Home Loan',
      rate: 9.3,
      monthlyEMI: 124100.98,
      totalInterest: 7392147.2,
    },
    {
      name: 'ICICI Personal Loan',
      amount: 575000,
      startDate: new Date('2023-08-05'),
      tenure: 84,
      loanType: 'Personal Loan',
      rate: 13.99,
      monthlyEMI: 9867.62,
      totalInterest: 253211.68,
    },
    {
      name: 'Axis Personal Loan',
      amount: 1000000,
      startDate: new Date('2022-08-05'),
      tenure: 60,
      loanType: 'Personal Loan',
      rate: 10.99,
      monthlyEMI: 21713.59,
      totalInterest: 302815.4,
    },
    {
      name: 'HDFC Personal Loan',
      amount: 675000,
      startDate: new Date('2023-07-05'),
      tenure: 36,
      loanType: 'Personal Loan',
      rate: 10.99,
      monthlyEMI: 21945.58,
      totalInterest: 115372.88,
    }
  ]);

  const [currentLoan, setCurrentLoan] = useState(null);

  const addLoan = (newLoan) => {
    setLoans([...loans, newLoan]);
  };

  const editLoan = (loan) => {
    setCurrentLoan(loan);
  };

  const updateLoan = (updatedLoan) => {
    setLoans(loans.map((loan) => (loan.name === updatedLoan.name ? updatedLoan : loan)));
    setCurrentLoan(null);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        {/* Aggregated Loan Summary */}
        <Grid item xs={12}>
          <LoanSummaryAggregator loans={loans} />
        </Grid>

        {/* Loan Form */}
        <Grid item xs={12}>
          <LoanForm addLoan={addLoan} currentLoan={currentLoan} updateLoan={updateLoan} />
        </Grid>

        {/* Display all loans */}
        {loans.map((loan, index) => (
          <LoanSummary key={index} loan={loan} onEdit={editLoan} />
        ))}
      </Grid>
    </Container>
  );
};

export default App;
