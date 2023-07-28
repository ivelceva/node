const express = require('express');
const ctrl = require("../../models/contacts");
const schemas = require("../../schemas");
const { nanoid } = require("nanoid");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
      const result = await ctrl.listContacts();
      res.json(result);
  
    } catch (error) {
      next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ctrl.getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
   try {
     const data = req.body;
     const { error, value } = schemas.contactsSchema.validate(data);
     if (error) {
       return res.status(400).json({ message: "missing required name field" });
     }
     const newContact = {
       id: nanoid(),
       ...value,
     };
     const result = await ctrl.addContact(newContact);
     res.status(201).json(result);
   } catch (error) {
     next(error);
   }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const removedContact = await ctrl.removeContact(contactId);
      if (!removedContact) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ message: "contact deleted" });
    } catch (error) {
      next(error);
    }
});

router.put('/:contactId', async (req, res, next) => {
   try {
     const { id } = req.params;
     const data = req.body;

     if (Object.keys(data).length === 0 && data.constructor === Object) {
       return res.status(400).json({ message: "missing fields" });
     }

     const { error, value } = schemas.contactsSchema.validate(data);
     if (error) {
       return res.status(400).json({ message: "missing required fields" });
     }

     const updatedContact = await ctrl.updateContact(id, value);
     if (!updatedContact) {
       return res.status(404).json({ message: "Not found" });
     }

     res.status(200).json(updatedContact);
   } catch (error) {
     next(error);
   }
});

module.exports = router
