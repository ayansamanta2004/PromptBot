import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect with Database!");
    
  } catch(err) {
    console.log("Failed to connect with DB", err);
    
  }
}


// app.post("/test", async (req, res) => {
//   // console.log(req.body);
//   const options = {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "meta-llama/llama-3-8b-instruct",
//       messages: [{
//         role: "user",
//         content: String(req.body.message),
//       }]
//     })
//   }


//   try {
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
//     const data = await response.json();
//     // console.log(data.choices[0].message.content);
//     res.send(data.choices[0].message.content);
//   }
//   catch (err) {
//     console.log(err);
//   }
// })