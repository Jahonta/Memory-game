const addPad = (num: number) => num >= 10 ? num : `0${num}`;

const createDate = (notDate: string) => {
  return new Date(notDate);
}

export const formatDate = (date: string | Date) => {
  const liveDate = typeof date === 'string' ? createDate(date) : date;
  const day = addPad(liveDate.getDate());
  const month = addPad(liveDate.getMonth() + 1);
  const year = liveDate.getFullYear();
  const hour = addPad(liveDate.getHours());
  const minutes = addPad(liveDate.getMinutes());
  const formatedDate = `${day}.${month}.${year} at ${hour}:${minutes}`;

  return formatedDate;
}
