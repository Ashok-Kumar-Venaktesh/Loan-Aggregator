import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, MenuItem } from '@mui/material';

const LoanForm = ({ addLoan, currentLoan, updateLoan }) => {
  const [loan, setLoan] = useState({
    name: '',
    amount: '',
    startDate: '',
    tenure: '',
    loanType: '',
    rate: '',
  });

  useEffect(() => {
    if (currentLoan) {
      setLoan(currentLoan);
    } else {
      setLoan({
        name: '',
        amount: '',
        startDate: '',
        tenure: '',
        loanType: '',
        rate: '',
      });
    }
  }, [currentLoan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentLoan) {
      updateLoan(loan);
    } else {
      addLoan({
        ...loan,
        startDate: new Date(loan.startDate),
        monthlyEMI: calculateEMI(loan.amount, loan.rate, loan.tenure),
        totalInterest: calculateTotalInterest(loan.amount, loan.rate, loan.tenure),
      });
    }
  };

  const calculateEMI = (amount, rate, tenure) => {
    const monthlyRate = rate / 100 / 12;
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -tenure));
  };

  const calculateTotalInterest = (amount, rate, tenure) => {
    const emi = calculateEMI(amount, rate, tenure);
    return emi * tenure - amount;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Loan Name"
            name="name"
            value={loan.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Loan Amount"
            name="amount"
            type="number"
            value={loan.amount}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            type="date"
            value={loan.startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tenure (months)"
            name="tenure"
            type="number"
            value={loan.tenure}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Interest Rate (%)"
            name="rate"
            type="number"
            value={loan.rate}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Loan Type"
            name="loanType"
            value={loan.loanType}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="Home Loan">Home Loan</MenuItem>
            <MenuItem value="Personal Loan">Personal Loan</MenuItem>
            <MenuItem value="Gold Loan">Gold Loan</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {currentLoan ? 'Update Loan' : 'Add Loan'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoanForm;
