import React from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import CustomizedRatings from '../ratingselector/Rating';
import RatingSkill from '../ratingselector/Rating';
import Checkbox from '@material-ui/core/Checkbox';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './MultipleSelect.css';




export default function MultipleSelect(props) {
  const [userSelection, setUserSelection] = React.useState([]);
  const { dataList } = props;

  const handleChange = (event) => {
    setUserSelection(event.target.value)
  };

  const handleDelete = (value) => {
    setUserSelection(
      userSelection.filter((skill) => skill !== value)
    );
  }

  return (
    <>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={userSelection || []}
          onChange={handleChange}
          placeholder="Select a skill"
          input={<Input id="select-multiple-chip" />}
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
        {userSelection.map((selection, index) => <RatingSkill  key={index} selection={selection}></RatingSkill>)}
    </>
  );
}
