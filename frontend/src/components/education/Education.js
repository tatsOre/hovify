import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import {DatePicker} from '@material-ui/pickers';


export default function Education(props) {
    const {degree, errors, register, degree_id, onRemoveDegree} = props;
    const handleRemoveDegree = () => {
      onRemoveDegree(degree_id);
    };

    const [selectedStartDate, handleStartDateChange] = useState(null);
    const [selectedEndDate, handleEndDateChange] = useState(null);

    return(
      <article className='degree-item'>
      <IconButton onClick={handleRemoveDegree}
        disableRipple className='icon-button__remove'>
        <HighlightOffIcon
        className='icon-button' fontSize="small"/>
      </IconButton>
      <fieldset className="fieldset-block">
        <div className="fieldset-block__header">
          <div className="header-info">
            <TextField
              className="input" fullWidth
              error={errors && errors.Education && errors.Education[degree_id] && Boolean(errors.Education[degree_id].degree) }
              defaultValue={(degree && degree.degree) || ''} type="text"
              label="Degree:" name={`Education[${degree_id}].degree`}
              inputRef={register({required: true, maxLength: 80})} />
            <TextField
              className="input" fullWidth
              error={errors && errors.Education && errors.Education[degree_id] && Boolean(errors.Education[degree_id].school) }
              defaultValue={(degree && degree.school) || ''} type="text"
              label="School:" name={`Education[${degree_id}].school`}
              inputRef={register({required: true, maxLength: 80})} />
          </div>
          <div className="header-date">
            <DatePicker className="date-picker__field"
              views={["year", "month"]} value={selectedStartDate}
              onChange={handleStartDateChange} label="Start date:"
              name={`Education[${degree_id}].start_year`}
              inputRef={register()} />
            <DatePicker className="date-picker__field"
              views={["year", "month"]} value={selectedEndDate}
              onChange={handleEndDateChange} label="End date:"
              name={`Education[${degree_id}].end_year`}
              inputRef={register()} />
          </div>
        </div>
        <TextField
          multiline fullWidth
          error={errors && errors.Education && errors.Education[degree_id] && Boolean(errors.Education[degree_id].description) }
          defaultValue={(degree && degree.description) || ''}
          label="Description:" name={`Education[${degree_id}].description`}
          inputRef={register({required: true})}/> 
      </fieldset>
      </article>
    );
}
