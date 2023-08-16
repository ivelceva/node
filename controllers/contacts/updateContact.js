const { Contacts } = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await Contacts.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next();
  }
};

module.exports = updateContact;
