const HelpModel = require("../model/HelpModel");

exports.createFeedback = async (req, res) => {
  try {
    const { email, report } = req.body;

    const feedback = new HelpModel({
      email,
      report,
    });
    const savefeedback = await feedback.save();

    res.status(201).json(savefeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
