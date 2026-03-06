import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '../../utils/validation';
import { useCVStore } from '../../store/cvStore';
import { FormField } from './FormField';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';

export const PersonalInfoForm = () => {
  const { data, updateData } = useCVStore();
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    values: data.personalInfo,
  });

  return (
    <form
      className="grid gap-3"
      onChange={form.handleSubmit((v) => updateData('personalInfo', v))}
    >
      {(['fullName', 'title', 'email', 'phone', 'location', 'website'] as const).map((field) => (
        <FormField key={field} label={field} error={form.formState.errors[field]?.message}>
          <Input {...form.register(field)} />
        </FormField>
      ))}
      <FormField label="URL zdjęcia" error={form.formState.errors.profileImage?.message}>
        <Input {...form.register('profileImage')} />
      </FormField>
      <Button type="button" onClick={form.handleSubmit((v) => updateData('personalInfo', v))}>Zapisz dane osobowe</Button>
    </form>
  );
};
