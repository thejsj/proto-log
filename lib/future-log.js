var FutureLog = function FutureLog (value, logStr) {
  __self = {};
  __self.value = value;
  __self.str = logStr;
};

FutureLog.prototype = Object.create(Object.prototype);
FutureLog.prototype.constructor = FutureLog;

/*!
 * Update the log's string
 * @param <String>
 */
FutureLog.prototype.setString = function (str) {
  __self.str = str;
};

/*!
 * Get the log's string value
 * @return <String>
 */
FutureLog.prototype.getString= function () {
  if (__self.str.valueOf !== undefined) {
    return __self.str.valueOf();
  }
  return __self.str;
};

/*!
 * Get the log's original value
 * @return <Any>
 */
FutureLog.prototype.getValue = function () {
  if (__self.value === null) return null;
  if (__self.value === undefined) return undefined;
  if (__self.value.valueOf === undefined) return __self.value;
  return __self.value.valueOf();
};

/*!
 * Styling
 *
 * We want to apply styling properties (color, underline, bold, background) at
 * log time. Hence, we save the styling properties in the object.
 */

/*!
 * Set log text color
 * @param <String>
 */
FutureLog.prototype.setColor = function (colorName) {
  if (typeof colorName !== 'string') throw new TypeError('Color (' + colorName + ') must be a string');
  __self.color = colorName;
};

/*!
 * Set wether the log should be underlined
 * @param <Boolean>
 */
FutureLog.prototype.setUnderline = function (bool) {
  if (typeof bool !== 'boolean') throw new TypeError('var (' + bool + ') must be a boolean');
  __self.underline = bool;
};

/*!
 * Set wether the log should be bold
 * @param <Boolean>
 */
FutureLog.prototype.setBold= function (bool) {
  if (typeof bool !== 'boolean') throw new TypeError('var (' + bool + ') must be a boolean');
  __self.bold = bool;
};

/*!
 * Set log background color
 * @param <String>
 */
FutureLog.prototype.setBackground= function (colorName) {
  if (typeof colorName !== 'string') throw new TypeError('Background color (' + colorName + ') must be a string');
  __self.backgroundColor = colorName;
};

/*!
 * Apply styling strings to string
 */
FutureLog.prototype.applyStyling = function () {
  if (__self.color || __self.backgroundColor || __self.underline || __self.bold) {
    __self.str = __self.getColor('background', color) + __self.str + colorCodes.reset;
  }
};

module.exports = FutureLog;