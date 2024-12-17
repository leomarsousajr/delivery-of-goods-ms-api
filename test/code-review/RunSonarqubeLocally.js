const scanner = require('sonarqube-scanner');

const options = {
  'sonar.login': process.env.SONAR_LOGIN,
  'sonar.password': process.env.SONAR_PASSWORD
};

scanner({ options }, () => process.exit());
