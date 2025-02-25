"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ExternalLink,
  Code2,
  Palette,
  Building2,
  Camera,
  Tag,
  Calendar,
  PenToolIcon as Tool,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import VideoModal from "@/components/video-modal";

const categories = [
  {
    id: 1,
    name: "Logo Design",
    icon: Code2,
    description: "Full-stack & Frontend Projects",
  },
  {
    id: 2,
    name: "UI/UX Design",
    icon: Palette,
    description: "Digital Product Design",
  },
  {
    id: 3,
    name: "Architecture",
    icon: Building2,
    description: "Architectural Projects",
  },
  {
    id: 4,
    name: "Video Editing & Animation",
    icon: Camera,
    description: "Visual Projects",
  },
];

const portfolioWorks = [
  {
    id: 1,
    title: "Geda Park",
    description:
      "A modern recreational park designed to offer a peaceful escape with lush greenery, walking trails, and family-friendly spaces. ",
    categoryId: 3,
    images: [
      "/assets/geda.png",
      "/assets/geda1.png",
      "/assets/geda2.png",
      "/assets/geda3.png",
      "/assets/geda4.png",
      "/assets/geda5.png",
      "/assets/geda6.png",
      "/assets/geda7.png",
      "/assets/geda8.png",
      "/assets/geda9.png",
    ],
    video: "/assets/video-final.mp4",
    link: "#",
    year: "2024",
    tools: ["Revit", "Sketchup, Lumion, d5, Twinmotion, 3rds max", "Rhino"],
    role: "Architecture",
    featured: false,
  },
  {
    id: 2,
    title: "Interior Design",
    description:
      "A visionary approach to transforming spaces with style, functionality, and elegance. This project focuses on creating aesthetically pleasing and practical interiors, blending modern trends with personalized touches. ",
    categoryId: 3,
    images: [
      "/assets/interior.png",
      "/assets/interior1.png",
      "/assets/interior2.png",
      "/assets/interior4.png",
      "/assets/interior5.png",
    ],
    link: "#",
    year: "2023",

    tools: ["Revit", "Sketchup, Lumion, d5, Twinmotion, 3rds max", "Rhino"],
    role: "Architect",
    featured: false,
  },
  {
    id: 3,
    title: "Hotel Design",
    description:
      "A sophisticated and functional hotel design that blends luxury, comfort, and efficiency. This project focuses on creating inviting spaces with elegant interiors, seamless layouts, and modern amenities.",
    categoryId: 3,
    images: [
      "/assets/hotel.png",
      "/assets/hotel1.png",
      "/assets/hotel2.png",
      "/assets/hotel3.png",
      "/assets/hotel4.png",
      "/assets/hotel5.png",
    ],
    video: "/video.mp4",
    link: "#",
    year: "2023",
    tools: ["AutoCAD", "Revit", "3ds Max"],
    role: "Architect",
    featured: false,
  },
  {
    id: 4,
    title: "Kasma Digital",
    description:
      "A forward-thinking software development company specializing in building innovative and scalable digital solutions.",
    categoryId: 1,
    images: ["/assets/kasma.png", "/assets/kasma1.png"],
    link: "#",
    year: "2024",
    tools: ["Adobe Illustrator", "Adobe InDesign", "Figma"],
    role: "Logo Design",
    featured: false,
  },
  {
    id: 5,
    title: "NetibPixels",
    description:
      "Complete brand identity design for a tech startup, including logo, color palette, typography, and brand guidelines to ensure consistent visual communication across all platforms.",
    categoryId: 1,
    images: ["/assets/pixel.jpg", "/assets/pixel1.jpg", "/assets/pixel2.jpg"],
    link: "#",
    year: "2023",
    tools: ["Adobe Illustrator", "Adobe InDesign", "Figma"],
    role: "Brand Designer",
    featured: false,
  },
  {
    id: 6,
    title: "Smart Home System",
    description:
      "IoT-based home automation system with mobile app control. This project integrates various smart devices to create a seamless and energy-efficient living environment.",
    categoryId: 0,
    images: [
      "/placeholder.svg?height=600&width=800&text=Mobile+App+UI",
      "/placeholder.svg?height=600&width=800&text=Smart+Hub+Design",
      "/placeholder.svg?height=600&width=800&text=System+Architecture",
    ],
    video: "/video.mp4",
    link: "#",
    year: "2024",
    tools: ["React Native", "Node.js", "MQTT", "Arduino"],
    role: "IoT Developer",
    featured: false,
  },
];

export default function PortfolioWorks() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedWorkId, setExpandedWorkId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const deckRef = useRef(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll to center the current image in the deck
  useEffect(() => {
    if (expandedWorkId && deckRef.current) {
      const deck = deckRef.current;
      const cards = deck.querySelectorAll(".deck-card");
      if (cards[currentImageIndex]) {
        const cardWidth = cards[currentImageIndex].offsetWidth;
        const scrollPosition =
          currentImageIndex * cardWidth - deck.offsetWidth / 2 + cardWidth / 2;
        deck.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentImageIndex, expandedWorkId]);

  const filteredWorks = selectedCategory
    ? portfolioWorks.filter((work) => work.categoryId === selectedCategory)
    : portfolioWorks;

  const openVideoModal = (videoSrc, e) => {
    e.stopPropagation();
    setCurrentVideoSrc(videoSrc);
    setVideoModalOpen(true);
  };

  const toggleImageGallery = (workId, e) => {
    // Prevent toggling if clicking on buttons
    if (e.target.closest("button")) return;

    if (expandedWorkId === workId) {
      setExpandedWorkId(null);
    } else {
      setExpandedWorkId(workId);
      setCurrentImageIndex(0);
    }
  };

  const navigateImage = (direction, e) => {
    e.stopPropagation(); // Prevent gallery from closing when clicking navigation buttons

    if (!expandedWorkId) return;

    const work = portfolioWorks.find((w) => w.id === expandedWorkId);
    if (!work || !work.images || work.images.length <= 1) return;

    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % work.images.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + work.images.length) % work.images.length
      );
    }
  };

  const sidebarVariants = {
    open: {
      width: isMobile ? "100%" : "300px",
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    closed: {
      width: isMobile ? "100%" : "80px",
      x: isMobile ? "-100%" : 0,
      opacity: isMobile ? 0 : 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
  };

  return (
    <div className="bg-background mt-20">
      {/* Mobile menu button */}
      {isMobile && (
        <div className="fixed top-24 left-4 z-50">
          <motion.button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      )}

      <div className="flex relative">
        {/* Sidebar - Desktop sticky, Mobile absolute */}
        <AnimatePresence>
          {(!isMobile || isMobileSidebarOpen) && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className={cn(
                "z-40 bg-card  overflow-hidden",
                isMobile
                  ? "fixed top-20 left-0 h-[calc(100vh-5rem)] w-full"
                  : "sticky top-20 h-[calc(100vh-5rem)] w-[300px]"
              )}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-semibold">Portfolio</h2>
                  {isMobile ? (
                    <motion.button
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-2 rounded-full hover:bg-accent"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className="p-2 rounded-full hover:bg-accent"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          !isSidebarOpen && "rotate-180"
                        )}
                      />
                    </motion.button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Showcasing my best works across different disciplines
                    </p>
                  </div>

                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(
                          category.id === selectedCategory ? null : category.id
                        );
                        if (isMobile) setIsMobileSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200",
                        category.id === selectedCategory
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <category.icon className="h-5 w-5 shrink-0" />
                      <div className="text-left">
                        <p className="font-medium whitespace-nowrap">
                          {category.name}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {category.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div
          className={cn(
            "flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300",
            isMobile ? "w-full" : isSidebarOpen ? "ml-0" : "ml-[80px]"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredWorks.map((work) => (
                <motion.div
                  key={work.id}
                  className={cn(
                    "group relative rounded-xl overflow-hidden bg-card ",
                    work.featured && "md:col-span-2",
                    expandedWorkId === work.id && "md:col-span-2"
                  )}
                  whileHover={expandedWorkId !== work.id ? { y: -5 } : {}}
                  layout
                >
                  {/* Side-by-side layout when expanded */}
                  <div
                    className={cn(
                      "flex flex-col md:flex-row",
                      expandedWorkId === work.id && "md:h-[500px]"
                    )}
                  >
                    {/* Left side: Project details */}
                    <div
                      className={cn(
                        "flex flex-col",
                        expandedWorkId === work.id ? "md:w-1/2" : "w-full"
                      )}
                    >
                      <div
                        className={cn(
                          "aspect-[16/9] relative cursor-pointer",
                          expandedWorkId === work.id && "md:h-64"
                        )}
                        onClick={(e) => toggleImageGallery(work.id, e)}
                      >
                        <Image
                          src={work.images?.[0] || "/placeholder.svg"}
                          alt={work.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {work.images && work.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                            {work.images.length} images
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>

                      <div className="p-4 md:p-6 flex-1 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Tag className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                          <span className="text-xs md:text-sm text-muted-foreground">
                            {
                              categories.find((c) => c.id === work.categoryId)
                                ?.name
                            }
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                          <span className="text-xs md:text-sm text-muted-foreground">
                            {work.year}
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {work.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
                          {work.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {work.tools.map((tool, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                            >
                              <Tool className="h-3 w-3" />
                              {tool}
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
                          <span className="text-xs md:text-sm text-muted-foreground">
                            {work.role}
                          </span>
                          <div className="flex gap-3">
                            {work.video && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => openVideoModal(work.video, e)}
                                className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full hover:bg-primary/30 transition-colors"
                              >
                                <Play className="h-3 w-3 md:h-4 md:w-4" />
                                <span>Demo</span>
                              </motion.button>
                            )}
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={work.link}
                              className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full hover:bg-primary/90 transition-colors"
                            >
                              <span>View Project</span>
                              <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Image Gallery */}
                    <AnimatePresence>
                      {expandedWorkId === work.id && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: 1,
                            width: isMobile ? "100%" : "50%",
                          }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative bg-black/90 md:border-l border-border"
                        >
                          {/* Close Button */}
                          <button
                            className="absolute top-2 right-2 p-1 md:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedWorkId(null);
                            }}
                            aria-label="Close gallery"
                          >
                            <X className="h-4 w-4 md:h-5 md:w-5" />
                          </button>

                          {/* Current Image Display */}
                          <div className="relative h-64 md:h-[60%]">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0"
                              >
                                <Image
                                  priority
                                  quality={100}
                                  src={
                                    work.images[currentImageIndex] ||
                                    "/placeholder.svg"
                                  }
                                  alt={`${work.title} - Image ${
                                    currentImageIndex + 1
                                  }`}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                            </AnimatePresence>

                            {/* Navigation Controls for Current Image */}
                            {work.images.length > 1 && (
                              <div className="absolute inset-0 flex items-center justify-between px-2">
                                <button
                                  className="p-1 md:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                  onClick={(e) => navigateImage("prev", e)}
                                  aria-label="Previous image"
                                >
                                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                                <button
                                  className="p-1 md:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                  onClick={(e) => navigateImage("next", e)}
                                  aria-label="Next image"
                                >
                                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Deck Container */}
                          <div
                            ref={deckRef}
                            className="relative h-[40%] overflow-x-auto scrollbar-hide"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            <div className="flex p-4 space-x-4 h-full">
                              {work.images.map((image, index) => (
                                <div
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
                                  }}
                                  className={cn(
                                    "deck-card flex-shrink-0 cursor-pointer transition-all duration-300 rounded-lg overflow-hidden h-full",
                                    currentImageIndex === index
                                      ? "w-[40%] opacity-100 border-2 border-primary"
                                      : "w-[30%] opacity-70 hover:opacity-90"
                                  )}
                                >
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={image || "/placeholder.svg"}
                                      alt={`${work.title} - Image ${index + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Image Counter */}
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center">
                            <div className="flex gap-1 md:gap-2 bg-black/50 px-3 py-1 rounded-full">
                              {work.images.map((_, index) => (
                                <button
                                  key={index}
                                  className={cn(
                                    "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all",
                                    currentImageIndex === index
                                      ? "bg-primary scale-125"
                                      : "bg-white/50 hover:bg-white/80"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
                                  }}
                                  aria-label={`Go to image ${index + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoSrc={currentVideoSrc}
      />
    </div>
  );
}
