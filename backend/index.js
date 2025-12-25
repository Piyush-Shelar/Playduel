const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app); // 🔑 IMPORTANT
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const JWT_SECRET = "supersecretkey";

const url =
  "mongodb+srv://piyushshelar10_db_user:vbXofPmn1uGJAUYB@cluster0.84hcptk.mongodb.net/?appName=Cluster0";

/* -------------------- SOCKET LOGIC -------------------- */

// Map userId -> socketId
const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register-user", (userId) => {
    onlineUsers[userId] = socket.id;
  });

  socket.on("send-invite", ({ from, to }) => {
    const receiverSocket = onlineUsers[to];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive-invite", { from });
    }
  });

  socket.on("reject-invite", ({ from }) => {
    const senderSocket = onlineUsers[from];
    if (senderSocket) {
      io.to(senderSocket).emit("invite-rejected");
    }
  });

  socket.on("accept-invite", async ({ from, to }) => {
    try {
      const client = new MongoClient(url);
      await client.connect();

      const db = client.db("session");
      const collec = db.collection("duel");

      // ✅ get latest category selection
      const selected = await collec.findOne({}, { sort: { _id: -1 } });

      if (!selected) return;

      const roomId = selected._id.toString();

      // join both users
      if (onlineUsers[from]) {
        io.to(onlineUsers[from]).emit("start-match", roomId);
      }
      if (onlineUsers[to]) {
        io.to(onlineUsers[to]).emit("start-match", roomId);
      }

      await client.close();
    } catch (err) {
      console.error("accept-invite error:", err);
    }
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("player-joined");
  });

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
  });
});


// index.js (Socket.IO section)



/* -------------------- AUTH ROUTES (UNCHANGED) -------------------- */

app.post("/register", async (req, res) => {
  let client = new MongoClient(url);
  client.connect();

  const db = client.db("Users");
  const collec = db.collection("details");

  const { fullName, email, password } = req.body;

  const userExists = await collec.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    fullName,
    email,
    password: hashedPassword
  };

  collec.insertOne(newUser);
  res.json({ message: "Account created successfully" });
});

app.post("/login", async (req, res) => {
  let client = new MongoClient(url);
  client.connect();

  const db = client.db("Users");
  const collec = db.collection("details");

  const { email, password } = req.body;

  const user = await collec.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email
    }
  });
});

/* -------------------- FRIENDS ROUTE (UNCHANGED) -------------------- */

app.get("/friends", async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("Users");
    const collec = db.collection("details");

    const people = await collec.find({}).toArray();

    const result = people.map(user => ({
      friend_id: user.id,
      fullName: user.fullName,
      email: user.email
    }));

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    await client.close();
  }
});


app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Access granted", userId: decoded.userId });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("quizapp");
    const collection = db.collection("categories");

    const categories = await collection.find({}).toArray();

    res.status(200).json(categories);

    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// index.js
app.get("/quiz/:category", async (req, res) => {
  
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("quizapp");
    const collection = db.collection("questions");
   const { category } = req.params;
   console.log(category)
   

    // Random 10 questions of this category
    const questions = await collection
      .aggregate([
        { $match: { category } },
        { $sample: { size: 10 } } 
      ])
      .toArray();

    res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    await client.close();
  }
});

app.post("/category", async (req, res) => {
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db("session");
  const collec = db.collection("duel");

  const { category } = req.body;

  await collec.insertOne({
    category,
    createdAt: new Date()
  });

  await client.close();
  res.json({ success: true });
});


app.get("/category1", async (req, res) => {
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db("session");
  const collec = db.collection("duel");

  const selected = await collec.findOne({}, { sort: { _id: -1 } });

  await client.close();
  res.json(selected);
});



/* -------------------- START SERVER -------------------- */

server.listen(9000, () => {
  console.log("Server + Socket.IO running on http://localhost:9000");
});
