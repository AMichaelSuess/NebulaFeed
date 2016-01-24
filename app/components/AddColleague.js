import React from 'react';
import AddColleagueStore from '../stores/AddColleagueStore';
import AddColleagueActions from '../actions/AddColleagueActions';

class AddColleague extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddColleagueStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddColleagueStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddColleagueStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var shortName = this.state.shortName.trim();
    var gender = this.state.gender;

    if (!name) {
      AddColleagueActions.invalidName();
      this.refs.nameTextField.focus();
    }

    if (!shortName) {
      AddColleagueActions.invalidShortName();
      this.refs.shortNameTextField.focus();
    }

    if (!gender) {
      AddColleagueActions.invalidGender();
    }

    if (name && shortName && gender) {
      AddColleagueActions.addColleague(name, shortName, gender);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Colleague</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Colleague Name</label>
                    <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                           onChange={AddColleagueActions.updateName} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.shortNameValidationState}>
                    <label className='control-label'>Colleague ShortName</label>
                    <input type='text' className='form-control' ref='shortNameTextField' value={this.state.shortName}
                           onChange={AddColleagueActions.updateShortName}/>
                  </div>
                  <div className={'form-group ' + this.state.genderValidationState}>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='female' value='Female' checked={this.state.gender === 'Female'}
                             onChange={AddColleagueActions.updateGender}/>
                      <label htmlFor='female'>Female</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='male' value='Male' checked={this.state.gender === 'Male'}
                             onChange={AddColleagueActions.updateGender}/>
                      <label htmlFor='male'>Male</label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddColleague;