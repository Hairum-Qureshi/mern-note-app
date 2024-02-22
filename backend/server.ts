import express, { Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authentication";
import userRoutes from "./routes/users";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors<Request>({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT: string = process.env.PORT!;
const MONGO_URI: string = process.env.MONGO_URI!;

app.use("/api", authRoutes);
app.use("/api", userRoutes);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Successfully connected to MongoDB! Server listening on port ${PORT}`
			);
		});
	})
	.catch(err => {
		console.log(err);
	});
