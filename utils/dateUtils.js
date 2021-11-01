/*
    This utility takes a date string and evaluates whether if it matches the ISO8601
    (YYYY-MM-DD) pattern. In addition it also evaluates of the date string is an actual
    date. The returned value is false if the date string does not match the given pattern
    or if it is an actual date.
 */
module.exports =
    {
        isValidDate:
            function isValidDate(dateString) {
                let regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
                if (!dateString.match(regEx))
                    return false;  // Invalid format
                let d = new Date(dateString);
                let dNum = d.getTime();
                if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
                return d.toISOString().slice(0, 10) === dateString;
            }
    };