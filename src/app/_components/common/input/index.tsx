import S from "./styles.module.scss";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({ onChange, placeholder }: Props) => {
  return (
    <div className={S["input-container"]}>
      <input
        className={S.input}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
