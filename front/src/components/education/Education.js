import React from 'react';
import TextField from '@material-ui/core/TextField';
import YearMonthPicker from '../datepicker/DateSelector';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';

export default function Education(props) {
    const {degree, errors, register, degree_id, onRemoveDegree} = props;
    const inputids = {
        degree: "degree" + degree_id,
        school: "school" + degree_id,
        description: "description" + degree_id
    }
    const handleRemoveDegree = () => {
      onRemoveDegree(degree_id);
    };
    console.log(errors);
    return(
      <article className='degree-item'>
      <IconButton onClick={handleRemoveDegree}
        disableRipple className='icon-button__remove'>
        <RemoveCircleOutlineIcon
        className='icon-button' fontSize="small"/>
      </IconButton>
      <fieldset className="fieldset-block">
        <div className="fieldset-block__header">
          <div className="header-info">
            <TextField
              className="input" fullWidth
              error={errors && errors.Education && errors.Education[degree_id] && Boolean(errors.Education[degree_id].degree) }
              defaultValue={(degree && degree.degree) || ''} type="text"
              label="Degree" name={`Education[${degree_id}].degree`}
              inputRef={register({required: true, maxLength: 80})} />
            <TextField
              className="input" fullWidth
              error={errors && errors.Education && errors.Education[degree_id] && Boolean(errors.Education[degree_id].school) }
              defaultValue={(degree && degree.school) || ''} type="text"
              label="School" name={`Education[${degree_id}].school`}
              inputRef={register({required: true, maxLength: 80})} />
          </div>
          <div className="header-date">
            <YearMonthPicker label='Start date:'
              name={`Education[${degree_id}].start_year`}
               />
            <YearMonthPicker label='End date:'
              name={`Education[${degree_id}].end_year`}
               />
          </div>
        </div>
        <TextField
          multiline
          fullWidth
          error={errors && errors.Education && errors.Education[degree_id] && Boolean(errors.Education[degree_id].description) }
          defaultValue={(degree && degree.description) || ''}
          label="Description" name={`Education[${degree_id}].description`}
          inputRef={register({required: true})}/> 
      </fieldset>
      </article>
    );
}
