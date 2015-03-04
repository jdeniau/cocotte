var Choice = React.createClass({displayName: "Choice",
    render: function () {
        return (
            React.createElement("p", null,
                this.props.prefix + ' ',
                React.createElement("strong", null, this.props.value)
            )
        );
    }
});

var Container = React.createClass({displayName: "Container",
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
            React.createElement("div", {className: "cocotte", style: containerStyle, onClick: this.reload},
                React.createElement("div", {className: "wrapper"},
                    React.createElement("div", {className: "cv"},
                        React.createElement("h1", null, "Où est-ce qu'on bouffe à midi ?"),
                        React.createElement(Choice, {prefix: "Ben on a qu'à aller chez", value: possibilities[0]}),
                        React.createElement(Choice, {prefix: "Ou au pire chez", value: possibilities[1]})
                    )
                )
            )
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
    React.createElement(Container, {bgNumber: bgNumber}),
    document.getElementById('main')
);
