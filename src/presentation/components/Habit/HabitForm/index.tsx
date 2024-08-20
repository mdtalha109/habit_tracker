
import { Habit } from 'domain/entities/habit';
import Button from '../../ui/Button';
import Chip from '../../ui/Chip';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import useHabitForm from './hooks/useHabitForm';

interface HabitFormProps {
    habit?: Partial<Habit>;
    selectedHabitDate: Date,
    handleSubmit: (habit: Partial<Habit>, freqChanged: boolean, effectiveDate?:string) => void;
}
const HabitForm = ({ habit, selectedHabitDate, handleSubmit }: HabitFormProps) => {
    

    const {
        formik,
        toggleDaySelection,
        daysOfWeek,
        setTrackingType,
        translate,
        effectiveDate,
        setEffectiveDate,
        showEffectiveDateInput,
        handleFrequencyChange
    } = useHabitForm({ habit, selectedHabitDate, handleSubmit });

    const frequencies: Array<'Daily' | 'Weekly'> = ['Daily', 'Weekly'];

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
            <div>
                <Input
                    id='name'
                    label={translate('habit.habit_name')}
                    type="text"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className='text-error'>{formik.errors.name}</div>
                ) : null}
            </div>

            <div>
                <Label>{translate('habit.frequency_of_habit')}</Label>
                <div className='flex gap-2'>
                    {frequencies.map((freq) => (
                        <Chip
                            key={freq}
                            className={`cursor-pointer`}
                            onClick={() => { setTrackingType(freq) }}
                            selected={formik.values.tracking_type == freq}
                        >
                            {freq}
                        </Chip>
                    ))}

                    {formik.touched.tracking_type && formik.errors.tracking_type ? (
                        <div className='text-error'>{formik.errors.tracking_type}</div>
                    ) : null}
                </div>
            </div>

            <div className='flex gap-4 items-center'>
                <div className='w-[50%]'>


                    <Input
                        id='frequency'
                        type="number"
                        min={1}
                        {...formik.getFieldProps('frequency')}
                        onChange={handleFrequencyChange} 
                    />
                    {formik.touched.frequency && formik.errors.frequency ? (
                        <div className='text-error'>{formik.errors.frequency}</div>
                    ) : null}
                </div>
                <div>times/{formik.values.tracking_type}</div>
            </div>

            {showEffectiveDateInput && (
                <div>
                    <Label>{translate('Effective date')}</Label>
                    <Input
                        id='effective_date'
                        type="date"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                    />
                </div>
            )}

            {/* <div>{`you have to complete habit ${formik.values.frequency} in a ${formik.values.tracking_type} to continue streak`}</div> */}

            <div>
                <Label>{translate('habit.select_days')}</Label>
                <div className='flex gap-2 flex-wrap'>
                    {daysOfWeek.map((day, index) => (
                        <Chip
                            key={day}
                            className={`cursor-pointer ${formik.values.selected_days.includes(index) ? 'bg-secondary text-white' : ''}`}
                            onClick={() => toggleDaySelection(index)}
                        >
                            {day}
                        </Chip>
                    ))}
                </div>
                {formik.touched.selected_days && formik.errors.selected_days ? (
                    <div className='text-error'>{formik.errors.selected_days}</div>
                ) : null}
            </div>

            <Button variant='primary-raised' type='submit'>
                {habit ? translate('habit.update_habit') : translate('habit.create_habit')}
            </Button>
        </form>
    );
};

export default HabitForm;
