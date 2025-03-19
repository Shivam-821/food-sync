import twilio from "twilio"
import dotenv from "dotenv"
import {ApiError} from "../utils/ApiError.js"

dotenv.config()

const {ACCOUNT_SID, AUTH_TOKEN, MESS_FROM} = process.env

if(!ACCOUNT_SID || !AUTH_TOKEN || !MESS_FROM){
  throw new ApiError(404, "Twilio credential is not set")
}

const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export const sendSMS = async (to, message) => {
  try{
    const response =  await client.messages.create({
      body: message,
      from: MESS_FROM,
      to,
    })
    console.log("Message sent successfully: ", response.sid)
    return response.sid;
  } catch (error){
    console.error("Error sending Message: ", error);
    throw new ApiError(500, "Error sending message")
  }
}