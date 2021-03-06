'use strict';
var util = require('util')
  , path = require('path')
  , os = require('os')
  , yeoman = require('yeoman-generator')
  , PhaserGenerator;

PhaserGenerator = module.exports = function PhaserGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PhaserGenerator, yeoman.generators.Base);

PhaserGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    cb();
  }.bind(this));
};

PhaserGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/assets');
  this.mkdir('src/css');
  this.mkdir('src/js');
  this.mkdir('src/js/lib');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');

  this.copy('bowerrc', '.bowerrc');
  this.copy('_gulpfile.js', 'gulpfile.js');
};

PhaserGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');

  this.copy('src/assets/minecraftia.png', 'src/assets/minecraftia.png');
  this.copy('src/assets/minecraftia.xml', 'src/assets/minecraftia.xml');
  this.copy('src/assets/player.png', 'src/assets/player.png');
  this.copy('src/assets/preloader.gif', 'src/assets/preloader.gif');
  this.copy('src/css/main.css', 'src/css/main.css');
  
  this.template('src/js/boot.js', 'src/js/boot.js');
  this.template('src/js/game.js', 'src/js/game.js');
  this.template('src/js/main.js', 'src/js/main.js');
  this.template('src/js/menu.js', 'src/js/menu.js');
  this.template('src/js/preloader.js', 'src/js/preloader.js');
  this.template('src/index.html', 'src/index.html');
};

