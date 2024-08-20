import * as Yup from 'yup';

export const habitValidation = Yup.object({
  name: Yup.string().required('Habit name is required'),
  tracking_type: Yup.string().oneOf(['Daily', 'Weekly'], 'Invalid tracking type').required('Tracking type is required'),
  selected_days: Yup.array()
    .of(Yup.number().min(0).max(6))
    .min(1, 'Please select at least one day')
    .required('Please select at least one day'),
  frequency: Yup.number().min(1, 'Frequency must be at least 1').required('Number of times is required'),
});
