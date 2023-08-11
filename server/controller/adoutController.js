const About = require('../models/AboutModel');

class AboutController {

  async upload(req, res) {
    const { AboutIPEC, ipecAdvantages, ipecPedagogy } = req.body;

    try {
      const AboutObj = new About({ AboutIPEC, ipecAdvantages, ipecPedagogy });
      const savedData = await AboutObj.save();

      res.status(200).json({
        success: true,
        message: "form submitted successfully",
        data: savedData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async edit(req, res) {
    const { AboutIPEC, ipecAdvantages, ipecPedagogy } = req.body;

    try {
      const AboutObj = await About.findOneAndUpdate(
        {},
        { AboutIPEC, ipecAdvantages, ipecPedagogy },
        { new: true }
      );
      const savedData = await AboutObj.save();

      res.status(200).json({
        success: true,
        message: "Updated Successfully",
        data: savedData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const AboutContent = await About.find();
      res.status(200).json(AboutContent);
    } catch (error) {
      // console.log('Error occurred while retrieving registrations:', error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async remove(req, res) {
    try {
      const AboutContent = await About.findOneAndDelete({});
      res.status(200).json({ success: true, message: "Deleted content successfully." });
    } catch (error) {
      // console.log('Error occurred while retrieving registrations:', error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

const aboutController = new AboutController();
module.exports = aboutController;