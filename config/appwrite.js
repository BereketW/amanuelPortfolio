import { Client } from "appwrite";
const client = new Client();

client.setProject(process.env.APPWRITE_PROJECT_ID);
export {client}