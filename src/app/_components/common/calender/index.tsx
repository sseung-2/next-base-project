import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { getDay, setSeconds, setMinutes, setHours, format } from "date-fns";
import "./css/customDatePicker.scss";
import CustomDatePickerHeader from "./CustomDatePickerHeader";
import CustomDateInput from "./CustomDateInput";
// import { setMinutes } from "date-fns/setMinutes";
// import { setHours } from "date-fns/setHours";
import { forwardRef, useState } from "react";

interface Props {
  date: Date | null;
  setDate: (v: Date | null) => void;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  dateFormat?: string;
  timeFormat?: string;
  timeIntervals?: number;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}
/** Exemple date & time format
 * "yyyy-MM-dd hh:mm"
 */
const Calendar = forwardRef<HTMLInputElement, Props>(
  (
    {
      date,
      setDate,
      minDate,
      maxDate,
      dateFormat = "yyyy-MM-dd",
      timeFormat,
      timeIntervals = 30,
      disabled = false,
      error = false,
      placeholder,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const handleSetOpen = () => {
      setOpen((prev) => !prev);
    };

    const setDateFormat = (dateFormat: string, timeFormat?: string) => {
      return timeFormat ? dateFormat + " " + timeFormat : dateFormat;
    };

    return (
      <div
        className={`custom-react-datepicker__wrapper ${
          disabled ? "disabled" : ""
        }`}
      >
        <DatePicker
          locale={ko}
          // 날짜
          dateFormat={dateFormat}
          dayClassName={(date: Date) => (getDay(date) === 0 ? "sunDay" : "")}
          // 시간
          showTimeSelect={!!timeFormat}
          timeFormat={timeFormat}
          placeholderText={placeholder}
          timeIntervals={timeIntervals}
          injectTimes={[
            setHours(setMinutes(setSeconds(date || new Date(), 59), 59), 23),
          ]}
          // 기본설정
          value={
            date ? format(date, setDateFormat(dateFormat, timeFormat)) : ""
          }
          customInput={
            <CustomDateInput
              hasTime={!!timeFormat}
              error={error}
              isOpen={open}
              ref={ref}
            />
          }
          selected={date}
          onChange={(value) => setDate(value)}
          {...(minDate ? { minDate } : {})}
          {...(maxDate ? { maxDate } : {})}
          disabled={disabled}
          onCalendarClose={handleSetOpen}
          onCalendarOpen={handleSetOpen}
          renderCustomHeader={(props) => <CustomDatePickerHeader {...props} />}
        />
      </div>
    );
  }
);

Calendar.displayName = "Calendar";
export default Calendar;
