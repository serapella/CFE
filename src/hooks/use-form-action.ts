import { useState } from "react";

export function useFormAction<T = void>(action: (formData: FormData) => Promise<T>) {
  const [pending, setPending] = useState(false);
  const execute = async (formData: FormData) => {
    setPending(true);
    try {
      await action(formData);
    } finally {
      setPending(false);
    }
  };
  return { pending, execute };
} 