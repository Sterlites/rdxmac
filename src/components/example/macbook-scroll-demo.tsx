import { MacbookScroll } from "../ui/macbook-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { WebsiteContent } from "./website-content";

export default function MacbookScrollDemo() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.6, 0.8], [0.5, 2.5]);

  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <div className="relative">
        <div className="h-[300vh]">
          <MacbookScroll
            showGradient={false}
            typingText="The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog."
          />
        </div>
        <motion.div className="fixed inset-0 z-10" style={{ opacity, scale }}>
          <WebsiteContent />
        </motion.div>
      </div>
    </div>
  );
}
