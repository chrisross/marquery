const notEmpty = value =>
  !value || !value.length ? "This field is required" : undefined;

export { notEmpty };
