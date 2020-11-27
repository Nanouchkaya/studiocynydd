import { isAfter, subDays, parseISO } from 'date-fns'

export const productIsNew = (productCreationDate) => {
  const oneMonthBeforeToday = subDays(new Date(), 30);
  return isAfter(parseISO(productCreationDate), oneMonthBeforeToday);
}