const RoundedButton = ({
  text,
  icon,
  className,
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      id="rounded-button"
      className={`rounded-full flex items-center justify-center gap-1 cursor-pointer bg-red text-foreground px-4 py-2 duration-200 hover:bg-foreground hover:text-red ${className}`}
    >
      {text}
      {icon}
    </button>
  );
};

export default RoundedButton;
