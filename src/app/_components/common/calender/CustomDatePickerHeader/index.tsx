import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import S from "./styles.module.scss";
import { CalendarArrowIcon } from "@icons/index";

const CustomDatePickerHeader = (props: ReactDatePickerCustomHeaderProps) => {
  const formatDate = (d: Date): string => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  const decrease = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.decreaseMonth();
  };

  const increase = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.increaseMonth();
  };

  return (
    <div className={S["calendar-header"]}>
      <button
        className={`${S["calendar-arrow"]} ${
          props.prevMonthButtonDisabled ? S["disabled"] : ""
        }`}
        onClick={decrease}
      >
        <CalendarArrowIcon
          width={20}
          height={20}
          className={S["calendar-arrow-prev"]}
        />
      </button>
      <div className={S["calendar-month"]}>{formatDate(props.date)}</div>
      <button
        className={`${S["calendar-arrow"]} ${
          props.prevMonthButtonDisabled ? S["disabled"] : ""
        }`}
        onClick={increase}
      >
        <CalendarArrowIcon
          width={20}
          height={20}
          className={S["calendar-arrow-next"]}
        />
      </button>
    </div>
  );
};

export default CustomDatePickerHeader;
