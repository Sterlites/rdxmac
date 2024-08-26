// import React from "react";
import { Cover } from "../ui/cover";

export function WebsiteContent() {
  return (
    <div className="h-screen bg-white dark:bg-[#0B0B0F] flex items-center justify-center">
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Build amazing solutions <br /> at <Cover>warp speed</Cover>
      </h1>
    </div>
  );
}
