export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};
