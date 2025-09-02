import * as React from "react";

import { css, keyframes } from "../../styles";
import { buttonClassName } from "../../styles/shared";
import { useClassNames } from "../../utils/classNames";

import { OpenInCodeSandboxButton } from "./OpenInCodeSandboxButton";

const quillClassName = css({
  transform: "translate(-2px, -2px) scale(0.8)",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const wrapperClassName = css({
  position: "absolute",
  right: "$space$2",
  bottom: "$space$2",
  zIndex: "$top",
  width: "48px", // Increased for better visibility
  height: "48px",
  borderRadius: "$border$radius2", // More rounded
  background: "linear-gradient(135deg, rgba(13, 15, 20, 0.95) 0%, rgba(26, 29, 37, 0.95) 100%)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(138, 180, 248, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 180, 248, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  [`&:hover`]: {
    transform: "translateY(-2px) scale(1.02)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(138, 180, 248, 0.4), 0 0 20px rgba(138, 180, 248, 0.2)",
    borderColor: "rgba(138, 180, 248, 0.5)",
  },

  [`.${quillClassName}`]: { display: "flex" },
  [`.sp-button.${buttonClassName}`]: { display: "none" },
  [`&:hover .sp-button.${buttonClassName}`]: { display: "flex" },
  [`&:hover .sp-button.${buttonClassName} > span`]: { display: "none" },
  [`&:hover .${quillClassName}`]: { display: "none" },
});

// Quill floating animation
const quillFloat = keyframes({
  "0%, 100%": {
    transform: "translateY(0px) rotate(0deg)",
  },
  "50%": {
    transform: "translateY(-3px) rotate(2deg)",
  },
});

// Quill drawing animation for SVG paths
const drawQuill = keyframes({
  "0%": {
    strokeDashoffset: "100",
  },
  "50%": {
    strokeDashoffset: "0",
  },
  "100%": {
    strokeDashoffset: "-100",
  },
});

// Ink drop animation
const inkDrop = keyframes({
  "0%": {
    opacity: "0",
    transform: "translateY(0px) scale(1)",
  },
  "50%": {
    opacity: "1",
    transform: "translateY(8px) scale(0.8)",
  },
  "100%": {
    opacity: "0",
    transform: "translateY(16px) scale(0.3)",
  },
});

// Glow effect on hover
const quillGlow = keyframes({
  "0%, 100%": {
    filter: "drop-shadow(0 0 4px rgba(138, 180, 248, 0.3))",
  },
  "50%": {
    filter: "drop-shadow(0 0 8px rgba(138, 180, 248, 0.6))",
  },
});

const quillContainerClassName = css({
  animation: `${quillFloat} 3s ease-in-out infinite`,
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  [`${wrapperClassName}:hover &`]: {
    animation: `${quillFloat} 3s ease-in-out infinite, ${quillGlow} 2s ease-in-out infinite`,
  },
});

const quillSvgClassName = css({
  width: "24px",
  height: "24px",

  "& .quill-path": {
    fill: "none",
    stroke: "#8ab4f8",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDasharray: "100",
    strokeDashoffset: "100",
    animation: `${drawQuill} 4s ease-in-out infinite`,
    filter: "drop-shadow(0 0 4px rgba(138, 180, 248, 0.3))",
  },

  "& .quill-fill": {
    fill: "#8ab4f8",
  },
});

const inkDropClassName = css({
  position: "absolute",
  width: "3px",
  height: "3px",
  background: "#8ab4f8",
  borderRadius: "50%",
  opacity: "0",
  animation: `${inkDrop} 2s ease-in-out infinite`,

  "&:nth-child(2)": { animationDelay: "0.5s", left: "26px", top: "32px" },
  "&:nth-child(3)": { animationDelay: "1s", left: "24px", top: "34px" },
  "&:nth-child(4)": { animationDelay: "1.5s", left: "28px", top: "33px" },
});

// Sparkle effects
const sparkle = keyframes({
  "0%": {
    opacity: "0",
    transform: "scale(0) rotate(0deg)",
  },
  "50%": {
    opacity: "1",
    transform: "scale(1) rotate(180deg)",
  },
  "100%": {
    opacity: "0",
    transform: "scale(0) rotate(360deg)",
  },
});

const sparkleClassName = css({
  position: "absolute",
  width: "2px",
  height: "2px",
  background: "#8ab4f8",
  borderRadius: "50%",
  animation: `${sparkle} 1.5s ease-out infinite`,

  "&:nth-child(1)": { top: "8px", right: "12px", animationDelay: "0s" },
  "&:nth-child(2)": { top: "16px", right: "8px", animationDelay: "0.3s" },
  "&:nth-child(3)": { top: "12px", right: "16px", animationDelay: "0.6s" },
});

export const Loading = ({
  className,
  showOpenInCodeSandbox, // Updated prop name
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showOpenInCodeSandbox: boolean; // Updated prop type
}): JSX.Element => {
  const classNames = useClassNames();

  return (
    <div
      className={classNames("quill-wrapper", [wrapperClassName, className])}
      title="Open in Rumata"
      {...props}
    >
      {showOpenInCodeSandbox && <OpenInCodeSandboxButton />}
      <div className={classNames("quill", [quillClassName])}>
        <div className={classNames("quill-container", [quillContainerClassName])}>
          <svg
            className={classNames("quill-svg", [quillSvgClassName])}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main quill feather */}
            <path
              className="quill-path"
              d="M3 20 Q4.5 16 7 13 Q10 10 13 8 Q16 6 19 4 Q17.5 7 15 9 Q12.5 11 10 13 Q7.5 15 5.5 17.5 Q4 19 3 20"
            />
            {/* Quill shaft */}
            <path
              className="quill-path"
              d="M3 20 L2 22 Q2.5 22.5 3.5 22 Q4 21.5 4.5 21 L3 20"
            />
            {/* Decorative barbs on feather */}
            <path
              className="quill-path"
              d="M5.5 17.5 Q6.5 16.5 7.5 15.5"
            />
            <path
              className="quill-path"
              d="M7.5 15.5 Q8.5 14.5 9.5 13.5"
            />
            <path
              className="quill-path"
              d="M10 13 Q11 12 12 11"
            />
            {/* Small ink dot at tip */}
            <circle
              className="quill-fill"
              cx="2.5"
              cy="21.5"
              r="0.5"
            />
          </svg>

          {/* Animated ink drops */}
          <div className={classNames("ink-drop", [inkDropClassName])} />
          <div className={classNames("ink-drop", [inkDropClassName])} />
          <div className={classNames("ink-drop", [inkDropClassName])} />
          <div className={classNames("ink-drop", [inkDropClassName])} />

          {/* Sparkle effects */}
          <div className={classNames("sparkle", [sparkleClassName])} />
          <div className={classNames("sparkle", [sparkleClassName])} />
          <div className={classNames("sparkle", [sparkleClassName])} />
        </div>
      </div>
    </div>
  );
};