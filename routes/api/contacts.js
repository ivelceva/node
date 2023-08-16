const express = require("express");
const getListContacts = require("../../controllers/contacts/getListContacts");
const getContactById = require("../../controllers/contacts/getContactById");
const addContact = require("../../controllers/contacts/addContact");
const removeContact = require("../../controllers/contacts/removeContact");
const updateContact = require("../../controllers/contacts/updateContact");
const updateStatusContact = require("../../controllers/contacts/updateStatusContact");
const validateBody = require("../../middlewares");
const contactsSchema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getListContacts);

router.get("/:id", getContactById);

router.post("/add", validateBody(contactsSchema), addContact);

router.post("/update", validateBody(contactsSchema), updateContact);

router.delete("/:id", removeContact);

router.patch(
  "/:id/favorite",
  validateBody,
  updateStatusContact
);

module.exports = router;
