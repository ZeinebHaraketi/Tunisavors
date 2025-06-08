
type FlagProps = {
  countryCode: string; // exemple "tn"
  alt?: string;
  className?: string;
};

export function Flag({ countryCode, alt = "", className = "" }: FlagProps) {
  return (
    <img
      src={`/flags/${countryCode.toLowerCase()}.svg`}
      alt={alt}
      className={`w-5 h-4 rounded-sm object-cover ${className}`}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
