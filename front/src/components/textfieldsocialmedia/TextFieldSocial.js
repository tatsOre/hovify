import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '15px 5px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
}));

export default function TextFieldSocial(props) {
  const {errors, register} = props;
  const classes = useStyles();

  const acc_items = [
    {
      className: 'personal-site',
      label: 'Portfolio Site:',
      name: 'PortfolioURL',
      type: 'url'
    },
    {
      className: 'linkedin-acc',
      label: 'LinkedIn Account:',
      name: 'LinkedIn',
      type: 'url'
    },
    {
      className: 'github-acc',
      label: 'Github Account:',
      name: 'GitHubURL',
      type: 'url'
    },
    {
      className: 'twitter-acc',
      label: 'Twitter Account:',
      name: 'TwitterURL',
      type: 'url'
    }
  ]
  return (
    <div className={classes.root}>
      <TextField
        fullWidth className='email'
        defaultValue='ddfa@g.com'
        label='Email Address:' name='email'
        style={{ marginBottom: 5 }} margin="dense"
        InputLabelProps={{ shrink: true, }}
        error={errors.Email && true} type='Email'
        inputRef={register({ required: true, maxLength: 200 })}
      />
      {
        acc_items.map((acc, index) => 
          <TextField key={acc.name + index}
            fullWidth className={acc.className}
            label={acc.label} name={acc.name}
            style={{ marginBottom: 5 }} margin="dense"
            InputLabelProps={{ shrink: true, }}
            error={errors[acc.name] && true} type={acc.type}
            inputRef={register({ maxLength: 200 })}
            />
          )
      }
    </div>
  );
}
