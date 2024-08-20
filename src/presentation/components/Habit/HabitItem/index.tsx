import { Habit } from "domain/entities/habit";
import useHabitItem from "./hooks/useHabitItem";

interface HabitItemProps {
  habit: Habit;
  markHabitAsDone: (habitId: string, date: string) => any;
  selectedHabitDate: any;
  onEdit: (habit: Habit) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  markHabitAsDone,
  selectedHabitDate,
  onEdit,
}) => {

  const {
    timesLeft,
    habitDone,
    translate
  } = useHabitItem(habit, markHabitAsDone, selectedHabitDate)

  return (
    <div className="flex p-2 shadow-md border mt-4 bg-white justify-between">
      <div className="flex-1 ml-4" onClick={() => onEdit(habit)}>
        <div className="flex gap-2">
          <h1 className="text-lg font-bold">{habit.name}</h1>
          <div className="p-1 text-sm text-primary_muted">
            {habit.tracking_type}
          </div>
        </div>
        <div className="mt-4">
          <p className="">🔥 {translate('habit.streak')}: {habit.streak}️‍</p>
          <p className="text-xs text-primary_muted">{translate('habit.longest_streak')}: {habit.longest_streak}️‍</p>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            onClick={habitDone}
            checked={habit.isCompleted(selectedHabitDate)}
          />
          <div
            className={`w-6 h-6 border-2 rounded-full flex justify-center items-center transition ${
              habit.isCompleted(selectedHabitDate)
                ? "bg-green-500 border-green-500"
                : "border-gray-300"
            }`}
          >
            {habit.isCompleted(selectedHabitDate) && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </div>
          <div className="ml-2 text-sm text-primary_muted">
            {timesLeft === 0 ? translate('habit.completed') : translate('habit.remaining', { count: timesLeft, frequency: habit.getFrequencyOn(selectedHabitDate) })}
          </div>

          {/* {habit.isCompleted(selectedHabitDate) ? 'yes': 'no'} */}
        </label>
      </div>
    </div>
  );
};

export default HabitItem;
