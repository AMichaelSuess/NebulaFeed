var React = require('react');


var Character = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      characterId: 0,
      name: 'TBD',
      race: 'TBD',
      bloodline: 'TBD',
      gender: 'TBD',
      wins: 0,
      losses: 0,
      winLossRatio: 0
    }
  },

  componentDidMount: function() {
    this.setState({ path: this.context.router.getCurrentPath() });

    this.getCharacter()
      .done(function(data) {
        document.body.classList.add('profile');
        document.body.classList.add('profile-' + data.race.toLowerCase());

        var reportsJSON = localStorage.getItem('nef-reports');

        if (!reportsJSON) {
          localStorage.setItem('nef-reports', JSON.stringify({}));
        } else {
          var reports = JSON.parse(reportsJSON);

          if (reports[data.characterId]) {
            this.refs.reportButton.getDOMNode().disabled = true;
            this.refs.reportButton.getDOMNode().innerText = 'Reported';
          }
        }

        this.setState({
          characterId: data.characterId,
          name: data.name,
          race: data.race,
          bloodline: data.bloodline,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.substring(1),
          wins: data.wins,
          losses: data.losses,
          winLossRatio: data.winLossRatio
        });

        $('.magnific-popup').magnificPopup({
          type: 'image',
          mainClass: 'mfp-zoom-in',
          closeOnContentClick: true,
          midClick: true,
          zoom: {
            enabled: true,
            duration: 300
          }
        });
      }.bind(this));
  },

  componentWillUnmount: function() {
    document.body.classList.remove('profile');
    document.body.classList.remove('profile-' + this.state.race.toLowerCase());
  },

  componentDidUpdate: function() {
    var currentPath = this.context.router.getCurrentPath();

    if (currentPath === this.state.path) {
      return;
    }

    this.setState({ path: currentPath });

    this.refs.container.getDOMNode().classList.remove('fadeIn');

    this.getCharacter()
      .done(function(data) {
        document.body.classList.remove('profile-' + this.state.race.toLowerCase());
        document.body.classList.add('profile-' + data.race.toLowerCase());
        this.refs.container.getDOMNode().classList.add('fadeIn');

        this.setState({
          characterId: data.characterId,
          name: data.name,
          race: data.race,
          bloodline: data.bloodline,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.substring(1),
          wins: data.wins,
          losses: data.losses,
          winLossRatio: data.winLossRatio
        });

        $('.magnific-popup').magnificPopup({
          type: 'image',
          mainClass: 'mfp-zoom-in',
          closeOnContentClick: true,
          midClick: true,
          zoom: {
            enabled: true,
            duration: 300
          }
        });
      }.bind(this));
  },

  getCharacter: function() {
    return $.ajax({ url: '/api/characters/' + this.context.router.getCurrentParams().id })
  },

  handleReportCharacter: function() {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { characterId: this.state.characterId }
    })
      .done(function() {
        this.refs.reportButton.getDOMNode().disabled = true;
        this.refs.reportButton.getDOMNode().innerText = 'Reported';

        var reportsJSON = localStorage.getItem('nef-reports');
        var reports = JSON.parse(reportsJSON);

        reports[this.state.characterId] = true;
        localStorage.setItem('nef-reports', JSON.stringify(reports));
      }.bind(this));
  },

  render: function() {
    return (
      <div ref='container' className='container animated fadeIn'>
        <div className='profile-img'>
          <a className='magnific-popup' href={'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg'}>
            <img src={'https://image.eveonline.com/Character/' + this.state.characterId + '_256.jpg'}/>
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2>{this.state.name}</h2>
          <h4 className='lead'>Race: <strong>{this.state.race}</strong></h4>
          <h4 className='lead'>Bloodline: <strong>{this.state.bloodline}</strong></h4>
          <h4 className='lead'>Gender: <strong>{this.state.gender}</strong></h4>

          <button ref='reportButton' className='btn btn-transparent' onClick={this.handleReportCharacter}>
            Report Character
          </button>
        </div>
        <div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>{this.state.winLossRatio}</span>Winning Percentage</li>
            <li><span className='stats-number'>{this.state.wins}</span> Wins</li>
            <li><span className='stats-number'>{this.state.losses}</span> Losses</li>
          </ul>
        </div>
        <div className='row'>
          <div className='col-sm-12 text-center'>
            <h4 className='lead'> Subscribe for weekly statistics on <strong>{this.state.name}</strong></h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 col-sm-offset-3'>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='Email'/>
              <span className='input-group-btn'>
                <button className='btn btn-default' type='button'>Subscribe</button>
              </span>
            </div>
          </div>
        </div>


      </div>
    );
  }
});

module.exports = Character;