import { FC } from 'react'
import './Trimmer.css';

type TrimmerProps = {
  text: string;
  isMultiLine?: boolean;
};



const Trimmer: FC<TrimmerProps> = ({ text, isMultiLine }) => {
  const truncatedClass = isMultiLine ? 'text-truncate-multi-line' : 'text-truncate-single-line';
  return (
    <div className={truncatedClass}>
      <p>{text}</p>
    </div>
  );
};

export default Trimmer;