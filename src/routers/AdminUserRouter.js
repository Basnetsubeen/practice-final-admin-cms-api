import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { newAdminUserValidation } from "../middlewares/joi-validation/AdminUserValidation.js";
import { insertAdminUser } from "../models/admin-user/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { verificationEmail } from "../helpers/emailHelper.js";

const router = express.Router();

//post method to add the admin
router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4();
    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "We have send you an email to verify your account, Please check your mail box including junk folder",
      });

      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;

      //send email to the user to verify it
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to create a new adim user, Please try again!!",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already another user exist with this emial, Please try with another email";
    }
    next(error);
  }
});

//patch method to verify the admin
router.patch("/verify-user", (req, res, next) => {
  try {
    res.json({
      status: "succsess",
      message: "to do",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
