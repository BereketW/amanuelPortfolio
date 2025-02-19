"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, ArrowRight, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const socialMedias = [
    { name: "LinkedIn", icon: Linkedin, link: "#" },
    { name: "Email", icon: Mail, link: "#" },
    { name: "Telegram", icon: Send, link: "#" },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.section
          className="w-full lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary text-sm md:text-base font-semibold py-2 px-4 bg-primary/10 rounded-full">
              Architect, Graphic Designer & UI/UX Designer
            </span>
          </motion.div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Hello, I'm{" "}
            <span className="text-primary block mt-2">
              <TypeAnimation
                sequence={[
                  "Amanuel Teferi",
                  1000,
                  "an Architect",
                  1000,
                  "a UI/UX Designer",
                  1000,
                  "a Graphic Designer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
              />
            </span>
          </h1>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            I excel at crafting architecture and am proficient in various
            graphic design and UI/UX design disciplines, creating stunning
            visual experiences that captivate and inspire.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              className="group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
              href="/"
              download={true}
            >
              Download CV
              <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </Link>
            <div className="flex items-center gap-4">
              {socialMedias.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.link}
                    className=" transition-colors"
                    aria-label={link.name}
                  >
                    <link.icon className="w-5 h-5 text-primary" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
        <motion.section
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                className="rounded-full w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] object-cover border-4 border-primary relative z-10"
                src="/assets/port1.png"
                alt="Amanuel Teferi"
                width={500}
                height={500}
              />
            </motion.div>
          </div>
        </motion.section>
      </div>
      <motion.div
        className="mt-16 md:mt-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href="#projects"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
        >
          View My Projects
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </main>
  );
}
