import { MacbookScroll } from "../ui/macbook-scroll";

export default function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={
          <span>
            This Macbook is built by RDx <br /> and is not a gif
          </span>
        }

        // src={`../../../assets/linear.webp`}
        
        showGradient={false}
      />
    </div>
  );
}
