"use client";

import { useTransition } from "react";

export function useFormAction<T extends (formData: FormData) => Promise<void>>(action: T) {
  const [isPending, startTransition] = useTransition();

  const execute = (formData: FormData) => {
    startTransition(() => {
      action(formData);
    });
  };

  return {
    pending: isPending,
    execute,
  };
} 