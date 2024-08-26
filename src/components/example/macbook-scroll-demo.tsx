// In macbook-scroll-demo.tsx

import { MacbookScroll } from "../ui/macbook-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { WebsiteContent } from "./website-content";
import LampDemo from "../ui/lamp";

export default function MacbookScrollDemo() {
  const { scrollYProgress } = useScroll();

  // Animate the opacity from 0 to 1 between 0.7 and 0.8 of the scroll progress
  const opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 0.99]);

  // Animate the scale from 0.3 to 1.8 between 0.7 and 0.8 of the scroll progress
  const scale = useTransform(scrollYProgress, [0.7, 0.85], [0.4, 1.7]);

  // Animate the opacity of the lamp from 0 to 1 between 0.95 and 1 of the scroll progress
  const lampOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  // Animate the translateY of the lamp from 100% to 0 between 0.95 and 1 of the scroll progress
  const lampTranslateY = useTransform(scrollYProgress, [0.95, 1], ['100%', '0%']);
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <div className="relative">
        <div className="h-[330vh]"> {/* Slightly increased height */}
          <MacbookScroll
            showGradient={false}
            typingText="The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog."
          />
        </div>
        <motion.div
          className="fixed inset-0 z-10"
          style={{ opacity, scale }}
          initial={{ opacity: 0, scale: 0.5 }}
        >
          <WebsiteContent />
        </motion.div>
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-20"
          style={{ 
            opacity: lampOpacity, 
            translateY: lampTranslateY 
          }}
          initial={{ opacity: 0, translateY: '100%' }}
        >
          <LampDemo />
        </motion.div>
      </div>
    </div>
  );
}
