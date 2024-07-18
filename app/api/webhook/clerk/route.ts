// pages/api/webhook/clerk.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/database";
import { Webhook } from "svix";

type ClerkEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string;
    last_name: string;
    image_url: string;
    username: string;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = req.body;
  const headers = req.headers;
  const wh = new Webhook(process.env.CLERK_SIGNING_SECRET!);

  try {
    const event = wh.verify(payload, headers as any) as ClerkEvent;
    const { type, data } = event;

    if (type === "user.created" || type === "user.updated") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
        username,
      } = data;

      const user: User = {
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        username,
        photo: image_url,
      };

      // Connect to the database
      const client = await connectToDatabase();
      const db = client.db("your-db-name");
      const collection = db.collection("users");

      // Insert or update user in the database
      await collection.updateOne(
        { clerkId: id },
        { $set: user },
        { upsert: true }
      );

      return res.status(200).json({ message: "User data saved to MongoDB" });
    }

    res.status(200).json({ message: "Unhandled event type" });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ error: "Invalid request" });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

// lib/types.ts
export interface User {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo?: string;
}
