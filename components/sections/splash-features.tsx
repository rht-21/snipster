import {
  IconClock,
  IconGitBranch,
  IconHeart,
  IconLock,
  IconPlug,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";

const features = [
  {
    icon: <IconWorld />,
    heading: "Multiple Languages Supported",
    description: "Create and store snippets in any language you use.",
  },
  {
    icon: <IconLock />,
    heading: "Public or Private",
    description:
      "Choose to keep your snippets private or share them with the world.",
  },
  {
    icon: <IconHeart />,
    heading: "Like and Save",
    description: "Like snippets to keep your favorites in one place.",
  },
  {
    icon: <IconGitBranch />,
    heading: "Import from GitHub",
    description:
      "Soon, you’ll be able to import your snippets directly from GitHub.",
    comingSoon: true,
  },
  {
    icon: <IconPlug />,
    heading: "Browser Extension",
    description:
      "A browser extension is on the way to save and access snippets faster.",
    comingSoon: true,
  },
  {
    icon: <IconClock />,
    heading: "More Coming Soon",
    description: "Exciting new features are on the way!",
    comingSoon: true,
  },
];

const SplashFeatures = () => {
  return (
    <section className="sm:min-h-[60dvh] flex flex-col items-start pt-l">
      <h1 className="text-h1 sm:text-h1 max-w-6xl font-semibold tracking-wide text-left">
        What you can do?
      </h1>
      <p className="text-base sm:text-body text-left max-w-3xl my-s sm:mt-xs text-foreground/70 leading-relaxed">
        Discover the Features That Make Snipster Your Ultimate Code Companion.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-m mb-s mt-xxs sm:my-s">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-xs rounded-lg shadow-lg space-y-4 bg-gray-900"
          >
            <div className="flex item-center justify-between">
              <p className="text-orange">{feature.icon}</p>
              {feature.comingSoon && (
                <small className="bg-foreground/30 text-orange py-1 px-2 rounded-md">
                  Coming Soon
                </small>
              )}
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {feature.heading}
            </h3>
            <p className="text-base text-foreground/70">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SplashFeatures;
