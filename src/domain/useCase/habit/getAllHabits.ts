import { HabitRepository } from "domain/interface/habitRepository";

export class getAllHabits {
  constructor(private habitRepository: HabitRepository) {}

  async execute(user_id: string): Promise<void> {
    await this.habitRepository.getAllHabits(user_id);
  }
}
