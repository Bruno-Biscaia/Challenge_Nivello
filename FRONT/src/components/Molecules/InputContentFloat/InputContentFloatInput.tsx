import { TInputProps } from '../../Atoms/Input';

type TInputContentFloatInputProps = TInputProps &  {
    htmlForLink?: string;
    value: string | number | Date | readonly string[] | undefined;
    inputType?: string
    id?: string
  };

export function InputContentFloatInput({
  htmlForLink = "input",
  value = "",  
  inputType = "", 
  id,
  ...props
}: TInputContentFloatInputProps) {

  return (
    <input     
    {...props}
    type={inputType}    
    id={id}
    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 focus:text-amber-500 peer" 
    placeholder="" 
    required />
  );
}
