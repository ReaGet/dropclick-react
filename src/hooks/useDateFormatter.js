const useDateFormatter = (options) => {
  const _options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...options,
  };
  return (date) => {
    try {
      return new Intl.DateTimeFormat('ru-RU', _options).format(
        new Date(date),
      );
    } catch (e) {
      return "";
    }
  }
}

export default useDateFormatter;