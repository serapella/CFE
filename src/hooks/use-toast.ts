export function useToast() {
  return {
    toast: ({ title, description, variant }: { title: string; description?: string; variant?: string }) => {
      // Simple fallback: show an alert
      alert(`${title}\n${description ?? ""}`);
    },
  };
} 