"use client";
import { motion, useScroll } from "framer-motion";

export default function Scroll() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[9px] bg-[rgb(81,139,255)] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
