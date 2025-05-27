"use client";

import React from "react";
import {
  motion as framerMotion,
  AnimatePresence as FramerAnimatePresence,
} from "framer-motion";

export const motion = framerMotion;
export const AnimatePresence = FramerAnimatePresence;

export function MotionDiv(props: React.ComponentProps<typeof framerMotion.div>) {
  return <framerMotion.div {...props} />;
}