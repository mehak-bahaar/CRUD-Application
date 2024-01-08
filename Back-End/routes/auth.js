const express = require("express");
const User = require("../modules/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUserDets = require("../middleware/FetchUserDets");
let success = false
const JWT_SECRET = "thsisiastrungnittoveshaserd"
// ROUTE 2: to create the user using Post "/api/auth/signup" (no login required)
router.post(
  "/signup",
  [
    // Validation for name, email, userName, and password
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password should have at least 5 characters").isLength({
      min: 5,
    }),
    body("userName")
      .isLength({ min: 3 })
      .withMessage("userName should have at least 3 characters")
      .isLowercase()
      .withMessage("userName should be in lowercase"),
  ],
  async (req, res) => {
      // Resolve errors if field is empty
      const result = validationResult(req);

      if (!result.isEmpty()) {
        return res.status(400).json({success, errors: result.array() });
      }

    try {
      const { name, email, userName } = req.body;

      // Check if the user with the provided email or userName already exists
      const foundUser = await User.findOne({ $or: [{ email }, { userName }] });

      if (foundUser) {
        // Handle error if the email already exists
        if (foundUser.email === email) {
          return res.status(400).json({
            success,
            error:
              "Sorry, this email is already in use. Please choose a different email.",
          });
        }

        // Handle error if the userName already exists
        if (foundUser.userName === userName) {
          return res.status(400).json({
            success,
            error:
              "Sorry, this userName is already in use. Please choose a different userName.",
          });
        }
      }

      // Secure the password using hash and salt
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(req.body.password, salt);

      // Create and save the new user
      const newUser = await User.create({
        name,
        email,
        password:secretPassword,
        userName,
      });
      await newUser.save();
      // Respond with the newly created user
      const data = {
        user:{
          id:User.id
        }
      }
      success = true
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success,authToken})

    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

//ROUTE 2: authenticate the user using Post "/api/auth/login" (no login required)
router.post(
  "/login",
  [
    // Validation for name, email, userName, and password
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    success = false
    // Resolve validation errors
    const result = validationResult(req);
    // handeling error if any field is empty
    if (!result.isEmpty()) {
      return res.status(400).json({success, errors: result.array() });
      
    }
    try {
      // authenticating whether the email and the password exist
      const { password, email } = req.body;
      const foundUser = await User.findOne({email});
      if(!foundUser){//checking email
        return res.status(401).json({success,error:"Invalid Cradentials"});
      }
      const passwordCompare = await bcrypt.compare(password , foundUser.password)
      if (!passwordCompare) {// checking password
        return res.status(401).json({success, error: "Invalid paCradentialsss" });
      }
      const data = {
        user:{
          id: foundUser.id
        }
      }
      success = true
        //sending authentication tocken using jwt
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success, authToken });
      
        }
        //handeling server error
        catch (error) {
          let success = false
            console.error("Error:", error.message);
            res.status(500).send({success,error:"Server Error: " + error.message});
            
        }
  })

  // ROUTE 3: to create the user using Post "/api/auth/userdetails" (login required)
  success = false
  router.post(
    "/userdetails",
    fetchUserDets,
    async (req, res) => {
      try {
        const userId = req.user.id;
        const user = await  User.findById(userId).select('-password');
        if (!user) {
          return res.status(404).send({success, error: "User not found" });
        }
        success = true
        res.send(success,user)
      } catch (error) {
        success = false
        //handeling server error
        console.error(error);
        res.status(500).send({success ,error:"Server Error"});
      }
    }
  );
module.exports = router;
