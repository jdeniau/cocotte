var palette = shuffle([
    '#3b5998',
    '#61bdcb',
    '#c2f7fd',
    '#696969',
    '#bf3f34',
    '#5a100d',
    '#eab83f',
    '#f28c3a',
    '#f17553',
    '#99c954',
    '#038d80',
    '#945c7f',
]);

var Choice = React.createClass({
    getInitialState: function() {
        return { visible: true }
    },
    reveal: function() {
        this.setState({ visible: false })
    },
    render: function() {
        var choiceStyle = {
            background: palette[this.props.paletteNb]
        };
        if (!this.state.visible) {
            choiceStyle['display'] = 'none';
        }
        return (
            <div className="choiceBox flex-items">
                <div className="mask" onClick={this.reveal} style={choiceStyle}></div>
                <strong>{this.props.value.name}</strong>
            </div>
        );
    }
});

var ChoiceContainer = React.createClass({
    getInitialState: function() {
        return { choices: [] }
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({choices: shuffle(data)});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var containerStyle = {
            backgroundImage: 'url(/img/bg_' + this.props.bgNumber + '.jpg), url(/img/trame.png)',
        };

        var choiceNodes = this.state.choices.map(function(choice, key) {
            return (
                <Choice key={key} paletteNb={key} value={choice} />
            );
        });

        return (
            <div className="cocotte" style={containerStyle}>
                <div className="wrapper">
                    <div className="cv flex-container">
                        <h1>Où est-ce qu&apos;on bouffe à midi ?</h1>
                        {choiceNodes}
                    </div>
                </div>
            </div>
        );
    }
});

var bgNumber = Math.floor(Math.random() * (26 - 1)) + 1;

function shuffle(inputArr) {
  //  taken from: http://phpjs.org/functions/shuffle/

  var valArr = [],
    k = '',
    i = 0,
    strictForIn = false,
    populateArr = [];

  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function() {
    return 0.5 - Math.random();
  });

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return strictForIn || populateArr;
}


React.render(
    <ChoiceContainer bgNumber={bgNumber} url="choices.json" />,
    document.getElementById('main')
);
