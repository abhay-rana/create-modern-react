import {
  useForm,
  type UseFormProps,
  type FieldValues,
  type Path,
  type FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ZodType } from 'zod';

interface UseZodFormProps<T extends FieldValues>
  extends Omit<UseFormProps<T>, 'resolver'> {
  schema: ZodType<T>;
}

/**
 * Custom hook that wraps React Hook Form with Zod validation
 *
 * @example
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * const form = useZodForm({ schema });
 *
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <input {...form.register('email')} />
 *   {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}
 * </form>
 */
export function useZodForm<T extends FieldValues>({
  schema,
  mode = 'onBlur',
  ...formProps
}: UseZodFormProps<T>) {
  return useForm<T>({
    resolver: zodResolver(schema),
    mode,
    ...formProps,
  });
}

/**
 * Helper to get error message for a field
 *
 * @example
 * const error = getFieldError(form.formState.errors, 'email');
 * if (error) {
 *   console.log(error); // "Invalid email address"
 * }
 */
export function getFieldError<T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>
): string | undefined {
  const error = errors[name];
  return error?.message as string | undefined;
}
