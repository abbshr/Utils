/*
* JavaScript Utils library
* author: Ran
* description: RegExp check/filter utils
*/
(function (global) {
  var utils = {};

  utils.__reg_pattern = {
    num_pattern     : /^\S{4,20}$/,
    pwd_pattern     : /^\S{5,30}$/,
    email_pattern   : /^(\w+\.)*\w+@(\w+\.)+(\w+)$/,
    mobile_pattern  : /^(\+\d{2})?[0-9]{11}$/,
    fax_pattern     : /^([0-9]{4}-){3}[0-9]{4}$/,
    count_pattern   : /^[0-9]+$/,
    id_pattern      : /^[0-9a-zA-Z]{18,19}$/,
    height_pattern  : /^[1|2][0-9]{2}$/
  };

  utils.dateUtils = {
    isLeapYear: function (year) {
      if (year % 4 == 0) return true;
      return false;
    },
    isValidYear: function (year) {
      if (year < 1800 || year > 3000) return false;
      return true;
    },
    isValidMonth: function (month) {
      if (month < 1 || month > 12) return false;
      return true;
    },
    isValidDay: function (year, month, day) {
      if (!this.isValidYear(year) || !this.isValidMonth(month)) 
        return false;
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          if (day < 1 || day > 31) return false;
          break;
        case 2:
          if (this.isLeapYear(year) && (day < 1 || day > 29)) return false;
          if (!this.isLeapYear(year) && (day < 1 || day > 28)) return false;
          break;
        default:
          if (day < 1 || day > 30) return false;
      }
      return true;
    }
  };

  /* @opt: date format:{year, month, day} */
  utils.checkDate_valid = function (date) {
    var year  = date.year,
        month = date.month,
        day   = date.day;
    var valid = false;

    this.dateUtils.isValidDay(year, month, day) && (valid = true);
    return valid;
  };

  /* @opt: num, pwd */
  utils.checkLogin_valid = function (opt) {
    var num = opt.num, pwd = opt.pwd;
    var valid = false;
    
    this.__reg_pattern["num_pattern"].exec(num) &&
    this.__reg_pattern["pwd_pattern"].exec(pwd) && (valid = true);
    return valid;
  };

  /* @opt: mobile, fax, foundate format:{year, month, day} */
  utils.checkDepartment_valid = function (opt) {
    var mobile = opt.mobile, fax = opt.fax, foundate = opt.foundate;
    var valid = false;

    for (var i in foundate) 
      if (foundate.hasOwnProperty(i))
        foundate[i] = Number(foundate[i]);

    this.checkDate_valid(foundate) &&
    this.__reg_pattern["fax_pattern"].exec(fax) &&
    this.__reg_pattern["mobile_pattern"].exec(mobile) && (valid = true);
    return valid;
  };

  /* @opt:  birth_date, id_card, job_date, join_date, mobile, height, grad_date*/
  utils.checkStaff_valid = function (opt) {
    var birth_date = opt.birth_date,
        id_card    = opt.id_card,
        job_date   = opt.job_date,
        join_date  = opt.join_date,
        mobile     = opt.mobile,
        height     = opt.height,
        grad_date  = opt.grad_date;
    var valid = false;

    this.checkDate_valid(birth_date) && 
    this.checkDate_valid(join_date) && 
    this.checkDate_valid(job_date) && 
    this.__reg_pattern["id_pattern"].exec(id_card) &&
    (!grad_date || this.checkDate_valid(grad_date)) &&
    (!mobile || this.__reg_pattern["mobile_pattern"].exec(mobile)) &&
    (!height || this.__reg_pattern["height_pattern"].exec(height)) && (valid = true);
    return valid;
  };

  // exports the utils object
  global.utils = utils;
})(this);