"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "@/components/ui/motion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useFormAction } from "@/hooks/use-form-action";

export default function RegisterPage() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const { pending, execute } = useFormAction(async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Invalid input",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be a call to the auth API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful registration
    toast({
      title: "Welcome!",
      description: "Your account has been created successfully.",
    });
    
    // Navigate to dashboard or home page (would use router in a real app)
    window.location.href = "/";
  });
  
  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <Link href="/" className="inline-block" legacyBehavior>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                </div>
                <span className="font-bold text-2xl">BODYMATTERS</span>
              </div>
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Sign up to get started with BODYMATTERS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={execute} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    type="text" 
                    placeholder="John Doe" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="you@example.com" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    name="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked: boolean | 'indeterminate') => setAgreeToTerms(!!checked)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create account
                    </>
                  )}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  type="button"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.64 9.2C17.64 8.57 17.58 7.95 17.47 7.36H9V10.46H13.84C13.63 11.36 13.01 12.14 12.1 12.66V14.66H15C16.66 13.48 17.64 11.55 17.64 9.2Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M9 18C11.43 18 13.47 17.21 15 15.66L12.1 13.66C11.3 14.22 10.26 14.56 9 14.56C6.65 14.56 4.67 12.96 3.96 10.76H0.96V12.86C2.48 15.98 5.48 18 9 18Z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.96 10.76C3.78 10.21 3.68 9.62 3.68 9.01C3.68 8.39 3.78 7.81 3.96 7.26V5.16H0.96C0.35 6.31 0 7.64 0 9.01C0 10.38 0.35 11.7 0.96 12.86L3.96 10.76Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9 3.45C10.32 3.45 11.5 3.91 12.44 4.8L15 2.24C13.46 0.85 11.43 0 9 0C5.48 0 2.48 2.02 0.96 5.14L3.96 7.24C4.67 5.04 6.65 3.45 9 3.45Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  type="button"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 0H4.5C2.01472 0 0 2.01472 0 4.5V13.5C0 15.9853 2.01472 18 4.5 18H13.5C15.9853 18 18 15.9853 18 13.5V4.5C18 2.01472 15.9853 0 13.5 0Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M12.4297 11.6016L12.8106 9H10.3125V7.3125C10.3125 6.5875 10.6734 5.88281 11.8172 5.88281H12.9141V3.64688C12.9141 3.64688 11.8617 3.46875 10.8562 3.46875C8.76094 3.46875 7.38281 4.7625 7.38281 7.02188V9H5.08594V11.6016H7.38281V17.8547C7.87969 17.9508 8.39531 18 8.92969 18C9.46406 18 9.97969 17.9508 10.4766 17.8547V11.6016H12.4297Z"
                      fill="white"
                    />
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}