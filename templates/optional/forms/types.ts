import {
  type UseFormReturn,
  type FieldValues,
  type UseFormProps,
} from 'react-hook-form';
import { type ZodType } from 'zod';

export interface UseZodFormProps<T extends FieldValues>
  extends Omit<UseFormProps<T>, 'resolver'> {
  schema: ZodType<T>;
}

export type UseZodFormReturn<T extends FieldValues> = UseFormReturn<T>;

/**
 * Common form field props for building reusable form components
 *
 * @example
 * interface TextFieldProps extends FormFieldProps {
 *   type?: 'text' | 'email' | 'password';
 * }
 *
 * function TextField({ label, error, required, ...props }: TextFieldProps) {
 *   return (
 *     <div>
 *       {label && <label>{label}{required && '*'}</label>}
 *       <input {...props} />
 *       {error && <span className="text-red-500">{error}</span>}
 *     </div>
 *   );
 * }
 */
export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
