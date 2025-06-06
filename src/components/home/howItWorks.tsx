"use client";

import { motion } from '@/components/ui/motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Search, BookOpen, Heart } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  const steps = [
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "Scan Products",
      description: "Use our barcode scanner to check product safety"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Review Details",
      description: "Get detailed information about ingredients and safety ratings"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Save Favorites",
      description: "Keep track of your favorite safe products"
    }
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How BODYMATTERS works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Our platform makes it easy to understand products and find healthy recipes in just a few steps.
          </motion.p>
        </div>
        
        <Tabs defaultValue="scan" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scan" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span>Scan Products</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Find Recipes</span>
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Learn & Compare</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">Scan product barcodes</h3>
                <p className="text-muted-foreground mb-4">
                  Use your phone camera to scan product barcodes and instantly access detailed information about ingredients, health scores, and potential concerns.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-1 flex items-center justify-center text-white font-semibold text-sm">1</span>
                    <span>Open the scanner in the app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-1 flex items-center justify-center text-white font-semibold text-sm">2</span>
                    <span>Point your camera at the product barcode</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-1 flex items-center justify-center text-white font-semibold text-sm">3</span>
                    <span>Get instant health analysis and ingredient breakdown</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden aspect-square md:aspect-video shadow-xl"
              >
                <Image 
                  src="/BarcodeBM.png" 
                  alt="Person scanning product barcode with smartphone"
                  className="object-cover"
                  fill
                />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="search">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">Discover personalized recipes</h3>
                <p className="text-muted-foreground mb-4">
                  Find recipes that match your dietary preferences, health goals, and available ingredients. Our smart algorithm suggests meals tailored just for you.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-2 flex items-center justify-center text-white font-semibold text-sm">1</span>
                    <span>Enter your dietary preferences and restrictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-2 flex items-center justify-center text-white font-semibold text-sm">2</span>
                    <span>Search by ingredients or meal type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-2 flex items-center justify-center text-white font-semibold text-sm">3</span>
                    <span>Save favorite recipes and generate shopping lists</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden aspect-square md:aspect-video shadow-xl"
              >
                <Image 
                  src="/BarcodeBM.png" 
                  alt="Person looking at recipes on a tablet"
                  className="object-cover"
                  fill
                />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="learn">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">Compare and learn about products</h3>
                <p className="text-muted-foreground mb-4">
                  Compare products side by side, learn about ingredients, and find healthier alternatives based on scientific data and community insights.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-3 flex items-center justify-center text-white font-semibold text-sm">1</span>
                    <span>View detailed ingredient information and health effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-3 flex items-center justify-center text-white font-semibold text-sm">2</span>
                    <span>Compare multiple products side by side</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-6 w-6 rounded-full bg-chart-3 flex items-center justify-center text-white font-semibold text-sm">3</span>
                    <span>Discover healthier alternatives with better scores</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-lg overflow-hidden aspect-square md:aspect-video shadow-xl"
              >
                <Image 
                  src="/BarcodeBM.png" 
                  alt="Person comparing product information"
                  className="object-cover"
                  fill
                />
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-muted-foreground">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}