
import { Habit } from 'domain/entities/habit';
import { habitValidation } from 'domain/validation/habit/habitValidation';
import { useFormik } from 'formik';
import AuthContext from 'presentation/context/authContext';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';


interface UseHabitFormProps {
  habit?: Partial<Habit>;
  handleSubmit: (habit: Partial<Habit>, freqChanged: boolean, effectiveDate?:string) => void;
}

const useHabitForm = ({ habit, handleSubmit }: UseHabitFormProps) => {

  const [initialFrequency] = useState<number>(habit?.frequency || 1);
  const [effectiveDate, setEffectiveDate] = useState<string | undefined>(undefined);
  const [showEffectiveDateInput, setShowEffectiveDateInput] = useState<boolean>(false);


  const { currentUser }: any = useContext(AuthContext);
  const {t:translate} = useTranslation();

  
  const formik = useFormik({
    initialValues: {
      name: habit?.name || '',
      tracking_type: habit?.tracking_type || 'Daily',
      frequency: habit?.frequency || 1,
      selected_days: habit?.selected_days || [],
    },
    validationSchema: habitValidation,
    onSubmit: (values) => {
      const freqChanged = values.frequency !== initialFrequency;  
     
      const habitWithDefaults = habit || {};  
      const updatedHabit = Object.assign(
        Object.create(Object.getPrototypeOf(habitWithDefaults)),
        habitWithDefaults,
        values,
        { user_id: currentUser.id }
      );

      handleSubmit(updatedHabit, freqChanged, effectiveDate);
    },
  });

  const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleDaySelection = (dayIndex: number) => {
    const currentIndex = formik.values.selected_days.indexOf(dayIndex);
    const newselected_days = [...formik.values.selected_days];
  
    if (currentIndex === -1) {
      newselected_days.push(dayIndex);
    } else {
      newselected_days.splice(currentIndex, 1);
    }
  
    formik.setFieldValue('selected_days', newselected_days);
  };

  const setTrackingType = (frequency: 'Daily' | 'Weekly') => {
    formik.setFieldValue('tracking_type', frequency);
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('frequency', event.target.value);
    habit && setShowEffectiveDateInput(true); 
  };

  return {
    formik,
    toggleDaySelection,
    daysOfWeek,
    setTrackingType,
    translate,
    effectiveDate,
    setEffectiveDate,
    showEffectiveDateInput,
    handleFrequencyChange
  };
};

export default useHabitForm;
