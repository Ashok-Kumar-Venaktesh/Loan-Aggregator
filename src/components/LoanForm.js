import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const LoanForm = ({ addLoan, currentLoan, updateLoan }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly'); // Default to monthly
  const [loanType, setLoanType] = useState('Personal Loan'); // Default loan type
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    if (currentLoan) {
      setName(currentLoan.name);
      setAmount(currentLoan.amount);
      setRate(currentLoan.rate);
      setTerm(currentLoan.term);
      setPaymentFrequency(currentLoan.paymentFrequency);
      setLoanType(currentLoan.loanType);
      setStartDate(new Date(currentLoan.startDate).toISOString().substr(0, 10));
    }
  }, [currentLoan]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthlyRate = rate / 100 / 12;
    const totalMonths = paymentFrequency === 'monthly' ? term * 12 : term;
    const monthlyEMI = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));

    const loanStartDate = new Date(startDate);
    const loanEndDate = new Date(loanStartDate);
    loanEndDate.setMonth(loanStartDate.getMonth() + totalMonths);

    const newLoan = {
      name,
      amount: parseFloat(amount),
      rate: parseFloat(rate),
      term: parseInt(term),
      paymentFrequency,
      loanType,
      monthlyEMI: monthlyEMI.toFixed(2),
      months: totalMonths,
      totalInterest: (monthlyEMI * totalMonths - amount).toFixed(2),
      startDate: loanStartDate,
      endDate: loanEndDate,
    };

    if (currentLoan) {
      updateLoan(newLoan);
    } else {
      addLoan(newLoan);
    }

    setName('');
    setAmount('');
    setRate('');
    setTerm('');
    setStartDate('');
    setPaymentFrequency('monthly');
    setLoanType('Personal Loan');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label="Loan Name" 
            fullWidth 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField 
            label="Loan Amount" 
            fullWidth 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            type="number"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField 
            label="Interest Rate (%)" 
            fullWidth 
            value={rate} 
            onChange={(e) => setRate(e.target.value)} 
            type="number"
            step="0.01"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField 
            label="Term" 
            fullWidth 
            value={term} 
            onChange={(e) => setTerm(e.target.value)} 
            type="number"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Payment Frequency"
            fullWidth
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Loan Type"
            fullWidth
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
          >
            <MenuItem value="Personal Loan">Personal Loan</MenuItem>
            <MenuItem value="Home Loan">Home Loan</MenuItem>
            <MenuItem value="Gold Loan">Gold Loan</MenuItem>
            {/* Add more loan types as needed */}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Start Date" 
            type="date" 
            fullWidth 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {currentLoan ? 'Update Loan' : 'Add Loan'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoanForm;
