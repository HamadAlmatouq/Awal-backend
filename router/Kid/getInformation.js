const express = require("express");
const { verifyToken } = require("../../middleware/requireAuth");
const Kid = require("../../models/kid");
const Account = require("../../models/account");

const router = express.Router();

router.get("/:kidId/info", verifyToken, async (req, res) => {
  const { kidId } = req.params;

  try {
    const kid = await Kid.findById(kidId).populate('parent account');
    if (!kid) {
      return res.status(404).send({ error: "Kid not found" });
    }

    // Calculate total balance and savings
    const accounts = await Account.find({ owner: kid._id });
    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
    const totalSavings = accounts.filter(account => account.accountType === 'Savings').reduce((acc, account) => acc + account.balance, 0);

    res.status(200).send({
      balance: totalBalance,
      savings: totalSavings,
      steps: kid.steps,
      points: kid.points,
      name: kid.name,
      birthday: kid.birthday
    });
  } catch (error) {
    res.status(500).send("Error retrieving kid information");
  }
});

module.exports = router;
