import { useState, useEffect } from "react";
import Image from "next/image";

const CAROUSEL_ITEMS = [
  {
    image: "/illustrators/work-together.svg",
    text: "Build your next feature with a clean App Router setup.",
  },
  {
    image: "/illustrators/online_meeting.svg",
    text: "Auth, Redux, and API layers are ready to extend.",
  },
  {
    image: "/illustrators/distraction.svg",
    text: "Start from boilerplate — add business logic when you need it.",
  },
];

export function IllustrationSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden min-h-screen w-full flex-1 items-center justify-center bg-white p-6 lg:flex">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[40px] border border-gray-50/50 bg-[#F8F6FC] pb-16 pt-8">
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center">
          <div className="relative mb-10 h-[420px] w-full overflow-hidden">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {CAROUSEL_ITEMS.map((item, index) => (
                <div
                  key={item.image}
                  className="flex h-full w-full flex-shrink-0 items-center justify-center px-8"
                >
                  <Image
                    src={item.image}
                    alt={`Illustration ${index + 1}`}
                    width={500}
                    height={420}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="w-full max-w-md text-center text-lg text-gray-500">
            {CAROUSEL_ITEMS[activeIndex]?.text}
          </p>
        </div>
      </div>
    </div>
  );
}
