import { sendSMS } from "../services/twilio.service.js";

export const notifyOnNewExpiredItem = async(name, quantity, upcyclingOptions) => {
  try {
    await sendSMS(
      "+919060871087",
      `New expired item available: Name: ${name}, Quantity: ${quantity}, Upcycling Options: ${upcyclingOptions}`
    )
  } catch (error) {
    console.log("Error sending expired item notification: ", error)
  }
}

export const notifyOnNewItem = async(name, quantity) => {
  try {
    await sendSMS("+918874151688", `New item available: Name: ${name}, Quantity: ${quantity}`)
  } catch (error) {
    console.log("Error sending new item notification: ", error)
  }
}