function unique<T extends object>(array: T[], key: keyof T) {
  return array.reduce<T[]>((uniq, item) => {
    return uniq.some((element) => element[key] === item[key])
      ? uniq
      : [...uniq, item];
  }, []);
}

export default unique;
