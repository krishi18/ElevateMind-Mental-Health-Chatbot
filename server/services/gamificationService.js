const User = require("../models/user.model");
const CheckIn = require("../models/checkIn.model");

const awardBadge = async (userId, badgeName) => {
  try {
    const user = await User.findById(userId);
    console.log("%c Line:7 🍬 user", "color:#fca650", user);
    if (!user.badges.find((badge) => badge.name === badgeName)) {
      console.log("%c Line:9 🍬 badgeName", "color:#fca650", badgeName);
      user.badges.push({ name: badgeName, awardedAt: new Date() });
      await user.save();
    }
  } catch (error) {
    console.error("Error awarding badge:", error);
  }
};

const calculateConsecutiveDays = async (userId) => {
    const checkIns = await CheckIn.find({ userId }).sort({ date: 1 });
    console.log("%c Line:18 🧀 checkIns", "color:#6ec1c2", checkIns);
    if (checkIns.length === 0) return 0;
    let consecutiveDays = 1;
    let lastDate = checkIns[0].date;

    for (let i = 1; i < checkIns.length; i++) {
        const diff = Math.ceil((checkIns[i].date - lastDate) / (1000 * 60 * 60 * 24));
        if (diff === 1) {
            consecutiveDays++;
        } else {
            break;
        }
        lastDate = checkIns[i].date;
    }
    return consecutiveDays;
};


module.exports = { awardBadge, calculateConsecutiveDays };