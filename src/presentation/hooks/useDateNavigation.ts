
import { useState } from "react";

export function getInitialDates(): Date[] {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  }
  
  

  
  export function updateDates(dates, direction) {
    return dates.map((date) => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + direction);
      return newDate;
    });
  }


export const useDateNavigation = () => {
  const [dates, setDates] = useState(getInitialDates());
  const [currentDateIndex, setCurrentDateIndex] = useState(3);

  const navigateDates = (direction) => {
    const newDates = updateDates(dates, direction);
    setDates(newDates);
  };

  const selectDate = (index) => {
    setCurrentDateIndex(index);
  };

  return {
    dates,
    currentDateIndex,
    navigateDates,
    selectDate,
  };
};
