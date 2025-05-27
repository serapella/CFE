"use client";

import { motion } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QrCode, ShoppingCart } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="bg-card rounded-xl overflow-hidden border shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <div className="inline-block p-2 bg-primary/10 rounded-lg mb-4">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start making healthier choices today
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who are taking control of their health with BODYMATTERS.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Create free account
                  </Button>
                </Link>
                <Link href="/products/scan">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <QrCode className="mr-2 h-4 w-4" /> Try scanner
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Create your account</h3>
                    <p className="text-muted-foreground">Sign up for free and set your health preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Scan products or search recipes</h3>
                    <p className="text-muted-foreground">Use our barcode scanner or search for healthy recipes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Make informed choices</h3>
                    <p className="text-muted-foreground">See detailed health information and discover better alternatives</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}