import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }: CardProps) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};
