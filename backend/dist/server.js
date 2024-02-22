"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5174", credentials: true }));
app.use(express_1.default.json());
const PORT = process.env.PORT;
app.post("/signUp", (req, res) => {
    const { email, name, password } = req.body;
    console.log(email, email.toLowerCase());
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
