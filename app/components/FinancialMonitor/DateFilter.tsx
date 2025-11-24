import moment from "moment";

type PeriodType = "monthly" | "annual";

interface DateFiltersProps {
  periodType: PeriodType;
  onChangeDate: (date: string) => void;
  valueInput: { monthValue: string, yearValue: number }
  onChangeInput: (field: 'monthValue' | 'yearValue', value: string) => void;
}

export default function DateFilters({
  periodType,
  onChangeDate,
  valueInput,
  onChangeInput

}: DateFiltersProps) {
  const inputClasses = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="flex gap-2">


      {periodType === "monthly" && (
        <input
          type="month"
          onChange={(e) => {
            onChangeDate(e.target.value)
            onChangeInput('monthValue', e.target.value);
          }
          }
          className={inputClasses}
          value={valueInput.monthValue}
        />
      )}

      {periodType === "annual" && (
        <input
          type="number"
          min="2020"
          max="2030"
          step="1"
          placeholder="Ano"
          onChange={(e) => {
              onChangeDate(e.target.value);
              onChangeInput('yearValue', e.target.value);
              
            }
          }
          className={`${inputClasses} w-24`}
          value={valueInput.yearValue}
        />
      )}


    </div>
  );
}