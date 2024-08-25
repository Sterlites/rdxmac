// macbook-scroll-demo.tsx

import { MacbookScroll } from "../ui/macbook-scroll";
// import linearImage from '../../assets/linear.webp';

export default function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={
          <span>
            This Macbook is built by RDx <br /> and is not a gif
          </span>
        }
        // src={linearImage}
        showGradient={false}
        typingText="Rohit Dwivedi" // This text will be "typed" on the keyboard
      />
    </div>
  );
}