import { useState, ChangeEvent } from 'react';

export function useForm<T extends Record<string, string>>(
  initial: T
): [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  React.Dispatch<React.SetStateAction<T>>
] {
  const [form, setForm] = useState<T>(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return [form, handleChange, setForm];
}
