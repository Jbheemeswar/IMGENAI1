import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
//import transactionModel from "../models/transactionModel.js";

/* -------------------------------------------------
   REGISTER (NAME + EMAIL ONLY)
------------------------------------------------- */
const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.json({
        success: false,
        message: "Missing fields"
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    const user = await userModel.create({
      name,
      email,
      creditBalance: 5 // default free credits
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        credits: user.creditBalance
      }
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


/* -------------------------------------------------
   LOGIN (EMAIL ONLY)
------------------------------------------------- */
const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        credits: user.creditBalance
      }
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


/* -------------------------------------------------
   GET USER CREDITS
------------------------------------------------- */
const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    res.json({
      success: true,
      credits: user.creditBalance,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


/* -------------------------------------------------
   PAYMENT (KEEP FOR FUTURE / OPTIONAL)
------------------------------------------------- */
const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.body;

    let amount = 0, credits = 0, plan = "";

    switch (planId) {
      case "Basic":
        amount = 10;
        credits = 100;
        plan = "Basic";
        break;

      case "Advanced":
        amount = 50;
        credits = 500;
        plan = "Advanced";
        break;

      case "Business":
        amount = 250;
        credits = 5000;
        plan = "Business";
        break;

      default:
        return res.json({
          success: false,
          message: "Invalid plan"
        });
    }

    const transaction = await transactionModel.create({
      userId,
      plan,
      amount,
      credits,
      date: Date.now()
    });

    res.json({
      success: true,
      message: "Payment initiated",
      transaction
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};


/* -------------------------------------------------
   EXPORTS
------------------------------------------------- */
export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay
};
