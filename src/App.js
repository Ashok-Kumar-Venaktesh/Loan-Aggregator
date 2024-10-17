import React, { useState } from 'react';
import LoanForm from './components/LoanForm';
import LoanSummary from './components/LoanSummary';
import LoanSummaryAggregator from './components/LoanSummaryAggregator';
import { Grid, Container } from '@mui/material';

const App = () => {
  // Initial loans data
  const [loans, setLoans] = useState([
    {
      name: 'Home Loan',
      amount: 9875111,
      startDate: new Date('2023-12-05'),
      tenure: 140, // months
      frequency: 'monthly',
      rate: 9.3,
      monthlyEMI: calculateEMI(9875111, 9.3, 140),
      totalInterest: calculateTotalInterest(9875111, 9.3, 140)
    },
    {
      name: 'ICICI Personal Loan',
      amount: 575000,
      startDate: new Date('2023-08-05'),
      tenure: 7 * 12, // 7 years in months
      frequency: 'monthly',
      rate: 13.99,
      monthlyEMI: calculateEMI(575000, 13.99, 7 * 12),
      totalInterest: calculateTotalInterest(575000, 13.99, 7 * 12)
    },
    {
      name: 'Axis Personal Loan',
      amount: 1000000,
      startDate: new Date('2022-08-05'),
      tenure: 5 * 12, // 5 years in months
      frequency: 'monthly',
      rate: 10.99,
      monthlyEMI: calculateEMI(1000000, 10.99, 5 * 12),
      totalInterest: calculateTotalInterest(1000000, 10.99, 5 * 12)
    },
    {
      name: 'HDFC Personal Loan',
      amount: 675000,
      startDate: new Date('2023-07-05'),
      tenure: 3 * 12, // 3 years in months
      frequency: 'monthly',
      rate: 10.99,
      monthlyEMI: calculateEMI(675000, 10.99, 3 * 12),
      totalInterest: calculateTotalInterest(675000, 10.99, 3 * 12)
    },
  ]);

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
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
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

// Calculate EMI function
const calculateEMI = (amount, rate, tenure) => {
  const monthlyRate = rate / 100 / 12;
  return ((amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)).toFixed(2);
};

// Calculate total interest function
const calculateTotalInterest = (amount, rate, tenure) => {
  const emi = calculateEMI(amount, rate, tenure);
  return (emi * tenure - amount).toFixed(2);
};

export default App;
