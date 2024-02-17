


export const getFormattedDatetime = (dateTimeStr: string) => {

  // Crear un objeto Date a partir de la fecha y hora
  const dateTime = new Date(dateTimeStr);
  if (isNaN(dateTime.getTime())) {
    return '';
  }

  // Obtener el día, mes y año
  const day = dateTime.getDate();
  const month = dateTime.toLocaleString('default', { month: 'short' });
  const year = dateTime.getFullYear();

  // Obtener la hora y los minutos
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // Crear el formato deseado
  return `${day} ${month} ${year} | ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  
};