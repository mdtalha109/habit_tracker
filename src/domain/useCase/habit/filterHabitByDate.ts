import { Habit } from "domain/entities/habit";

export class FilterHabitsByDateUseCase {
  execute(habits: Habit[], date: Date): Habit[] {
    return habits.filter(habit => habit.isAvailableOn(date));
  }
}