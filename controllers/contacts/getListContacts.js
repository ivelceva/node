const { Contacts } = require("../../models/contacts");

const getListContacts = async (req, res, next) => {
  try {
    const result = await Contacts.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getListContacts;
