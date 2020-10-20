import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiPhoneNumber from "material-ui-phone-number";
import './phonenumber.css'

const styles = {};
class CreateUserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValues: {
        phone: ""
      }
    };

    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }
  handlePhoneChange(value) {
    if (value) {
      this.setState({ phone: value });
    }
  }
  render() {
    return (
      <div>
        <MuiPhoneNumber className='phone'
          margin="normal"
          name="User.PhoneNumber"
          label="Enter your Phone Number:"
          data-cy="user-phone"
          defaultCountry={"us"}
          value={this.state.phone}
          onChange={this.handlePhoneChange}
          inputRef={this.props.register({ required: true})}
        />
      </div> 
    );
  }
}

export default withStyles(styles)(CreateUserDialog);
