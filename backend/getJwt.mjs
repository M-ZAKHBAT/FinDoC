import crypto from "crypto";

const randomBytes = crypto.randomBytes(256);
const base64String = randomBytes.toString("base64");

console.log(base64String);
