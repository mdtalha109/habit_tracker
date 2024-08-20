import React, { useState, createContext, useContext } from 'react';
import { Habit } from 'domain/entities/habit';
import { FirebaseHabitRepository } from 'infrastructure/repositories/habit/habitRepository';
import { CreateHabit } from 'domain/useCase/habit/CreateHabit';
import AuthContext from './authContext';
import { FilterHabitsByDateUseCase } from 'domain/useCase/habit/filterHabitByDate';
import { MarkHabitAsDone } from 'domain/useCase/habit/MarkHabitAsDone';
import { updateHabitSetting } from 'domain/useCase/habit/updateHabitSetting';


interface HabitContextType {
    habits: Habit[];
    getAllHabits: (userId: string) => Promise<void>;
    addHabit: (habit: Partial<Habit>) => Promise<void>;
    filterHabitsByDate(date: Date);
    markHabitAsDone(habitId: string, date: Date);
    updateHabitSet(habitId: string, habit: Partial<Habit>, freqChanged: boolean, effectiveDate?: string)
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const { currentUser }: any = useContext(AuthContext)

    const habitRepository = new FirebaseHabitRepository();
    const createHabit = new CreateHabit(habitRepository);
    const updateHabit = new updateHabitSetting(habitRepository)
    const applyFilterOnHabitByDate = new FilterHabitsByDateUseCase();

  

    const getAllHabits = async (userId: string) => {
        try {
            const fetchedHabitsData = await habitRepository.getAllHabits(userId);
            console.log(" DEBUG FETCH fetchedHabitsData: ", fetchedHabitsData)
            const fetchedHabits = fetchedHabitsData.map(
                (habitData) =>
                    new Habit(
                        habitData.id,
                        habitData.name,
                        habitData.tracking_type,
                        habitData.frequency,
                        habitData.streak,
                        habitData.longest_streak,
                        habitData.last_completed_at ? new Date(habitData.last_completed_at) : null,
                        habitData.selected_days,
                        habitData.created_at,
                        habitData.user_id,
                        habitData.completed_dates,
                        habitData.frequency_history
                        
                    )
            );

            console.log("DEBUG FETCH fetchedHabitsData afetr: ", fetchedHabitsData)
            setHabits(fetchedHabits);
        } catch (error) {
            console.error('Failed to fetch habits:', error);
        }
    };

    const addHabit = async(habits) => {
        await createHabit.execute(habits)
        getAllHabits(currentUser.id);
    }

    const filterHabitsByDate = (date: Date) => {
        return applyFilterOnHabitByDate.execute(habits, date);
    };

    const markHabitAsDone = async (habitId: string, date: Date) => {
     
        const markHabitAsDoneUseCase = new MarkHabitAsDone(habitRepository);
        await markHabitAsDoneUseCase.execute(habitId, date);
        getAllHabits(currentUser.id);
    };

    const updateHabitSet= async(habitId: string, habit: Habit, freqChanged:boolean, effectiveDate) =>{
    
        await updateHabit.execute(habitId, habit, effectiveDate, freqChanged);
        getAllHabits(currentUser.id);
    }


    return (
        <HabitContext.Provider value={{ habits, getAllHabits, addHabit, filterHabitsByDate, markHabitAsDone, updateHabitSet }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = () => {
    const context = useContext(HabitContext);
    if (context === undefined) {
      throw new Error('useHabits must be used within a HabitProvider');
    }
    return context;
  };
