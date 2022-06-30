const toString = Object.prototype.toString;

export const isString = (data: any) => {
  return toString.call(data) === "[object String]";
};

export const isArray = (data: any): data is Array<any> => {
  return toString.call(data) === "[object Array]";
};
