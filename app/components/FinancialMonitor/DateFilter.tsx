type PeriodType = "daily" | "monthly" | "annual" | "custom";

interface DateFiltersProps {
  periodType: PeriodType;
  onChangeDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
}

export default function DateFilters({ 
  periodType, 
  onChangeDate, 
  onChangeEndDate 
}: DateFiltersProps) {
  const inputClasses = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="flex gap-2">
      {periodType === "daily" && (
        <input
          type="date"
          onChange={(e) => onChangeDate(e.target.value)}
          className={inputClasses}
        />
      )}

      {periodType === "monthly" && (
        <input
          type="month"
          onChange={(e) => onChangeDate(e.target.value)}
          className={inputClasses}
        />
      )}

      {periodType === "annual" && (
        <input
          type="number"
          min="2020"
          max="2030"
          step="1"
          placeholder="Ano"
          onChange={(e) => onChangeDate(e.target.value)}
          className={`${inputClasses} w-24`}
        />
      )}

      {periodType === "custom" && (
        <>
          <input
            type="date"
            onChange={(e) => onChangeDate(e.target.value)}
            className={inputClasses}
          />
          <input
            type="date"
            onChange={(e) => onChangeEndDate(e.target.value)}
            className={inputClasses}
          />
        </>
      )}
    </div>
  );
}