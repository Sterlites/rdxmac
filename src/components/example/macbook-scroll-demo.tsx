import { MacbookScroll } from "../ui/macbook-scroll";
import { motion, useScroll, useTransform } from "framer-motion";

const WebsiteContent = () => (
  <div className="h-screen bg-white dark:bg-[#0B0B0F] flex items-center justify-center">
    <h1 className="text-4xl font-bold">Rest of the Website</h1>
  </div>
);

export default function MacbookScrollDemo() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.6, 0.8], [0.5, 1]);

  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <div className="relative">
        <div className="h-[300vh]">
          <MacbookScroll
            showGradient={false}
            typingText="The quick brown fox jumps over the lazy dog."
          />
        </div>
        <motion.div className="fixed inset-0 z-10" style={{ opacity, scale }}>
          <WebsiteContent />
        </motion.div>
      </div>
    </div>
  );
}
