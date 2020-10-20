import React from 'react';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Rating from '@material-ui/lab/Rating';
import './rating.css';

const labels = {
  1: 'Low',
  2: 'Regular',
  3: 'Decent',
  4: 'Mid',
  5: 'Pro',
  6: 'Expert'
};

export default function RatingSkill(props) {
  const {selection} = props;
  const [value, setValue] = React.useState({});
  const [hover, setHover] = React.useState(-1);
  
  const onHandleRating = (selection) => {
    setValue(selection);
  }

  return (
    <div className='rating-box'>
      <span>{selection}</span>
      <Rating
      classes={{label: 'ratingLabel'}}
        name={selection + 'hover-feedback'}
        value={value.rating}
        precision={1}
        defaultValue={1} max={6}
        icon={<FiberManualRecord fontSize="small" />}
        onChange={(event, newValue) => {
          onHandleRating({rating: newValue, name: selection});
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <span className='rating-label'>{labels[hover !== -1 ? hover : value]}</span>
    </div>
  );
}
