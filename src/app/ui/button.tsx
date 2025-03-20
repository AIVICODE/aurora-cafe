"use client";

import React from "react";

type PrimaryButtonProps = {
  text: string;
  onClick: () => void;
  extraClasses?: string;
};

export default function PrimaryButton({ text, onClick, extraClasses = "" }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#a67f2b] text-white px-6 py-3 rounded-full shadow-lg transition-all hover:bg-[#8b6c21] hover:scale-105 border-2 border-[#8b6c21] relative overflow-hidden ${extraClasses}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#a67f2b] to-[#8b6c21] opacity-20 blur-md"></span>
      <span className="relative">{text}</span>
    </button>
  );
}
