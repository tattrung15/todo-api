exports.escapeRegExp = (text) => {
  if (text) {
    return text.toString().replace(/[^a-zA-Z0-9]/g, '\\$&');
  }
  return text;
};
