import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import {DatePicker} from '@material-ui/pickers';


export default function Experience(props) {
    const {professional, errors, register, experience_id, onRemoveExperience} = props;
    const handleRemoveExperience = () => {
      onRemoveExperience(experience_id);
    };

    const [selectedStartDate, handleStartDateChange] = useState(null);
    const [selectedEndDate, handleEndDateChange] = useState(null);

    return(
      <article className='experience-item'>
        <IconButton onClick={handleRemoveExperience}
          disableRipple className='icon-button__remove'>
          <HighlightOffIcon
          className='icon-button' fontSize="small"/>
        </IconButton>
        <fieldset className="fieldset-block">
              <div className="fieldset-block__header">
                <div className="header-info">
                  <TextField 
                    className="input" fullWidth
                    error={errors && errors.Professional && errors.Professional[experience_id] && Boolean(errors.Professional[experience_id].role)}
                    defaultValue={(professional && professional.role) || ''} type="text"
                    label="Role:" name={`Professional[${experience_id}].role`}
                    inputRef={register({required: true, maxLength: 80})}/>
                  <TextField
                    className="input" fullWidth
                    error={errors && errors.Professional && errors.Professional[experience_id] && Boolean(errors.Professional[experience_id].company)}
                    defaultValue={(professional && professional.company) || ''} type="text"
                    label="Company:" name={`Professional[${experience_id}].company`}
                    inputRef={register({required: true, maxLength: 80})} />
                </div>
                <div className="header-date">
                  <DatePicker className="date-picker__field"
                    views={["year", "month"]} value={selectedStartDate}
                    onChange={handleStartDateChange} label="Start date:"
                    name={`Professional[${experience_id}].start_year`}
                    inputRef={register()} />
                  <DatePicker className="date-picker__field"
                    views={["year", "month"]} value={selectedEndDate}
                    onChange={handleEndDateChange} label="End date:"
                    name={`Professional[${experience_id}].end_year`}
                    inputRef={register()} />
                </div>
              </div>
              <TextField
                multiline fullWidth
                error={errors && errors.Professional && errors.Professional[experience_id] && Boolean(errors.Professional[experience_id].description)}
                defaultValue={(professional && professional.description) || ''}
                label="Description:" name={`Professional[${experience_id}].description`}
                inputRef={register({required: true})}/>
        </fieldset>
      </article>
    );
}