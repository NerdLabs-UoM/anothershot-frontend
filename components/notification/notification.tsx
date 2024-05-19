import React from "react";
import { Notification } from "@/app/lib/types";
import axios from "axios";

export const NotificationService = async ({
  senderId,
  receiverId,
  type,
  title,
  description,
}: Partial<Notification>) => {

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notification/create`,
      {
        senderId,
        receiverId,
        type,
        title,
        description,
      }
    );
  } catch (err) {
    throw new Error("Notification Error");
  }
};
