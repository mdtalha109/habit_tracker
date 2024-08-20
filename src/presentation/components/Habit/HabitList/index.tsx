import { Habit } from "domain/entities/habit";
import HabitItem from "../HabitItem";


  
  interface HabitListProps {
    habits: Habit[];
    markHabitAsDone: any,
    selectedHabitDate: any,
    onEditHabit: (habit: Habit) => void;
  }

  const HabitList: React.FC<HabitListProps> = ({ habits, markHabitAsDone, selectedHabitDate, onEditHabit }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {habits.map((habit, index) => (
      <HabitItem 
        key={index} 
        habit={habit} 
        markHabitAsDone={markHabitAsDone} 
        selectedHabitDate={selectedHabitDate} 
        onEdit={onEditHabit}
      />
    ))}
  </div>
);

export default HabitList;