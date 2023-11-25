const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("./models/User");
require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const PlaceModel = require("./models/Places");
const BookingModel = require("./models/Booking");

const secretKey = "secret-key"; //for jsonwebtoken
const app = express();
const port = 4000;
app.use(express.json());
app.use(CookieParser());

function getUserDataFromToken(token) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secretKey, {}, async (err, decodedData) => {
      if (err) {
        throw err;
      }
      resolve(decodedData);
    });
  });
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/api/test", (req, res) => {
  res.json("Hello World!");
});
app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const truePassword = bcrypt.compareSync(password, user.password);
    if (truePassword) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jsonwebtoken.sign(payload, secretKey, {});
      res.cookie("token", token).json(user);
    } else {
      res.status(422).json("incorrect Password");
    }
  } else {
    res.json("Not found user");
  }
});

app.get("/api/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jsonwebtoken.verify(token, secretKey, {}, async (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
      } else {
        const { email, name, _id } = await UserModel.findById(decoded.id);
        res.json({ email, name, _id });
      }
    });
  } else {
    res.json(null);
  }
});

app.get("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await PlaceModel.find());
});

app.get("/api/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params; //url se
  res.json(await PlaceModel.findById(id));
});

app.post("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const userData = await getUserDataFromToken(token);
  const { checkIn, checkOut, noGuests, pnumber, name, place, price } = req.body;
  BookingModel.create({
    checkIn,
    checkOut,
    noGuests,
    pnumber,
    name,
    place,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const userData = await getUserDataFromToken(token);
  res.json(await BookingModel.find({ user: userData.id }).populate("place"));
});

app.listen(port, () => {});
