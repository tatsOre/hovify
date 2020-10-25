import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// ---> Muestra de formato string para enviar Date('2014-08-18T21:11:54')
export default function DayMonthYearPicker(props) {
  const {name, register, errors} = props;
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid>
        <KeyboardDatePicker  className='date-picker'
          name={name}
          margin="dense"
          id="date-picker-dialog"
          label="Select your Birthday Date:"
          format="yyyy-MM-dd"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          inputRef={register({ required: true })}
          error={ errors && errors.User && errors.User.Birthday && Boolean(errors.User.Birthday) }
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
