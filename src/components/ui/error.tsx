"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorProps {
  error: Error & { status?: number };
  reset: () => void;
}

export function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2">
        {error.status === 404
          ? "The requested resource was not found."
          : error.status === 401
          ? "Please log in to access this resource."
          : error.status === 403
          ? "You don't have permission to access this resource."
          : "Something went wrong. Please try again."}
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="mr-2"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = "/"}
          >
            Go home
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
} 