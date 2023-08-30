function ConvertHandler() {

  this.getNum = function (input) {
    let numericalValue = [];
    if (/^(km|mi|gal|l|lbs|kg)$/.test(input)) { return 1 }
    const numericalPart = input.match(/(?!.*\/.*\/)(^\d+)([.]\d+)?(\/\d+([.]\d)?)?/);
    if (!numericalPart) { return 'invalid number' }

    numericalValue = numericalPart[0];
    if (numericalValue.includes('/')) {
      let nums = numericalValue.split('/')

      if (nums.length !== 2)
        return 'invalid number'

      numericalValue = parseFloat(nums[0]) / parseFloat(nums[1])

    }
    return parseFloat(numericalValue);
  };


  this.getUnit = function (input) {
    const unitPart = input.match(/[a-zA-Z]+$/);

    if (unitPart) {
      const unit = unitPart[0].toLowerCase();
      if (['gal', 'l', 'mi', 'km', 'lbs', 'kg'].includes(unit)) {
        if (unit === 'l') {
          return 'L';
        }
        return unit;
      }
    }

    return 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    const unitConversionMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return unitConversionMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return unitNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;

    const unitConversionFactors = {
      gal: galToL,
      l: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    };

    const result = initNum * unitConversionFactors[initUnit.toLowerCase()]; // Convert unit to lowercase before lookup
    return parseFloat(result.toFixed(5)); // Limit to 5 decimal places
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const resultString = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return resultString;
  };
}

module.exports = ConvertHandler;
