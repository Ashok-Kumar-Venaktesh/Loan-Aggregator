import React, { useState } from 'react';
import LoanForm from './components/LoanForm';
import LoanSummary from './components/LoanSummary';
import LoanSummaryAggregator from './components/LoanSummaryAggregator';
import { Grid, Container } from '@mui/material';

const App = () => {
  const [loans, setLoans] = useState([]);
  const [currentLoan, setCurrentLoan] = useState(null);

  const addLoan = (newLoan) => {
    setLoans([...loans, newLoan]);
  };

  const updateLoan = (updatedLoan) => {
    setLoans(loans.map((loan) => (loan.name === currentLoan.name ? updatedLoan : loan)));
    setCurrentLoan(null);
  };

  const editLoan = (loan) => {
    setCurrentLoan(loan);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LoanSummaryAggregator loans={loans} /> {/* Aggregated Loan Summary */}
        </Grid>
        
        <Grid item xs={12}>
          <LoanForm addLoan={addLoan} currentLoan={currentLoan} updateLoan={updateLoan} />
        </Grid>
        
        {loans.map((loan, index) => (
          <LoanSummary key={index} loan={loan} onEdit={editLoan} />
        ))}
      </Grid>
    </Container>
  );
};

export default App;
