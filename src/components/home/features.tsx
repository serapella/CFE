"use client";

import { motion } from "@/components/ui/motion";
import {
  BarChart2,
  QrCode,
  ShoppingCart,
  Heart,
  Search,
  Goal,
  Activity,
  Star,
} from "lucide-react";

const features = [
  {
    icon: <QrCode className="h-10 w-10 text-[hsl(var(--peacock))]" />,
    title: "Barcode Scanner",
    description:
      "Scan product barcodes to instantly access detailed ingredient information and health scores.",
    color: "bg-[hsl(var(--seafoam))]",
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-[hsl(var(--azure))]" />,
    title: "Health Scoring",
    description:
      "See clear A-B-C health ratings based on scientific analysis of product ingredients.",
    color: "bg-[hsl(var(--peony))]",
  },
  {
    icon: <Search className="h-10 w-10 text-[hsl(var(--sunshine))]" />,
    title: "Advanced Search",
    description:
      "Find products and recipes that match your dietary needs and health preferences.",
    color: "bg-[hsl(var(--sunshine))]/10",
  },
  {
    icon: <Heart className="h-10 w-10 text-[hsl(var(--coral))]" />,
    title: "Personalized Recipes",
    description:
      "Discover recipes tailored to your preferences and dietary requirements.",
    color: "bg-[hsl(var(--coral))]/10",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-[hsl(var(--petrol))]" />,
    title: "Shopping Lists",
    description: "Generate shopping lists directly from your favorite recipes.",
    color: "bg-[hsl(var(--petrol))]/10",
  },
  {
    icon: <Activity className="h-10 w-10 text-[hsl(var(--papaya))]" />,
    title: "Ingredient Analysis",
    description:
      "Understand the effects of ingredients on your health with detailed information.",
    color: "bg-[hsl(var(--papaya))]/10",
  },
  {
    icon: <Goal className="h-10 w-10 text-[hsl(var(--azure))]" />,
    title: "Health Goals",
    description:
      "Set and track personal health goals with product recommendations.",
    color: "bg-[hsl(var(--azure))]/10",
  },
  {
    icon: <Star className="h-10 w-10 text-[hsl(var(--sunshine))]" />,
    title: "Community Reviews",
    description:
      "Read and share experiences with products and recipes from the community.",
    color: "bg-[hsl(var(--sunshine))]/10",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-[hsl(var(--seafoam))]/20">
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
            BODYMATTERS combines cutting-edge technology with scientific
            research to help you make better choices for your personal care.
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
              className="bg-card p-6 rounded-lg shadow-sm border hover:border-[hsl(var(--peacock))] transition-colors"
            >
              <div
                className={`rounded-full ${feature.color} p-4 mb-4 w-16 h-16 flex items-center justify-center`}
              >
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
