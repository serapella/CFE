"use client";

import { motion } from "../../components/ui/motion";
import {
  QrCode,
  Search,
  AlertTriangle,
  Leaf,
  Info,
  History,
  BadgeCheck,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: <QrCode className="h-10 w-10 text-[hsl(var(--peacock))]" />,
    title: "Barcode Scanner",
    description:
      "Scan product barcodes to instantly access detailed ingredient information and safety ratings.",
    color: "bg-[hsl(var(--seafoam))]",
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-[hsl(var(--sunshine))]" />,
    title: "Safety Alerts",
    description:
      "Get instant alerts about potentially harmful ingredients and allergens in products.",
    color: "bg-[hsl(var(--sunshine))]/10",
  },
  {
    icon: <Leaf className="h-10 w-10 text-[hsl(var(--peacock))]" />,
    title: "Natural Alternatives",
    description:
      "Discover safer, natural alternatives to products with concerning ingredients.",
    color: "bg-[hsl(var(--peony))]",
  },
  {
    icon: <Info className="h-10 w-10 text-[hsl(var(--azure))]" />,
    title: "Ingredient Education",
    description:
      "Learn about ingredients, their effects, and why they&apos;re used in products.",
    color: "bg-[hsl(var(--azure))]/10",
  },
  {
    icon: <Search className="h-10 w-10 text-[hsl(var(--coral))]" />,
    title: "Product Search",
    description:
      "Find and compare personal care products based on your safety preferences.",
    color: "bg-[hsl(var(--coral))]/10",
  },
  {
    icon: <History className="h-10 w-10 text-[hsl(var(--papaya))]" />,
    title: "Scan History",
    description:
      "Keep track of all your scanned products and their safety assessments.",
    color: "bg-[hsl(var(--papaya))]/10",
  },
  {
    icon: <BadgeCheck className="h-10 w-10 text-[hsl(var(--azure))]" />,
    title: "Certifications",
    description:
      "Understand product certifications and what they mean for your safety.",
    color: "bg-[hsl(var(--azure))]/10",
  },
  {
    icon: <Share2 className="h-10 w-10 text-[hsl(var(--sunshine))]" />,
    title: "Share Findings",
    description: "Share product safety information with friends and family.",
    color: "bg-[hsl(var(--sunshine))]/10",
  },
];

export function Features() {
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
            Everything you need to make informed choices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Our comprehensive tools help you understand what&apos;s in your products
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
