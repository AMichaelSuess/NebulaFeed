import alt from '../alt';

class AddColleagueActions {
  constructor() {
    this.generateActions(
      'addColleagueSuccess',
      'addColleagueFail',
      'updateName',
      'updateShortName',
      'updateGender',
      'invalidName',
      'invalidShortName',
      'invalidGender'
    );
  }

  addColleague(name, shortName, gender) {
    $.ajax({
      type: 'POST',
      url: '/api/colleagues',
      data: { name: name, shortName: shortName, gender: gender }
    })
      .done((data) => {
        this.actions.addColleagueSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addColleagueFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddColleagueActions);