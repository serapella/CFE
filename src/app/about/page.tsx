import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Globe, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">About BODYMATTERS</h1>
        <p className="text-lg text-muted-foreground">
          We're on a mission to help consumers make informed choices about their
          personal care products through transparency and education.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {[
          {
            icon: <Heart className="h-8 w-8 text-[hsl(var(--peacock))]" />,
            title: "Health First",
            description:
              "We prioritize your wellbeing by providing accurate, science-based information.",
          },
          {
            icon: <Users className="h-8 w-8 text-[hsl(var(--sunshine))]" />,
            title: "Community Driven",
            description:
              "Built by and for people who care about what goes into their products.",
          },
          {
            icon: <Globe className="h-8 w-8 text-[hsl(var(--azure))]" />,
            title: "Environmental Impact",
            description:
              "Promoting products that are good for both you and the planet.",
          },
          {
            icon: <Shield className="h-8 w-8 text-[hsl(var(--papaya))]" />,
            title: "Transparency",
            description:
              "Clear, unbiased information about product ingredients and their effects.",
          },
        ].map((value, i) => (
          <Card key={i} className="p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-muted-foreground">{value.description}</p>
          </Card>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-6">
            BODYMATTERS was founded in 2023 with a simple goal: to make it
            easier for people to understand what's in their personal care
            products.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            We believe that everyone deserves to know exactly what they're
            putting on their skin and into their bodies. Our platform combines
            cutting-edge technology with extensive research to provide clear,
            actionable information about product ingredients.
          </p>
          <Button size="lg">Learn More About Our Mission</Button>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg"
            alt="Our team working"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're a diverse group of scientists, developers, and health
          enthusiasts working together to make personal care more transparent.
        </p>
      </div>

      {/* CTA Section */}
      <Card className="bg-[hsl(var(--peacock))] text-white">
        <div className="p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg opacity-90 mb-8">
              Help us create a world where making healthy choices is easy and
              accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Join Our Community
              </Button>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
