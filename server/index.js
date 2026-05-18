// Importing required libraries (like tools we need for our project)
// 'express' is a framework that helps us create a web server easily
import express from "express";
// 'mongoose' is a library that helps us connect and work with MongoDB (our database)
import mongoose from "mongoose";
// 'cors' allows our frontend (like a React app) to talk to our backend server without security issues
import cors from "cors";


//open server/index.js and import config.js file which will let the Node.js file read from .env 
import * as ENV from "./config.js";


// Importing the UserModel, which defines the structure of a user in our database (like a blueprint)
import UserModel from "./Models/UserModel.js";
// ToolsModel
import ToolModel from "./Models/ToolModel.js";
//CommentsModel
import CommentModel from "./Models/CommentModel.js";
 

// 'bcrypt' is a library used to securely hash (encrypt) passwords so they aren't stored as plain text
import bcrypt from "bcrypt";

//img things 
import multer from "multer";
import path from "path";



// Creating an instance of the Express app (think of it as our web server)
const app = express();

// Middleware: These are functions that process requests before they reach our routes
// This middleware allows our server to understand JSON data sent in requests (like form data)
app.use(express.json());

// This middleware enables CORS so our frontend (e.g., running on localhost:3000) can communicate with our backend
app.use(cors());



//img 
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Database connection string
/* const connectString =
  "mongodb://admin:admin123@ac-u7urkzj-shard-00-00.dkevhlv.mongodb.net:27017,ac-u7urkzj-shard-00-01.dkevhlv.mongodb.net:27017,ac-u7urkzj-shard-00-02.dkevhlv.mongodb.net:27017/Lav3ndoryDb?ssl=true&replicaSet=atlas-190pfr-shard-0&authSource=admin&appName=Lav3ndoryCluster";
 */
//Database connection string by calling it from .env
// Database connection string from .env file
const connectString = ENV.MONGO_URI;

// The server listens on port 3001 (you can access it at http://localhost:3001)
/* app.listen(3001, () => {
  // This message appears in the terminal when the server starts successfully
  console.log("You are connected to web server");
});
 */
// The server listens using environment variable port
const port = ENV.PORT || 3001;

app.listen(port, () => {
  console.log("You are connected to web server");
});

// Connecting to the MongoDB database using mongoose
mongoose.connect(connectString).then(() => {
  console.log("Web Server connected to mongodb");
});




// Route: POST /registerUser
// This route handles user registration
app.post("/registerUser", async (req, res) => {
  try {

    // Extracting user information from request body
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const ageCategory = req.body.ageCategory;
    const password = req.body.password;

    // Hashing the password before storing it in database
    const hashedpassword = await bcrypt.hash(password, 10);

    // Creating a new user object using UserModel
    const user = new UserModel({
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      ageCategory: ageCategory,
      password: hashedpassword,
    });

    // Saving the new user to MongoDB
    await user.save();

    // Sending success response back to frontend
    res.send({
      user: user,
      msg: "Added.",
    });

  } catch (error) {

    // Handling server/database errors
    console.log(error);

    res.status(500).json({
      error: "An error occurred",
    });
  }
});


// Route: POST /login
// This handles user login (checking if the email and password are correct)
app.post("/login", async (req, res) => {
  try {
    // Destructuring: A shortcut to extract email and password from req.body
    const { email, password } = req.body;

    // Searching the database for a user with the provided email
    const user = await UserModel.findOne({ email: email });

    // If no user is found with that email, send an error response
    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }

    // Logging the user for debugging (you can see this in your terminal)
    console.log(user);

    // Comparing the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, send an authentication error
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // If everything is correct, send a success response with the user data
    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    // If an error occurs (e.g., database issue), send an error response with the error message
    res.status(500).json({ error: err.message });
  }
});

// Route: POST /logout
// This handles user logout (in this case, it just sends a success message)
app.post("/logout", async (req, res) => {
  // Note: This is a simple logout. In a real app, you might invalidate a token or session
  res.status(200).json({ message: "Logged out successfully" });
});








app.put("/updateUserProfile/:email", upload.single("profilePic"), async (req, res) => {

  const email = req.params.email;

  const name = req.body.name;

  const phone = req.body.phone;

  const gender = req.body.gender;

  const ageCategory = req.body.ageCategory;

  const password = req.body.password;

  try {

    const userToUpdate = await UserModel.findOne({ email: email });

    if (!userToUpdate) {

      return res.status(500).json({ error: "user not found" });

    }

    userToUpdate.name = name;

    userToUpdate.phone = phone;

    userToUpdate.gender = gender;

    userToUpdate.ageCategory = ageCategory;

    if (req.file) {

      userToUpdate.profilePic = req.file.filename;

    }

    if (password !== userToUpdate.password) {

      const hashedpassword = await bcrypt.hash(password, 10);

      userToUpdate.password = hashedpassword;

    } else {

      userToUpdate.password = password;

    }

    await userToUpdate.save();

    res.send({

      user: userToUpdate,

      msg: "Profile Updated",

    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});











// tools work 
app.post("/addTool", upload.single("image"), async (req, res) => {

  try {

    const toolid = req.body.toolid;

    const toolname = req.body.toolname;

    const description = req.body.description;

    const condition = req.body.condition;

    const category = req.body.category;

    const availability = req.body.availability;

    const price = req.body.price;


    let image = "";

    if (req.file) {

      image = req.file.filename;

    }

    const tool = new ToolModel({

      toolid: toolid,

      toolname: toolname,

      description: description,

      condition: condition,

      category: category,

      availability: availability,

      price: price,

      image: image,

      addDate: new Date(),

    });

    await tool.save();

    res.send({

      tool: tool,

      msg: "Tool Added Successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: error.message,

    });

  }

});

//get tools 

app.get("/getTools", async (req, res) => {

  try {

    const tools = await ToolModel.find();

    res.send({ tools: tools });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

//update tool

// UPDATE TOOL
app.put("/updateTool/:toolid", upload.single("image"), async (req, res) => {
  const toolid = req.params.toolid;
  const toolname = req.body.toolname;
  const description = req.body.description;
  const condition = req.body.condition;
  const category = req.body.category;
  const availability = req.body.availability;
  const price = req.body.price;
  try {
    const toolToUpdate = await ToolModel.findOne({
      toolid: toolid,
    });
    if (!toolToUpdate) {
      return res.status(404).json({
        error: "Tool not found",
      });
    }
    toolToUpdate.toolname = toolname;
    toolToUpdate.description = description;
    toolToUpdate.condition = condition;
    toolToUpdate.category = category;
    toolToUpdate.availability = availability;
    toolToUpdate.price = Number(price);
    if (req.file) {
      toolToUpdate.image = req.file.filename;
    }
    await toolToUpdate.save();
    res.send({
      tool: toolToUpdate,
      msg: "Tool Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

//delete tool
app.delete("/deleteTool/:toolid", async (req, res) => {

  const toolid = req.params.toolid;

  try {

    const deletedTool = await ToolModel.findOneAndDelete({

      toolid: toolid,

    });

    if (!deletedTool) {

      return res.status(500).json({

        error: "Tool not found",

      });

    }

    res.send({

      msg: "Tool Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});




//count the users for admin dash
app.get("/usersCount", async (req, res) => {
  try {
    const usersCount = await UserModel.countDocuments();
    res.send({
      count: usersCount,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


//count the tools for admin dash
app.get("/toolsCount", async (req, res) => {
  try {
    const toolsCount = await ToolModel.countDocuments();
    res.send({
      count: toolsCount,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});



//get user 
// Get all users

app.get("/getUsers", async (req, res) => {

  try {

    const users = await UserModel.find();

    res.send({

      users: users,

    });

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});


// Delete user

app.delete("/deleteUser/:email", async (req, res) => {

  const email = req.params.email;

  try {

    const deletedUser = await UserModel.findOneAndDelete({

      email: email,

    });

    if (!deletedUser) {

      return res.status(500).json({

        error: "User not found",

      });

    }

    res.send({

      msg: "User Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});
















//likess                                                                                                                                                                        //Togglr likes and dislikes
app.put("/togglelike/:id", async (req, res) => {

  try {

    const tool = await ToolModel.findById(req.params.id);

    const email = req.body.email;

    // Remove like
    if (tool.likedUsers.includes(email)) {

      tool.likes -= 1;

      tool.likedUsers = tool.likedUsers.filter(
        (userEmail) => userEmail !== email
      );

    } else {

      // Add like
      tool.likes += 1;

      tool.likedUsers.push(email);
    }

    await tool.save();

    res.status(200).json({
      tool,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});                                                                                                                                                                     // Route: POST /logout

// This handles user logout (in this case, it just sends a success message)

app.post("/logout", async (req, res) => {
  // Note: This is a simple logout. In a real app, you might invalidate a token or session

  res.status(200).json({ message: "Logged out successfully" });
});



// Route: POST /saveComment

// Save user comment to database

app.post("/saveComment", async (req, res) => {
  try {

    // Get comment data from frontend
    const { email, commentMsg, toolid } = req.body;

    // Create new comment
    const comment = new CommentModel({
      email: email,
      commentMsg: commentMsg,
      toolid: toolid,
    });

    // Save to MongoDB
    await comment.save();

    // Send success response
    res.status(200).json({
      comment,
      message: "Comment added successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to save comment",
    });
  }
});


// Route: GET /getComments

// Get all comments from database

app.get("/getComments", async (req, res) => {
  try {

    // Fetch all comments
    const comments = await CommentModel.find();

    // Send comments to frontend
    res.status(200).json({
      comments,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch comments",
    });
  }
});






