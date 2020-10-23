import React from 'react';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Rating from '@material-ui/lab/Rating';
import './rating.css';


export default function RatingSkill(props) {
  const {selection, range} = props;
  const [value, setValue] = React.useState(1);
  const [hover, setHover] = React.useState(-1);
  
  const onHandleRating = (selection) => {

    console.log(selection);
    setValue(selection);
  }

  return (
    <div className='rating-box'>
      <span>{selection}</span>
      <Rating
      classes={{label: 'ratingLabel'}}
        name={selection + 'hover-feedback'}
        value={value.level} 
        precision={1} max={6}
        icon={<FiberManualRecord fontSize="small" />}
        onChange={(event, newValue) => {
          onHandleRating({level: newValue, name: selection});
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <span className='rating-label'>{range[hover !== -1 ? hover : value]}</span>
    </div>
  );
}
