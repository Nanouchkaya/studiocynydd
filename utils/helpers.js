import { isAfter, subDays, parseISO } from 'date-fns'

export const productIsNew = (productCreationDate) => {
  const oneMonthBeforeToday = subDays(new Date(), 30);
  return isAfter(parseISO(productCreationDate), oneMonthBeforeToday);
}

/**
 * Erase spaces before and after string chain and lowercase it (eg. " Pin's" return "pin's")
 * @param {string} string 
 */
export const stringCleaner = (string) => {
  const cleanedString = string.trim().toLowerCase();
  return cleanedString;
}

/**
 * Replace dash (-) with space (eg. for slug carte-a-planter return carte a planter)
 * @param {string} string 
 */
export const dashToSpace = (string) => {
  const newString = string.replace(/-/g, ' ');
  return newString;
}