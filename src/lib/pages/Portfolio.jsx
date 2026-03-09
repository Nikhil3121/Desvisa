import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Github,
  Mail,
  ArrowRight,
  Zap,
  Code2,
  Database,
  Palette,
  ExternalLink,
  ChevronDown,
  Star,
} from "lucide-react";
import AI3DCharacter from "../components/AI3DCharacter";
import GalaxyBackground from "../components/GalaxyBackground";
import AIChatbot from "../components/AIChatbot";

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showAI3D, setShowAI3D] = useState(true); // Toggle AI character

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Your Incredible Projects - All 15
  const projects = [
    {
      id: 1,
      title: "Inventory Management System",
      category: "Enterprise",
      description:
        "Complete inventory tracking solution with real-time stock updates, supplier management, and automated alerts. Features barcode scanning, predictive forecasting, and comprehensive analytics dashboard for complete visibility.",
      image: "📦",
      tech: ["React JS", "JavaScript", "MongoDB", "Tailwind CSS"],
      highlights: [
        "✨ Real-time Stock Tracking & Updates",
        "🔔 Automated Low-Stock Alerts",
        "📊 Advanced Analytics Dashboard",
        "🔍 Barcode & QR Code Scanning",
        "📈 Predictive Inventory Forecasting",
        "👥 Multi-User Access Control",
      ],
      color: "from-blue-500 to-cyan-500",
      gradient: "via-blue-400",
    },
    {
      id: 2,
      title: "E-Commerce Platform 1",
      category: "Application",
      description:
        "Modern single-vendor e-commerce solution with comprehensive product catalog, intelligent shopping cart, secure checkout system, and complete order management. Includes customer reviews, wishlist features, and advanced product filtering.",
      image: "🛒",
      tech: ["React JS", "JavaScript", "MongoDB", "Tailwind CSS"],
      highlights: [
        "🛍️ Product Catalog Management",
        "🔒 Secure Payment Gateway",
        "📦 Order Tracking System",
        "⭐ Customer Reviews & Ratings",
        "❤️ Wishlist & Saved Items",
        "🔎 Advanced Product Filtering",
      ],
      color: "from-emerald-500 to-teal-500",
      gradient: "via-emerald-400",
    },
    {
      id: 3,
      title: "E-Commerce Platform 2",
      category: "Application",
      description:
        "Advanced multi-vendor marketplace with sophisticated vendor dashboard, commission management system, and customer loyalty program. Features real-time inventory synchronization and intelligent product recommendation engine.",
      image: "🏪",
      tech: ["React JS", "JavaScript", "MongoDB", "Tailwind CSS"],
      highlights: [
        "🏢 Multi-Vendor Support System",
        "💰 Commission Management Tools",
        "🎁 Loyalty Rewards Program",
        "🤖 AI Product Recommendations",
        "📈 Vendor Analytics Dashboard",
        "🔄 Real-time Inventory Sync",
      ],
      color: "from-purple-500 to-pink-500",
      gradient: "via-purple-400",
    },
    {
      id: 4,
      title: "AI Chatbot Assistant",
      category: "AI/ML",
      description:
        "Intelligent conversational AI assistant powered by machine learning algorithms. Provides natural language processing, contextual understanding, personalized responses, and multi-language support. Can handle complex queries and learn from interactions.",
      image: "🤖",
      tech: ["React JS", "JavaScript", "Python", "Tailwind CSS"],
      highlights: [
        "🧠 NLP Engine with Context Awareness",
        "🌐 Multi-Language Support",
        "📚 Machine Learning Algorithms",
        "💬 Natural Conversation Flow",
        "🔄 Continuous Learning System",
        "⚡ Real-time Response Generation",
      ],
      color: "from-orange-500 to-red-500",
      gradient: "via-orange-400",
    },
    {
      id: 5,
      title: "NGO Website & Donation Platform",
      category: "Social Impact",
      description:
        "Complete web solution for non-profit organizations with integrated donation system, volunteer management portal, and campaign tracking. Features donor management database, impact reporting tools, and volunteer scheduling system.",
      image: "🤝",
      tech: ["React JS", "JavaScript", "MongoDB", "Tailwind CSS"],
      highlights: [
        "💳 Secure Donation System",
        "👥 Volunteer Management Portal",
        "📊 Impact Report Generation",
        "📅 Volunteer Scheduling",
        "💾 Donor Database Management",
        "🎯 Campaign Tracking Tools",
      ],
      color: "from-green-500 to-emerald-500",
      gradient: "via-green-400",
    },
    {
      id: 6,
      title: "Marketing Website & Analytics",
      category: "Marketing",
      description:
        "High-converting marketing platform with dynamic landing pages, email campaign management, and advanced lead tracking. Includes comprehensive SEO optimization, analytics integration, A/B testing, and conversion optimization tools.",
      image: "📢",
      tech: ["React JS", "JavaScript", "Tailwind CSS", "Analytics"],
      highlights: [
        "🎯 Conversion-Optimized Landing Pages",
        "📧 Email Campaign Management",
        "📊 Advanced Lead Tracking",
        "🔄 A/B Testing Framework",
        "📈 SEO Optimization Tools",
        "📉 Real-time Analytics Dashboard",
      ],
      color: "from-yellow-500 to-orange-500",
      gradient: "via-yellow-400",
    },
    {
      id: 7,
      title: "Salon Management & Booking System",
      category: "Business",
      description:
        "Complete salon management solution with online booking system, intelligent staff scheduling, comprehensive customer management. Includes secure payment processing, automated appointment reminders, and service catalog management.",
      image: "💇",
      tech: ["React JS", "JavaScript", "MongoDB", "Tailwind CSS"],
      highlights: [
        "📅 Online Booking System",
        "👨‍💼 Smart Staff Scheduling",
        "💰 Payment Gateway Integration",
        "🔔 Automated Reminders",
        "📱 Customer Management Portal",
        "💅 Service Catalog Management",
      ],
      color: "from-pink-500 to-rose-500",
      gradient: "via-pink-400",
    },
    {
      id: 8,
      title: "Jarvis AI Voice Assistant",
      category: "AI/ML",
      description:
        "Voice-activated AI assistant mimicking Jarvis from Iron Man. Features advanced voice recognition, intelligent command execution, smart home integration, and personalized AI-driven responses. Learns from user preferences.",
      image: "🎙️",
      tech: ["React JS", "JavaScript", "Python", "Tailwind CSS"],
      highlights: [
        "🎤 Advanced Voice Recognition",
        "⚙️ Smart Command Execution",
        "🏠 Smart Home Integration",
        "🧠 Personalized AI Responses",
        "📚 Voice Command Learning",
        "🔊 Natural Text-to-Speech",
      ],
      color: "from-blue-600 to-blue-400",
      gradient: "via-blue-500",
    },
    {
      id: 9,
      title: "Real-Time Chat Application",
      category: "Communication",
      description:
        "Modern messaging application with user authentication, group chat functionality, and media sharing capabilities. Features end-to-end encryption, typing indicators, message search, read receipts, and rich message support.",
      image: "💬",
      tech: ["React JS", "JavaScript", "MongoDB", "Tailwind CSS"],
      highlights: [
        "📱 Real-time Messaging",
        "👥 Group Chat Support",
        "🔐 End-to-End Encryption",
        "🎬 Media Sharing (Images/Video)",
        "🔍 Message Search & Filter",
        "✅ Read Receipts & Status",
      ],
      color: "from-cyan-500 to-blue-500",
      gradient: "via-cyan-400",
    },
    {
      id: 10,
      title: "Snake Game with Leaderboard",
      category: "Gaming",
      description:
        "Classic snake game reimagined with modern UI, multiple difficulty levels, power-ups system, and global leaderboard. Features smooth animations, sound effects, progressive difficulty scaling, and score persistence.",
      image: "🐍",
      tech: ["React JS", "JavaScript", "Tailwind CSS", "Local Storage"],
      highlights: [
        "🎮 Multiple Difficulty Levels",
        "🏆 Global Leaderboard System",
        "⚡ Power-up Items",
        "🎵 Sound Effects & Feedback",
        "🎨 Smooth Animations",
        "📊 Score Persistence",
      ],
      color: "from-lime-500 to-green-500",
      gradient: "via-lime-400",
    },
    {
      id: 11,
      title: "Advanced To-Do List Manager",
      category: "Productivity",
      description:
        "A task management web application designed to help users organize daily activities, track deadlines, and improve productivity. The system allows users to create, edit, and categorize tasks while maintaining persistent data using local storage. It includes priority management, task filtering, and visual progress tracking.",
      image: "✅",
      tech: ["React JS", "JavaScript", "Tailwind CSS", "Local Storage"],
      highlights: [
        "📋 Task creation, editing, and deletion",
        "⚠️ Priority-based task management",
        "📅 Deadline and due date tracking",
        "🔍 Task filtering and search functionality",
        "💾 Local storage persistence for saved tasks",
        "📊 Visual task completion progress tracking",
      ],
      color: "from-indigo-500 to-purple-500",
      gradient: "via-indigo-400",
    },

    {
      id: 12,
      title: "Weather Dashboard & Forecast",
      category: "Utility",
      description:
        "A responsive weather dashboard that provides real-time weather updates and forecasts using external weather APIs. The application allows users to search locations worldwide, view current weather conditions, and analyze hourly and weekly forecasts through clean data visualizations.",
      image: "⛅",
      tech: ["React JS", "JavaScript", "OpenWeather API", "Tailwind CSS"],
      highlights: [
        "🌡️ Real-time weather data using external API integration",
        "🔍 Global city search with location-based forecasts",
        "📈 7-day weather forecast with detailed conditions",
        "🌅 Sunrise and sunset time tracking",
        "📊 Clean weather data visualization UI",
        "⚡ Fast and responsive interface built with React",
      ],
      color: "from-sky-500 to-blue-500",
      gradient: "via-sky-400",
    },
    {
      id: 13,
      title: "Social Media Management Dashboard",
      category: "Social Media",
      description:
        "A social media management dashboard that allows users to manage multiple social platforms from a single interface. The system enables post scheduling, engagement monitoring, and performance analytics with visual reports to help users track audience growth and content effectiveness.",
      image: "📲",
      tech: [
        "React JS",
        "Node.js",
        "REST APIs",
        "MongoDB",
        "Tailwind CSS",
        "Chart.js",
      ],
      highlights: [
        "📅 Post scheduling and content planning system",
        "📊 Visual analytics dashboard with performance charts",
        "📈 Engagement tracking (likes, comments, shares)",
        "🗓️ Interactive content calendar",
        "👥 Audience insights and growth monitoring",
        "📥 Unified message and notification inbox",
      ],
      color: "from-fuchsia-500 to-purple-500",
      gradient: "via-fuchsia-400",
    },
    {
      id: 14,
      title: "Smart Expense Tracker",
      category: "Finance",
      description:
        "A personal finance management application that helps users track daily expenses, manage budgets, and gain insights into their spending habits. The platform provides categorized expense tracking, visual financial analytics, and goal-based savings management to help users make smarter financial decisions.",
      image: "💰",
      tech: ["React JS", "Node.js", "MongoDB", "Tailwind CSS", "Chart.js"],
      highlights: [
        "💳 Budget planning and expense tracking system",
        "📂 Category-based expense organization",
        "📊 Interactive financial reports and charts",
        "🎯 Savings goals and progress monitoring",
        "📈 Monthly spending analytics and insights",
        "🔐 Secure user authentication and data storage",
      ],
      color: "from-amber-500 to-yellow-500",
      gradient: "via-amber-400",
    },
    {
      id: 15,
      title: "Project Management Platform",
      category: "Collaboration",
      description:
        "A modern project management platform designed to help teams organize tasks, track project progress, and collaborate efficiently. The application includes Kanban-based workflow management, task assignment, milestone tracking, and real-time collaboration features to streamline team productivity.",
      image: "📌",
      tech: ["React JS", "JavaScript", "MongoDB", "Tailwind CSS"],
      highlights: [
        "📊 Interactive Kanban Board for task workflow management",
        "👥 Team collaboration with task assignment and role-based access",
        "⏱️ Task time tracking and progress monitoring",
        "📈 Visual project progress dashboard",
        "🎯 Milestone and deadline management",
        "📢 Real-time team communication and notifications",
      ],
      color: "from-violet-500 to-purple-500",
      gradient: "via-violet-400",
    },
  ];

  const skills = {
    "Frontend Mastery": [
      "React JS",
      "JavaScript",
      "HTML5",
      "Tailwind CSS",
      "UI/UX Implementation",
    ],
    "Backend Power": [
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Authentication",
      "Database Design",
    ],
    Languages: ["JavaScript", "Python", "C", "sql"],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Animated Background - Premium Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 1 }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/15 to-cyan-600/15 rounded-full blur-3xl"
        />
      </div>

      {/* AI 3D Character Hero Section */}
      {showAI3D && (
        <section className="relative h-screen w-full">
          <AI3DCharacter />

          {/* Close button for AI section */}
          <button
            onClick={() => setShowAI3D(false)}
            className="absolute top-8 right-8 z-20 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/50 rounded-lg transition-all text-sm font-semibold"
          >
            ✕ Close
          </button>
        </section>
      )}

      {/* Hero Section - Ultra Premium */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 md:pt-0">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-center md:text-left py-20"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-block md:inline-block"
            >
              <div className="px-4 py-2 rounded-full border border-cyan-500/50 text-cyan-400 text-sm font-medium backdrop-blur-sm bg-cyan-500/10">
                <div className="flex items-center gap-2">
                  <Star
                    size={16}
                    className="animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                  <span>Welcome to My Portfolio</span>
                  Passionate developer crafting modern, scalable web
                  applications with clean code, creative design, and powerful
                  technology to build meaningful digital experiences.
                  {/* Right Section - Profile Image Container */}
                  <div className="flex justify-center items-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                    <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                      {/* Rotating gradient border */}
                      <div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 p-1 animate-spin"
                        style={{ animationDuration: "8s" }}
                      >
                        <div className="absolute inset-1 rounded-full bg-slate-900"></div>
                      </div>

                      {/* Profile Image */}
                      <img
                        src="/1image.jpeg"  
                        alt="Profile"
                        className="absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-700 opacity-100"
                      />

                      {/* Glowing pulse effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-xl animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="block">Full Stack</span>
                  <span className="block">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                      Web Developer
                    </span>
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl md:mx-0 mx-auto font-light">
                Crafting exceptional digital experiences with{" "}
                <span className="text-cyan-400 font-semibold">React JS</span>,{" "}
                <span className="text-cyan-400 font-semibold">JavaScript</span>,
                <span className="text-cyan-400 font-semibold">
                  Tailwind CSS
                </span>
                <span className="text-cyan-400 font-semibold">MongoDB</span>
                <span className="text-cyan-400 font-semibold">Node.js</span>
                <span className="text-cyan-400 font-semibold">
                  Genrative AI
                </span>
                and modern web technologies. Specialized in building scalable
                applications that users love and businesses trust.
              </p>
            </motion.div>

            {/* CTA Buttons - Premium Style */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
            >
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageCircle size={20} className="relative z-10" />
                <span className="relative z-10">WhatsApp: +91 9142735101</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover:translate-x-2 transition-transform"
                />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-full hover:bg-cyan-400/10 transition-all flex items-center justify-center gap-2 hover:scale-105 transform"
              >
                <Github size={20} />
                <span>GitHub Profile</span>
              </a>
            </motion.div>

            {/* Premium Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 md:gap-8 pt-12 md:pt-16 md:border-t border-gray-700/50 md:mt-8"
            >
              {[
                {
                  number: "15+",
                  label: "Projects",
                  color: "from-cyan-400 to-blue-600",
                },
                {
                  number: "2+",
                  label: "Years Dev",
                  color: "from-purple-400 to-pink-600",
                },
                {
                  number: "100%",
                  label: "Dedication",
                  color: "from-emerald-400 to-cyan-600",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="text-center"
                >
                  <p
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center hidden md:block"
          >
            <p className="text-cyan-400 text-sm mb-3 font-medium">
              Scroll to Explore
            </p>
            <ChevronDown
              className="text-cyan-400 animate-bounce mx-auto"
              size={28}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section - Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-gray-700/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            <motion.div
              variants={itemVariants}
              className="text-center space-y-6"
            >
              <h2 className="text-5xl md:text-6xl font-bold">
                About{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Building digital solutions with passion, precision, and
                innovation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm a passionate full-stack developer with expertise in
                  building scalable, modern web applications. With a strong
                  foundation in React JS, JavaScript, and contemporary web
                  technologies, I create solutions that are not just functional
                  but beautifully crafted and user-centric.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  My development journey is marked by continuous learning,
                  innovation, and a commitment to excellence. I believe in
                  writing clean, maintainable code, following industry best
                  practices, and delivering solutions that exceed client
                  expectations.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  From concept to deployment, I'm passionate about every aspect
                  of web development - from pixel-perfect UI implementation to
                  robust backend architecture.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a
                    href="mailto:Infonik3121@gmail.com"
                    className="px-6 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all flex items-center gap-2 justify-center sm:justify-start font-semibold"
                  >
                    <Mail size={18} /> Email Me
                  </a>
                  <a
                    href="https://github.com/Nikhil3121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 transition-all flex items-center gap-2 justify-center sm:justify-start font-semibold"
                  >
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  {
                    skill: "React JS",
                    percentage: 95,
                    color: "from-blue-400 to-cyan-600",
                  },
                  {
                    skill: "JavaScript",
                    percentage: 92,
                    color: "from-yellow-400 to-orange-600",
                  },
                  {
                    skill: "Tailwind CSS",
                    percentage: 94,
                    color: "from-cyan-400 to-blue-600",
                  },
                  {
                    skill: "MongoDB",
                    percentage: 88,
                    color: "from-green-400 to-emerald-600",
                  },
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative group"
                  >
                    <div
                      className={`bg-gradient-to-br ${skill.color} p-px rounded-lg`}
                    >
                      <div className="bg-slate-900 rounded-lg p-6 text-center h-full">
                        <p
                          className={`text-3xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent mb-3`}
                        >
                          {skill.percentage}%
                        </p>
                        <p className="text-gray-300 font-semibold">
                          {skill.skill}
                        </p>
                        <div className="w-full bg-slate-800 rounded-full h-1 mt-4 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className={`h-full bg-gradient-to-r ${skill.color}`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-slate-800/30 to-slate-900/30 border-t border-gray-700/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            <motion.div
              variants={itemVariants}
              className="text-center space-y-6"
            >
              <h2 className="text-5xl md:text-6xl font-bold">
                Skills &amp;{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Technologies
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Master-level expertise in modern web development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, items], catIdx) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredSkill(category)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ y: -15 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/30 group"
                >
                  <h3 className="text-2xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
                    <Code2
                      size={24}
                      className="group-hover:scale-125 transition-transform"
                    />
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {items.map((item, idx) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full group-hover/item:scale-150 transition-transform" />
                        <span className="text-gray-300 group-hover/item:text-cyan-400 transition-colors font-medium">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Ultra Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-gray-700/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            <motion.div
              variants={itemVariants}
              className="text-center space-y-6"
            >
              <h2 className="text-5xl md:text-6xl font-bold">
                Featured{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                15+ cutting-edge projects showcasing expertise in React JS,
                JavaScript, Python, Tailwind CSS, and MongoDB. Click any project
                to see detailed highlights.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -15 }}
                  onClick={() =>
                    setActiveProject(
                      activeProject === project.id ? null : project.id,
                    )
                  }
                  className="group cursor-pointer h-full"
                >
                  <div
                    className={`bg-gradient-to-br ${project.color} p-0.5 rounded-2xl h-full transition-all duration-300`}
                  >
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all">
                      {/* Project Header */}
                      <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-700 p-6 flex flex-col justify-between flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="text-5xl animate-bounce"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                          >
                            {project.image}
                          </div>
                          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 space-y-4 flex-grow flex flex-col">
                        <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 pt-4">
                          {project.tech.map((tech) => (
                            <motion.span
                              key={tech}
                              whileHover={{ scale: 1.1 }}
                              className={`px-3 py-1 text-xs rounded-full font-bold border bg-gradient-to-r ${project.color} bg-clip-text text-transparent border-current`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        {/* Highlights */}
                        <AnimatePresence>
                          {activeProject === project.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3 pt-4 border-t border-slate-700/50"
                            >
                              {project.highlights.map((highlight, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                                >
                                  <Zap size={14} className="flex-shrink-0" />
                                  {highlight}
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Click Hint */}
                        {activeProject !== project.id && (
                          <div className="text-center pt-4 text-cyan-400/60 text-xs font-semibold">
                            Click to see highlights ↓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Visual */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-slate-800/30 to-slate-900/30 border-t border-gray-700/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                Tech Stack &{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Tools
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Technologies that power my solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "React JS",
                "JavaScript",
                "Python",
                "Tailwind CSS",
                "MongoDB",
                "Node.js",
                "Git",
                "REST APIs",
              ].map((tech, idx) => (
                <motion.div
                  key={tech}
                  variants={itemVariants}
                  whileHover={{ scale: 1.15, rotateY: 10 }}
                  className="group p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/30"
                >
                  <Code2 className="w-10 h-10 mx-auto mb-4 text-cyan-400 group-hover:scale-125 group-hover:rotate-12 transition-all" />
                  <p className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {tech}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-gray-700/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-12"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold">
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Amazing
                </span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-xl font-light">
                Ready to turn your ideas into reality? Let's collaborate and
                create something extraordinary that stands out in the digital
                world.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-gradient-to-r from-green-400 to-emerald-600 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-110 flex items-center justify-center gap-3 overflow-hidden text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageCircle size={24} className="relative z-10" />
                <span className="relative z-10">
                  Start Conversation on WhatsApp
                </span>
                <ArrowRight
                  size={20}
                  className="relative z-10 group-hover:translate-x-2 transition-transform"
                />
              </a>
              <a
                href="mailto:Infonik3121@gmail.com"
                className="group px-10 py-5 border-2 border-cyan-400 text-cyan-400 font-bold rounded-full hover:bg-cyan-400/10 transition-all flex items-center justify-center gap-3 hover:scale-110 transform text-lg"
              >
                <Mail size={24} />
                <span>Email Me</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-gray-700/30 text-center text-gray-400 text-sm">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          © 2026 Nikhil Kumar. All rights reserved. Built with React JS &
          Tailwind CSS.
        </motion.p>
      </footer>
    </div>
  );
}
