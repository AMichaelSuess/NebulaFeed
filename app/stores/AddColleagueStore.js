import alt from '../alt';
import AddColleagueActions from '../actions/AddColleagueActions';

class AddColleagueStore {
  constructor() {
    this.bindActions(AddColleagueActions);
    this.name = '';
    this.shortName = '';
    this.gender = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.shortNameValidationState = '';
    this.genderValidationState = '';
  }

  onAddColleagueSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddColleagueFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateShortName(event) {
    this.shortName = event.target.value;
    this.shortNameValidationState = '';
  }

  onUpdateGender(event) {
    this.gender = event.target.value;
    this.genderValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a valid colleague\'s name.';
  }

  onInvalidGender() {
    this.genderValidationState = 'has-error';
  }
}

export default alt.createStore(AddColleagueStore);