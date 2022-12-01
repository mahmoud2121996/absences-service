export function getNumberOfDays(startDate, endDate) {
    if (!startDate || !endDate) {
      return 0;
    }
  
    return endDate.diff(startDate, "days") + 1;
  }