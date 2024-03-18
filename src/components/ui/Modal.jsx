import { useEffect, useState } from "react";

export const Modal = (props) => {
  const {
    children,
    isOpen,
    onClose,
    className = "bg-black",
    title = "",
  } = props;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className={[
        "fixed flex items-center justify-center p-6 pr-12 left-0 right-0 top-0 w-screen h-screen backdrop-blur-sm z-50 transition-opacity",
        isOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
      ].join(" ")}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={[
          "relative flex flex-col gap-6 min-w-[300px] min-h-[150px] p-6 md:p-8 rounded-2xl border border-[#2b2b2b]",
          className
        ].join(" ")}
      >
        <div className="flex items-center h-12">
          <span className="text-3xl text-white font-bold">{title}</span>
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center w-12 h-12 right-4 top-4"
          >
            <svg className="stroke-white" width="24" height="24" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21.32L21 3.32001" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 3.32001L21 21.32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center h-full">
          { children }
        </div>

        <div className="flex items-center h-12"></div>
      </div>
    </div>
  )
};