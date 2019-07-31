const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Contact = require("../models/Contact");
const User = require("../models/User");

//@route   GET api/contacts
//@desc    get all contacts
//@access  PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/contacts
//@desc  add a contact
//@access PRIVATE
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, type } = req.body;

    const NewContact = new Contact({
      name,
      phone,
      email,
      type,
      user: req.user.id
    });
    try {
      const contact = await NewContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.meassage);
      res.send("Server error");
    }
  }
);

//@route   PUT api/contacts/:id
//@desc    Update a contact
//access   PRIVATE
router.put("/:id", auth, async (req, res) => {
  const { phone, email, type, name } = req.body;
  const contactFields = {};
  if (phone) contactFields.phone = phone;
  if (name) contactFields.name = name;
  if (type) contactFields.type = type;
  if (email) contactFields.email = email;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact Not Found" });

    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorised Access" });

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/*
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
*/

//@route   DELETE api/contacts/:id
//@desc    delete a contact
//@access  PRIVATE

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
