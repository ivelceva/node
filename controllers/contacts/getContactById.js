const { Contacts } = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contacts.findOne({ _id: id });
    res.json(result);
  } catch (error) {
    next();
  }
};

module.exports = getContactById;
