import { Input, TInputProps } from '../../Atoms/Input';

type TInputContentInputProps = TInputProps & {
  htmlForLink?: string;
  value: string | number | Date | readonly string[] | undefined;
  inputType?: string
};

export function InputContentInput({
  htmlForLink = "input",
  value = "",
  inputType = "",
  ...props
}: TInputContentInputProps) {

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={inputType}
        id={htmlForLink}
        value={value}
      />
    </div>
  );
}
