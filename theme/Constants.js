export const localStorage = {
  key: "ft_user",
};

export const apiUrls = [
  {value: 'http://jumangis.org:2082', label: 'http://jumangis.org:2082'},
  {value: 'http://digitaltv.pro:2082', label: 'http://digitaltv.pro:2082'}
];

export const months = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Setiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

export function getFormattedDate(str) {
  const x = str.split("-");
  return `${x[2]}-${months[x[1]]}-${x[0]}`;
}