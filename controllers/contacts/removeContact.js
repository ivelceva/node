const { Contacts } = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Contacts.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next();
  }
};

module.exports = removeContact;
