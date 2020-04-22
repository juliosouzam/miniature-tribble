const formatDate = (value: number | Date): string => {
  return Intl.DateTimeFormat('pt-BR').format(new Date(value));
};

export default formatDate;
