import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
      label: 'Portfolio Site URL:',
      name: 'PortfolioURL',
      type: 'text'
    },
    {
      className: 'linkedin-acc',
      label: 'LinkedIn Account URL:',
      name: 'LinkedIn',
      type: 'text'
    },
    {
      className: 'github-acc',
      label: 'Github Account:',
      name: 'GitHubURL',
      type: 'text'
    },
    {
      className: 'twitter-acc',
      label: 'Twitter Account:',
      name: 'TwitterURL',
      type: 'text'
    }
  ]
  return (
    <div className={classes.root}>
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
