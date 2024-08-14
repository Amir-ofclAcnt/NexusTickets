"use client"

import { IEvent } from "@/lib/database/models/event.model";
import { useUser } from "@clerk/nextjs";
import React from "react";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const {user} = useUser();
  const hasEventFinished =  new Date(event.endDateTime) < new Date()
  return <div>CheckoutButton</div>;
};

export default CheckoutButton;
