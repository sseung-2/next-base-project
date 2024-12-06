import S from "./styles.module.scss";
import { CheckBoxIcon } from "@icons/index";
interface Props {
  checked: boolean; // password | email
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange 핸들러
  label: string;
}
const CheckBox = ({ checked, onChange, label }: Props) => {
  return (
    <label className={S["save-email"]}>
      <div
        className={`${S["checkbox-wrap"]} ${checked ? "" : S["is-not-check"]}`}
      >
        <CheckBoxIcon className={S["checked-icon"]} />
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={S["label"]}>{label}</span>
    </label>
  );
};

export default CheckBox;
