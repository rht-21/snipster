import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import Loader from "../Loader";

const HomeCard = ({
  text,
  href,
  className,
}: {
  text: string;
  href: string;
  className?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLinkClick = () => {
    startTransition(() => {
      setIsLoading(true);
    });
  };

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Link
      onClick={handleLinkClick}
      href={href}
      className={`flex-1 max-h-[160px] md:min-w-[300px] aspect-video flex items-center justify-center p-xxs bg-snippet-card 
    bg-cover bg-center rounded-2xl hover:shadow-lg hover:shadow-white/10 cursor-pointer overflow-hidden duration-200 invert hover:-translate-y-1 relative ${className}`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] hover:backdrop-blur-sm duration-200"></div>
      <h4 className="text-h4 font-semibold text-white z-10">{text}</h4>
    </Link>
  );
};

export default HomeCard;
