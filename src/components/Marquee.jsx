"use client";
import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const Marquee = ({ text }) => {

    const content = (
        <div className="flex items-center gap-12">
            <span className="text-[10px] md:text-[12px] font-medium tracking-[0.2em] uppercase">
                {text}
            </span>
            <Star className="w-3 h-3 text-primary" fill="currentColor" />
        </div>
    );

    return (
        <div className="w-full bg-black text-white py-4 overflow-hidden whitespace-nowrap border-y border-white/5">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex items-center w-max"
            >
                <div className="flex items-center gap-12 px-6">
                    {content}
                    {content}
                    {content}
                    {content}
                </div>
                <div className="flex items-center gap-12 px-6">
                    {content}
                    {content}
                    {content}
                    {content}
                </div>
            </motion.div>
        </div>
    );
};

export default Marquee;
