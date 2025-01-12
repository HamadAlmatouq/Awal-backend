const express = require('express');
const router = express.Router();
const Kid = require('../../models/kid');
const Account = require('../../models/account');
const Goal = require('../../models/goal');
const Parent = require('../../models/parent');

// Middleware to check if parent has access to the kid's account
const checkParentAccess = async (req, res, next) => {
  const { parentId, kidId } = req.params;
  const kid = await Kid.findById(kidId);
  if (!kid || kid.parent.toString() !== parentId) {
    return res.status(403).send('Access denied');
  }
  next();
};

// Route to get kid's account details
router.get('/:parentId/kid/:kidId', checkParentAccess, async (req, res) => {
  const kid = await Kid.findById(req.params.kidId);
  if (!kid) {
    return res.status(404).send('Kid not found');
  }

  const accounts = await Account.find({ owner: kid._id });
  const balance = accounts.reduce((acc, account) => acc + account.balance, 0);
  const savings = accounts.filter(account => account.accountType === 'Savings').reduce((acc, account) => acc + account.balance, 0);
  const goals = await Goal.find({ kidId: kid._id });

  res.send({
    balance,
    steps: kid.steps,
    savings,
    goals,
    points: kid.points
  });
});

module.exports = router;