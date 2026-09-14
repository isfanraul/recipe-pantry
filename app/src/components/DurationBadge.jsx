import hourglass from '../assets/hourglass.svg';
import './DurationBadge.css';

export function DurationBadge({ duration }) {
  return (
    <div className="recipe-duration">
      <img src={hourglass} alt="Hourglass icon" />
      {duration}
    </div>
  );
}
