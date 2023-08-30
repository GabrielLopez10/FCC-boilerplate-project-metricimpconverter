'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      let error = '';

      if (initNum === 'invalid number') {
        error = 'invalid number';
      }
      if (initUnit === 'invalid unit') {
        error = 'invalid unit';
      } 
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        error = 'invalid number and unit';
      }

      if (error) {
        return res.send(error);
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string
      });
    });

};
