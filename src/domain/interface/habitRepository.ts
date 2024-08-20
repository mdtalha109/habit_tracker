import { Habit } from "domain/entities/habit";

export interface HabitRepository {
  save(habit: Habit): Promise<void>;
  updateHabit(habit: Habit): Promise<void>;
  getAllHabits(user_id: string): Promise<Habit[]>
  getHabitById(habitId: string): Promise<Habit>
}