"use client";

import { ArrowDownRight, Cpu, Palette, PenTool, Video } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Architecture Works",
    description:
      "Designing innovative and sustainable architectural solutions.",
    link: "#",
    icon: Cpu,
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing user interfaces.",
    link: "#",
    icon: Palette,
  },
  {
    id: 3,
    title: "Logo Design",
    description: "Crafting unique and memorable brand identities.",
    link: "#",
    icon: PenTool,
  },
  {
    id: 4,
    title: "Video Editing and Animation",
    description: "Producing engaging visual content and animations.",
    link: "#",
    icon: Video,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-primary/5 transform -skew-y-6 group-hover:skew-y-0 transition-transform duration-300 ease-out" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-primary/20">
                    {service.id.toString().padStart(2, "0")}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      href={service.link}
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <ArrowDownRight className="text-primary" />
                    </Link>
                  </motion.div>
                </div>
                <div className="flex items-center mb-4">
                  <service.icon className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href={service.link}
                    className="text-primary hover:text-primary/80 transition-colors inline-flex items-center group"
                  >
                    Learn More
                    <ArrowDownRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
