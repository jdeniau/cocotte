var Choice = React.createClass({
    render: function () {
        return (
            <p>
                {this.props.prefix + ' '}
                <strong>{this.props.value}</strong>
            </p>
        );
    }
});

var Container = React.createClass({
    reload: function () {
        window.location.reload(true);
    },
    render: function () {
        var containerStyle = {
            backgroundImage: 'url(/img/bg_' + this.props.bgNumber + '.jpg), url(/img/trame.png)',
        };

        var possibilities = [
            'Pizza',
            'Kebab',
            'Subway',
            'Sushis',
            'Graines',
            'Frites Alors',
            'Croco\'Green',
        ]

        possibilities = shuffle(possibilities);

        return (
            <div className="cocotte" style={containerStyle} onClick={this.reload}>
                <div className="wrapper">
                    <div className="cv">
                        <h1>Où est-ce qu&apos;on bouffe à midi ?</h1>
                        <Choice prefix="Ben on a qu'à aller chez" value={possibilities[0]} />
                        <Choice prefix="Ou au pire chez" value={possibilities[1]} />
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
    <Container bgNumber={bgNumber} />,
    document.getElementById('main')
);
