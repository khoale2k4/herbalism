"use client";
import { FC, useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import OrdersPage from "./components/orders";
type Props = {};

const OrdersMain: FC<Props> = () => {
  return (<OrdersPage/>
  );
};

export default OrdersMain;
