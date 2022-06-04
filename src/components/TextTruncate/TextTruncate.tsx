import { FC } from 'react'
import "./TextTruncate.css";

type TextTruncateProps = {
  text: string,
  isMultiLine?: boolean,
}



const TextTruncate: FC<TextTruncateProps> = ({ text, isMultiLine }) => {
  const truncatedClass = isMultiLine ? "text-truncate-multi-line" : "text-truncate-single-line";
  return (
    <div className={truncatedClass}>
      <p>{text}</p>
    </div>
  );
};

export default TextTruncate