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
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <QrCode className="h-6 w-6" />,
    title: "Scan Products",
    description: "Quickly check product safety with our barcode scanner"
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Search Database",
    description: "Find detailed information about ingredients and products"
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Save Favorites",
    description: "Keep track of your favorite safe products"
  }
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose BODYMATTERS?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
