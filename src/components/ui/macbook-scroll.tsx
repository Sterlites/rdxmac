import React, { useEffect, useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";
import videoSource from "../../assets/linear.webm";

interface MacbookScrollProps {
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  typingText?: string;
}

export const MacbookScroll: React.FC<MacbookScrollProps> = ({
  showGradient,
  title,
  badge,
  typingText = "Rohit Dwivedi aka RDx, is teh GOAT Artist, jack of all trades master of Some!",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
 // Transition animation explanation:
  // - Between 0 and 0.3 of the scroll, the MacBook scales up from 1.2 to 1.5 (desktop) or 1 (mobile) horizontally and from 0.6 to 1.5 (desktop) or 1 (mobile) vertically.
  // - Between 0.3 and 0.6 of the scroll, the MacBook scales up from 1.5 to 2 horizontally and from 1.5 to 2 vertically.
  // - Between 0 and 0.6 of the scroll, the MacBook moves up by 1500px.
  // - Between 0.1 and 0.12 of the scroll, the MacBook rotates by -28 degrees.
  // - Between 0 and 0.3 of the scroll, the title opacity goes from 1 to 0.
  // - Between 0.6 and 0.8 of the scroll, the video scales up from 1 to 3.
  // - Between 0.8 and 0.9 of the scroll, the video opacity goes from 1 to 0.
  const scaleX = useTransform(scrollYProgress, [0, 0.3, 0.6], [1.2, isMobile ? 1 : 1.5, 2]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.6, isMobile ? 1 : 1.5, 2]);
  const translate = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1500, 3000]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3, 0.6], [-28, -28, 0, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0.6, 0.8], [1, 3]);
  const videoOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[300vh] flex flex-col items-center py-0 md:py-80 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50"
    >
      <motion.h2
        style={{
          opacity: textOpacity,
        }}
        className="dark:text-white text-neutral-800 text-3xl font-bold mb-20 text-center"
      >
        {title || (
          <span >
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            This MacBook is typing the code that made what you see<br/>
            </h1>
             No kidding!
          </span>

        )}
      </motion.h2>
      <Lid
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
        videoOpacity={videoOpacity}
        videoScale={videoScale}
      />
      <div className="h-[22rem] w-[32rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505]" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            <Keypad typingText={typingText} />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  videoOpacity,
  videoScale,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  videoOpacity: MotionValue<number>;
  videoScale: MotionValue<number>;

}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        >
          <span className="text-white"></span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg" />
        <motion.video
          src={videoSource}
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            opacity: videoOpacity,
            scale: videoScale,
            transformOrigin: "center center",
          }}
          className="object-cover object-left-top absolute rounded-lg inset-0 h-full w-full"
        >
          Your browser does not support the video tag.
        </motion.video>
      </motion.div>
    </div>
  );
};
export const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-32  rounded-xl my-1"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

// Update the Keypad component to accept typingText prop
export const Keypad: React.FC<{ typingText: string }> = ({ typingText }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i < typingText.length; i++) {
        const char = typingText[i].toUpperCase();
        setActiveKey(char);
        await new Promise((resolve) =>
          setTimeout(resolve, 100 + Math.random() * 500)
        );
        setActiveKey(null);
        await new Promise((resolve) =>
          setTimeout(resolve, 5 + Math.random() * 500)
        );
      }
    };

    typeText();
  }, [typingText]);

  const keyLayout = [
    // Function keys
    [
      "ESC",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "BACKSPACE",
    ],
    // Number keys
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "DELETE"],
    // QWERTY keys
    ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "RETURN"],
    ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT", "↑"],
    // Bottom row
    ["FN", "CTRL", "OPT", "CMD", "SPACE", "OPT", "←", "↓", "→"],
  ];
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      {keyLayout.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((key) => (
            <KBtn
              key={key}
              active={activeKey === key}
              className={getKeyClass(key)}
            >
              {key}
            </KBtn>
          ))}
        </Row>
      ))}
    </div>
  );
};
// Update KBtn to accept an 'active' prop

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">{children}</div>
);

const KBtn: React.FC<{
  className?: string;
  children: React.ReactNode;
  active?: boolean;
}> = ({ className, children, active = false }) => {
  return (
    <motion.div
      className={cn(
        "p-[0.5px] rounded-[4px]",
        "bg-white/[0.2] shadow-xl shadow-white",
        className
      )}
      animate={active ? { scale: 0.95 } : { scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className={cn(
          "h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center",
          className
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
        animate={active ? { y: 1 } : { y: 0 }}
        transition={{ duration: 0.1 }}
      >
        <div
          className={cn(
            "text-neutral-200 text-[5px] w-full flex justify-center items-center flex-col",
            active ? "text-white font-bold" : "text-white"
          )}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

const getKeyClass = (key: string): string => {
  switch (key) {
    case "SPACE":
      return "w-36"; // Wide space bar
    // case 'SHIFT':
    case "CAPS":
    case "BACKSPACE":
    case "TAB":
    case "DELETE":
    case "RETURN":
      return "w-12"; // Wider keys
    case "ESC":
    case "FN":
    case "CTRL":
    case "OPT":
    case "CMD":
      return "w-8"; // Slightly wider keys
    case "SHIFT":
      return "w-10"; // Slightly wider keys
    default:
      return "w-6"; // Default key width
  }
};

export default Keypad;
export const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-2 h-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};

// const RDXLogo = () => {
//   return (
//     <svg
//       width="66"
//       height="65"
//       viewBox="0 0 66 65"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-3 w-3 text-white"
//     >
//       <path
//         d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
//         stroke="currentColor"
//         strokeWidth="15"
//         strokeMiterlimit="3.86874"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };
