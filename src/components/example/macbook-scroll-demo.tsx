// In macbook-scroll-demo.tsx

import { MacbookScroll } from "../ui/macbook-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { WebsiteContent } from "./website-content";

export default function MacbookScrollDemo() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.8, 0.9], [0.5, 1.8]);

  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <div className="relative">
        <div className="h-[330vh]">
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
      </div>
    </div>
  );
}