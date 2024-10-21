import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { numberToWords } from './utility'; // Utility for number to words conversion

const LoanSummary = ({ loan, onUpdate }) => {
  const [showAmortization, setShowAmortization] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedLoan, setUpdatedLoan] = useState(loan);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLoan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    onUpdate(updatedLoan);
    setEditMode(false);
  };

  const { loanName, amount, startDate, tenure, interestRate, monthlyEMI, totalInterest } = updatedLoan;

  // Calculate loan end date
  const calculateLoanEndDate = (startDate, tenure) => {
    const loanStart = new Date(startDate);
    loanStart.setMonth(loanStart.getMonth() + tenure); // Adding tenure in months
    return loanStart;
  };

  const loanEndDate = calculateLoanEndDate(startDate, tenure);

  // Format the loan end date (e.g., "July 2035")
  const loanEndDateString = loanEndDate.toLocaleString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  // Example amortization schedule (this should be calculated separately based on loan details)
  const amortizationSchedule = [
    { month: 1, interest: 5000, principal: 10000, remainingBalance: 900000 },
    { month: 2, interest: 4900, principal: 10100, remainingBalance: 889900 },
    // ... other rows
  ];

  return (
    <Card elevation={3} style={{ marginBottom: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#2c3e50' }}>
          {loanName} Summary
        </Typography>
        <Divider style={{ marginBottom: '15px' }} />
        <Typography variant="subtitle1">
          <strong>Loan Amount:</strong> ₹{amount.toLocaleString('en-IN')} ({numberToWords(amount)})
        </Typography>
        <Typography variant="subtitle1">
          <strong>Monthly EMI:</strong> ₹{monthlyEMI.toLocaleString('en-IN')} ({numberToWords(monthlyEMI)})
        </Typography>
        <Typography variant="subtitle1">
          <strong>Interest Rate:</strong> {interestRate}%
        </Typography>
        <Typography variant="subtitle1">
          <strong>Total Interest:</strong> ₹{totalInterest.toLocaleString('en-IN')} ({numberToWords(totalInterest)})
        </Typography>
        <Typography variant="subtitle1">
          <strong>Estimated Loan End Date:</strong> {loanEndDateString}
        </Typography>
      </CardContent>

      <CardContent>
        <Button
          onClick={() => setShowAmortization(!showAmortization)}
          variant="contained"
          color="primary"
          style={{ marginTop: '10px', marginRight: '10px' }}
        >
          {showAmortization ? 'Hide Amortization' : 'Show Amortization'}
        </Button>
        <Button
          onClick={() => setEditMode(true)}
          variant="outlined"
          color="secondary"
        >
          Edit Loan
        </Button>
      </CardContent>

      {showAmortization && (
        <CardContent>
          <Typography variant="h6" style={{ marginBottom: '10px', color: '#34495e' }}>
            Amortization Schedule
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
                {amortizationSchedule.map((row, index) => (
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

      <Dialog open={editMode} onClose={() => setEditMode(false)}>
        <DialogTitle>Edit Loan Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Loan Name"
            name="loanName"
            value={updatedLoan.loanName}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Loan Amount"
            name="amount"
            value={updatedLoan.amount}
            onChange={handleEditChange}
            fullWidth
            type="number"
          />
          <TextField
            margin="dense"
            label="Start Date"
            name="startDate"
            value={updatedLoan.startDate}
            onChange={handleEditChange}
            fullWidth
            type="date"
          />
          <TextField
            margin="dense"
            label="Tenure (Months)"
            name="tenure"
            value={updatedLoan.tenure}
            onChange={handleEditChange}
            fullWidth
            type="number"
          />
          <TextField
            margin="dense"
            label="Interest Rate (%)"
            name="interestRate"
            value={updatedLoan.interestRate}
            onChange={handleEditChange}
            fullWidth
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMode(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default LoanSummary;
