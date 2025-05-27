"use client";

import { motion } from '@/components/ui/motion';
import { 
  BarChart2, 
  QrCode, 
  ShoppingCart, 
  Heart, 
  Search, 
  Goal,
  Activity,
  Star
} from 'lucide-react';

const features = [
  {
    icon: <QrCode className="h-10 w-10 text-chart-1" />,
    title: "Barcode Scanner",
    description: "Scan product barcodes to instantly access detailed ingredient information and health scores.",
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-chart-2" />,
    title: "Health Scoring",
    description: "See clear A-B-C health ratings based on scientific analysis of product ingredients.",
  },
  {
    icon: <Search className="h-10 w-10 text-chart-3" />,
    title: "Advanced Search",
    description: "Find products and recipes that match your dietary needs and health preferences.",
  },
  {
    icon: <Heart className="h-10 w-10 text-chart-4" />,
    title: "Personalized Recipes",
    description: "Discover recipes tailored to your preferences and dietary requirements.",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-chart-5" />,
    title: "Shopping Lists",
    description: "Generate shopping lists directly from your favorite recipes.",
  },
  {
    icon: <Activity className="h-10 w-10 text-chart-1" />,
    title: "Ingredient Analysis",
    description: "Understand the effects of ingredients on your health with detailed information.",
  },
  {
    icon: <Goal className="h-10 w-10 text-chart-2" />,
    title: "Health Goals",
    description: "Set and track personal health goals with product recommendations.",
  },
  {
    icon: <Star className="h-10 w-10 text-chart-3" />,
    title: "Community Reviews",
    description: "Read and share experiences with products and recipes from the community.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Make informed choices for your health
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            BODYMATTERS combines cutting-edge technology with scientific research to help you make better choices for your personal care.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-secondary p-4 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}