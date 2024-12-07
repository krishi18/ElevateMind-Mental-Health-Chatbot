const CheckIn = require('../../models/checkIn.model');
const User = require('../../models/user.model');
const {
  sendSuccessResponse,
  handleError,
} = require('../../utils/responseUtils');
const {
  awardBadge,
  calculateConsecutiveDays,
} = require('../../services/gamificationService');

const createCheckIn = async (req, res, next) => {
  try {
    console.log('req.user:', req.user);

    if (!req.user || !req.user._id) {
      console.error(
        'Authentication failed. req.user is undefined or missing _id.'
      );
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const { moodRating, stressLevel, journalEntry } = req.body;
    if (!moodRating || moodRating < 1 || moodRating > 10 || !stressLevel) {
      return res.status(400).json({ message: 'Invalid check-in data' });
    }

    const checkInData = {
      ...req.body,
      userId: req.user._id,
      date: new Date(),
    };

    const checkIn = await CheckIn.create(checkInData);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const consecutiveDays = await calculateConsecutiveDays(user._id);
    if (consecutiveDays >= 7) {
      await awardBadge(user._id, '7DayStreak');
    }

    sendSuccessResponse(res, 'Check-in created successfully', checkIn);
  } catch (error) {
    console.error('Error in createCheckIn:', error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const getAllCheckIns = async (req, res, next) => {
  try {
    console.log('req.user:', req.user);

    if (!req.user || !req.user._id) {
      console.error(
        'Authentication failed. req.user is undefined or missing _id.'
      );
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const checkIns = await CheckIn.find({ userId: req.user._id }).sort({
      date: -1,
    });

    if (!checkIns || checkIns.length === 0) {
      return res.status(404).json({ message: 'No check-ins found' });
    }

    sendSuccessResponse(res, 'Check-ins retrieved successfully', checkIns);
  } catch (error) {
    console.error('Error in getAllCheckIns:', error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const deleteCheckIn = async (req, res, next) => {
  try {
    const checkIn = await CheckIn.findByIdAndDelete(req.params.id);

    if (!checkIn) {
      return res
        .status(404)
        .json({ message: `Check-in with ID ${req.params.id} not found` });
    }

    sendSuccessResponse(res, 'Check-in deleted successfully');
  } catch (error) {
    console.error('Error in deleteCheckIn:', error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = { createCheckIn, getAllCheckIns, deleteCheckIn };
