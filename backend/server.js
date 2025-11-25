const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;
const connecttoDb = require("./src/db/config");
const User = require("./src/models/user.model");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Product = require("./src/models/product.model");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Its working...");
});

// Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.json({ Message: "All field are required" });
  }
  const isUserExisted = await User.findOne({ email });

  if (isUserExisted) {
    return res.status(400).json({ error: "User Already Exists" });
  }
  const newUser = await User.create(req.body);
  // const token = jwt.sign({ id: isUserExisted._id }, process.env.JWT_SECRET, {
  //   expiresIn: "5m",
  // }); 
  const token = 1234
  res.json({ newUser, token }).status(201);
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //   console.log(req.body);
  // email checking
  // password check and compare with bcryt
  // send token in cookie
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }
  //   const isValidPassword = await bcrypt.compare(password, user.password);

  //   if (!isValidPassword) {
  //     return res.status(401).json({ error: "Invalid Email or Password" });
  //   }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  res.status(200).json({ user, token });
});

//Create Product
app.post('/product' , async (req,res) => {
    const {imageUrl , name , price , rating} = req.body;
    const newProduct =  await Product.create({imageUrl , name , price , rating});
    // console.log(newProduct);
    res.json({newProduct}).status(200);
})

// FetchAllProducts
app.get('/product' ,async (req,res) => {
    const allProduct = await Product.find();
    res.status(200).json(allProduct);
})

app.listen(PORT, () => {
  connecttoDb();
  console.log(`Listening on port http://localhost:${PORT}`);
});
