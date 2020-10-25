import React from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import RatingSkill from '../ratingselector/Rating';
import Checkbox from '@material-ui/core/Checkbox';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Rating from '@material-ui/lab/Rating';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

import './MultipleSelect.css';


export default function MultipleSelect(props) {
  const [userSelection, setUserSelection] = React.useState([]);
  const [selectionAndRating, setSelectionAndRating] = React.useState([]);

  const { dataList, range, register, selectedType } = props;

  const handleChange = (event) => {
    setUserSelection(event.target.value)
  };

  const onHandleRating = (selection, ratingValue) => {
    const indexOfSelection = selectionAndRating.findIndex((singleSelectionAndRating) => singleSelectionAndRating.name === selection)
    indexOfSelection === -1 
      ? setSelectionAndRating([
        ...selectionAndRating,
        {
          name: selection,
          level: ratingValue
        }
      ])
      : setSelectionAndRating([
        ...selectionAndRating.slice(0, indexOfSelection), ...selectionAndRating.slice(indexOfSelection + 1)
      ])
  };

  const handleDelete = (value) => {
    setUserSelection(
      userSelection.filter((skill) => skill !== value)
    );
    setSelectionAndRating(
      selectionAndRating.filter((currentSelectionAndRating) => currentSelectionAndRating.name !== value)
    )
  }

  return (
    <>
        <input type="hidden" name={selectedType} ref={register()} value={JSON.stringify(selectionAndRating)}/>
        <Select
          labelId="demo-mutiple-chip-label"          
          multiple
          value={userSelection || []}
          onChange={handleChange}
          input={<Input />}
          className='multipleSelect'
          classes={{select: 'selectContainer'}}
          renderValue={() => (
            <>
              {userSelection.map((value, index) => (
                <Chip onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                key={index} className='chip' label={value} onDelete={() => handleDelete(value)} deleteIcon={<HighlightOffIcon />} />
              ))}
            </>
          )}
        >
          {dataList.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={!!userSelection.find((selection) => selection === item)} />
              {item}
            </MenuItem>
          ))}
        </Select>
        {userSelection.map((selection, index) => <RatingSkill key={index} ratingIndex={index} onRatingSelection={onHandleRating} selection={selection} range={range}></RatingSkill>)}
    </>
  );
}
