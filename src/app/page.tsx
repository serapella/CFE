"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  ArrowRight,
  Heart,
  ShoppingBag,
  Leaf,
} from "lucide-react";
import { motion } from "@/components/ui/motion";
import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#f8f6f3] py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                ✨ Nieuw: DIY Beauty Pakketten
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Natuurlijk mooi met pure ingrediënten
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Ontdek onze collectie natuurlijke verzorgingsproducten en DIY
                recepten voor een gezonde, stralende huid.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Input
                    placeholder="Zoek producten of recepten..."
                    className="h-12 pl-12 pr-4 w-full"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <Button size="lg" className="h-12">
                  <Search className="mr-2 h-4 w-4" /> Zoeken
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>4.9/5 uit 8000+ reviews</span>
                </div>
                <div className="h-1 w-1 bg-muted-foreground rounded-full"></div>
                <span>Voor 23:30 besteld = morgen in huis</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square"
            >
              <Image
                src="/window.svg"
                alt="Natural cosmetics"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Ontdek onze categorieën
              </h2>
              <p className="text-muted-foreground">
                Vind de perfecte producten voor jouw beauty routine
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex items-center">
              Alle categorieën <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Gezichtsverzorging", count: "24 producten" },
              { name: "DIY Recepten", count: "15 recepten" },
              { name: "Haarverzorging", count: "18 producten" },
              { name: "Body Care", count: "21 producten" },
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/category/${i}`}>
                  <div className="group relative bg-card hover:bg-accent transition-colors p-6 rounded-xl border">
                    <div className="mb-8">
                      <Image
                        src="/window.svg"
                        alt={category.name}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count}
                    </p>
                    <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-accent">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Trending producten
              </h2>
              <p className="text-muted-foreground">
                Ontdek onze best verkochte natuurlijke verzorgingsproducten
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex items-center">
              Alle producten <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Natural Face Cream", price: "€24,95", rating: 4.8 },
              { name: "Bio Shampoo Bar", price: "€12,95", rating: 4.9 },
              { name: "DIY Face Mask Kit", price: "€19,95", rating: 4.7 },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group bg-background rounded-xl border overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src="/window.svg"
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Nieuw</Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{product.price}</span>
                      <Button size="sm">
                        <ShoppingBag className="h-4 w-4 mr-2" /> In winkelwagen
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIY Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-[#f8f6f3] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                  DIY Beauty
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Start vandaag nog jouw DIY avontuur
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Maak je eigen natuurlijke verzorgingsproducten met onze DIY
                  pakketten en recepten.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg">Bekijk DIY pakketten</Button>
                  <Button size="lg" variant="outline">
                    Ontdek recepten
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/window.svg"
                  alt="DIY Beauty Kit"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-accent">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Waarom Natural Heroes?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pure ingrediënten, eerlijke producten
            </h2>
            <p className="text-lg text-muted-foreground">
              Wij geloven in de kracht van natuurlijke ingrediënten en
              transparantie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Natuurlijk",
                description:
                  "Alleen pure ingrediënten zonder toegevoegde chemicaliën",
              },
              {
                title: "Duurzaam verpakt",
                description:
                  "Milieuvriendelijke verpakkingen en zero-waste opties",
              },
              {
                title: "Eerlijke prijzen",
                description:
                  "Direct van maker naar gebruiker voor de beste prijs",
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-xl border text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Word lid van onze community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ontvang DIY recepten, tips en exclusieve aanbiedingen in je inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Je e-mailadres"
                className="h-12"
              />
              <Button size="lg" className="h-12">
                Aanmelden
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
