const errorMessage = (exist, message) => {
  if (!exist) {
    const errorMessage = message;
    return { errorMessage };
  }
};

export { errorMessage };
