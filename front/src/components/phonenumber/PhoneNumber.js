import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MuiPhoneNumber from "material-ui-phone-number";
import { Container } from "@material-ui/core";

export default function PhoneNumberV() {
    const [value, setValue] = React.useState({phone: '',});

    const handlePhoneChange = (event) => {
      setValue(event.target.value);
    };

    return (
        <article
          fullWidth className='phone-number'
        >
          <MuiPhoneNumber
            name="phone"
            label="tatiana"
            data-cy="user-phone"
            defaultCountry={"us"}
            value={value}
            onChange={handlePhoneChange}
          />
        </article>
 
    );
};
/*
const [value, setValue] = React.useState({phone: '',});
    const handleChange = name => event => {
    setValue({ ...value, [name]: event.target.value });
  }; */