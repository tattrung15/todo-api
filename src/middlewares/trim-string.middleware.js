const handle = (req, res, next) => {
  const requestBody = handleRequestBody(req.body);
  if (Object.keys(requestBody).length) {
    req.body = Object.assign(...requestBody);
  }
  const requestQueryString = handleRequestBody(req.query);
  if (Object.keys(requestQueryString).length) {
    req.query = Object.assign(...requestQueryString);
  }
  next();
};

const handleRequestBody = (req) => {
  const requestBody = Object.keys(req);
  let newReqBody = {};
  if (requestBody.length) {
    newReqBody = requestBody.map((key) => {
      const value = req[key];
      if (value === null) {
        return {
          [key]: value
        };
      }
      if (typeof value === 'string') {
        return {
          [key]: value.trim()
        };
      }
      if (Array.isArray(value)) {
        const trimArrayData = (arr) => {
          const parseArr = arr.map((item) => {
            if (typeof item === 'string') {
              return item.trim();
            }
            if (Array.isArray(item)) {
              return trimArrayData(item);
            }
            if (typeof item === 'object') {
              const newItem = handleRequestBody(item);
              return Object.assign(...newItem);
            }
            return item;
          });
          return parseArr;
        };
        return {
          [key]: trimArrayData(value)
        };
      }
      if (typeof value === 'object') {
        return {
          [key]: Object.assign(...handleRequestBody(value))
        };
      }
      return {
        [key]: value
      };
    });
  }
  return newReqBody;
};

module.exports = { handle };
