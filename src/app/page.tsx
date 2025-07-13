"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ChevronDown, Download, Github, Linkedin, Mail, Award } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import { useState } from "react"

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              Krupanshi Patel
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          {/* Fixed particle animation - using deterministic positions */}
          {Array.from({ length: 50 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${(i * 7.3) % 100}%`,
                top: `${(i * 11.7) % 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: (i % 3) + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Krupanshi Patel
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            <TypeAnimation
              sequence={[
                "Data Scientist",
                2000,
                "AI Enthusiast",
                2000,
                "Python Developer",
                2000,
                "Analytics Expert",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Number.POSITIVE_INFINITY}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            &quot;Turning data into decisions.&quot; Passionate about extracting insights from data and building intelligent
            systems that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/resume.pdf"
              download="Ayush_Thakkar_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </motion.a>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/krupanshii"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-full bg-slate-800/50 backdrop-blur-sm"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/krupanshipatel/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-full bg-slate-800/50 backdrop-blur-sm"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:krupanshii2308@gmail.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-full bg-slate-800/50 backdrop-blur-sm"
              >
                <Mail size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-cyan-400" size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Know About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            >
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full overflow-hidden">
                  <img
                    src="/Krupanshi Patel.jpeg"
                    alt="Krupanshi Patel"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white"></h3>
              <p className="text-gray-300 leading-relaxed">
                I hold a Bachelor of Engineering in Information Technology from LDRP Institute of Technology and Research, where I discovered and cultivated a deep interest in data science. Fascinated by the power of data to drive decisions and solve real-world problems, I’ve actively pursued projects in machine learning, deepfake detection, and financial fraud analysis. My hands-on experience in both backend development and AI research reflects a strong foundation and a genuine passion for data-driven innovation. I’m now seeking to advance this journey by pursuing a Master’s in Data Science.
              </p>
              <p className="text-gray-300 leading-relaxed">
                What drives me is the belief that data holds the potential to address critical challenges and bring meaningful change. From analyzing suspicious fund flows in financial systems to detecting manipulated media through deepfake detection, I’ve consistently applied data science to build intelligent, practical solutions. I’m committed to using technology not just for innovation, but for impact — solving problems that truly matter.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">6+</div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">3+</div>
                  <div className="text-gray-400">Years Learning</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Programming Languages",
                skills: [
                  { name: "Python", level: 90 },
                  { name: "JavaScript", level: 80 },
                  { name: "C", level: 85 },
                  { name: "C++", level: 75 },
                  { name: "Java", level: 70 },
                ],
              },
              {
                category: "Data Science & ML",
                skills: [
                  { name: "Scikit-learn", level: 85 },
                  { name: "Pandas", level: 90 },
                  { name: "NumPy", level: 88 },
                  { name: "OpenCV", level: 75 },
                  { name: "TensorFlow", level: 80 },
                  { name: "PyTorch", level: 70 },
                  { name: "Keras", level: 75 },
                  { name: "Matplotlib", level: 85 },
                  { name: "Seaborn", level: 80 },
                ],
              },
              {
                category: "Databases",
                skills: [
                  { name: "SQL", level: 85 },
                  { name: "MySQL", level: 80 },
                  { name: "PostgreSQL", level: 75 },
                  { name: "MongoDB", level: 70 },
                ],
              },
              {
                category: "Tools & Technologies",
                skills: [
                  { name: "GitHub", level: 85 },
                  { name: "Jupyter Notebook", level: 80 },
                  { name: "VS Code", level: 90 },
                  { name: "React", level: 75 },
                  { name: "Node.js", level: 70 },
                  { name: "Docker", level: 65 },
                  { name: "Google Colab", level: 60 },
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fund Trail Analysis Tool",
                description:
                  "Developed a machine learning tool to identify suspicious transaction patterns and trace financial fraud chains using anomaly detection and pattern recognition.",
                tools: ["Python", "Machine Learning", "Anomaly Detection", "Data Analysis"],
                status: "Completed",
                gradient: "from-red-500 to-pink-500",
              },
              {
                title: "Placement Trend Prediction",
                description:
                  "Built a statistical model to analyze institutional placement data and predict future hiring trends across different domains and technologies.",
                tools: ["Python", "Pandas", "Data Visualization", "Machine Learning", "Regression"],
                status: "Completed",
                gradient: "from-green-500 to-teal-500",
              },
              {
                title: "Deepfake Generation System",
                description:
                  "Implemented a deepfake video generation pipeline using CNN and LSTM architectures to synthesize facial expressions and speech patterns in manipulated media.",
                tools: ["Python", "CNN", "LSTM", "OpenCV"],
                status: "Completed",
                gradient: "from-purple-500 to-indigo-500",
              },
              {
                title: "Deepfake Detection System",
                description:
                  "Developed an AI-based system to detect synthetic tampering in videos by identifying inconsistencies in temporal coherence and facial behavior.",
                tools: ["Python", "CNN", "LSTM", "Computer Vision"],
                status: "Completed",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Fitness Community Platform – iSyncEvolution",
                description:
                  "Building and optimizing backend APIs and relational schemas for a multi-role fitness platform with secure authentication and real-time user tracking.",
                tools: ["Node.js", "Express.js", "MySQL"],
                status: "Ongoing",
                gradient: "from-orange-500 to-yellow-500",
              },
              {
                title: "SOS Emergency Response App",
                description:
                  "Developing a community-driven emergency response app featuring live alerts, geo-fencing, and mission boards, focused on real-time public safety support.",
                tools: ["Node.js", "Realtime DB", "System Security"],
                status: "Ongoing",
                gradient: "from-violet-500 to-purple-500",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-800/50 rounded-lg overflow-hidden border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "In Progress"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-slate-700/50 text-cyan-400 text-sm rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Data Analytics Job Simulation",
                issuer: "Deloitte Australia (Via Forage)",
                date: "2025",
                description: "Learned core concepts of data analysis and visualization through a hands-on simulation. Focused on cleaning, interpreting, and communicating business data insights.",
                status: "Completed",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "BCG - Data Science Job Simulation",
                issuer: "BCG (via Forage)",
                date: "2025",
                description: "Applied machine learning techniques to real-world business cases. Gained exposure to supervised/unsupervised learning and data-driven strategic decisions.",
                status: "Completed",
                color: "from-green-500 to-teal-500",
              },
              {
                title: "Data Analytics and Visualization Job Simulation",
                issuer: "Accenture North America (via Forage)",
                date: "2025",
                description: "Enhanced data manipulation skills using Python and Pandas. Practiced translating data into visual insights to support business recommendations.",
                status: "Completed",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Data Visualisation: Empowering Business with Effective Insights Job Simulation",
                issuer: "Tata Group (via Forage)",
                date: "2025",
                description: "Focused on how to convert raw data into business intelligence. Learned how impactful visual storytelling drives better decision-making.",
                status: "Completed",
                color: "from-orange-500 to-red-500",
              },
              {
                title: "Applied Data Science with Python - Level 2",
                issuer: "IBM",
                date: "2024",
                description: "Built a solid foundation in applying Python to data science, covering advanced libraries like Pandas, NumPy, Matplotlib, and Scikit-learn for real-world analysis.",
                status: "Completed",
                color: "from-indigo-500 to-purple-500",
              },
              {
                title: "Getting Started with Enterprise Data Science",
                issuer: "IBM",
                date: "2023",
                description: "Introduction to enterprise-grade data science. Explored the full data pipeline, model deployment, and how businesses scale data solutions effectively.",
                status: "Completed",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-800/50 rounded-lg overflow-hidden border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 bg-gradient-to-r ${cert.color} rounded-lg flex items-center justify-center`}
                      >
                        <Award className="text-white" size={24} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                        <p className="text-purple-400 text-sm">{cert.issuer}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        cert.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">{cert.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-semibold text-sm">{cert.date}</span>
                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-xs px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-full border border-cyan-400/30 hover:bg-cyan-500/30 transition-all duration-300"
                    >
                      View Certificate
                    </motion.button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="projects" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Research Work
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Explainable AI in Deepfake Detection – IEEE Xplore Survey",
                description:
                  "A survey paper titled “A Comprehensive Survey on Explainable Deepfake Detection: Techniques, Challenges, and Future Directions”, which was accepted and published in IEEE Xplore. The survey highlights key detection methods, evaluates interpretability frameworks such as SHAP, LIME, and Grad-CAM, and outlines the future roadmap for responsible AI in multimedia forensics.",
                tools: [],
                status: "Accepted",
                gradient: "from-red-500 to-pink-500",
              },
              {
                title: "Skin Cancer Detection using Machine Learning",
                description:
                  "I am currently working on a skin cancer detection project that applies deep learning to dermoscopic imagery. The goal is to assist medical professionals by accurately classifying skin lesions as benign or malignant using CNN-based classification models. This research emphasizes image preprocessing, feature extraction, and optimizing sensitivity for early diagnosis, and reflects my commitment to leveraging AI for impactful healthcare solutions.",
                tools: [],
                status: "Ongoing",
                gradient: "from-green-500 to-teal-500",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-800/50 rounded-lg overflow-hidden border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === "Published"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "In Progress"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-slate-700/50 text-cyan-400 text-sm rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Professional Journey  
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400"></div>

              {[
                {
                  year: "2021 - 2025",
                  title: "Bachelor of Engineering in Information Technology",
                  organization: " LDRP-ITR, KSV University",
                  description:
                    "Completed Bachelor of Engineering in Information Technology with a focus on data science, machine learning, and backend development. Consistently maintained strong academic performance while contributing to real-world projects across domains like healthcare, cybersecurity, and community-driven technology.",
                  type: "Education",
                },
                {
                  year: "2023 - Present",
                  title: "Self-Directed Learning",
                  organization: "Data Science & AI",
                  description:
                    "Pursued independent learning through certifications, research work, and real-world projects focused on deepfake detection, fraud analysis, and healthcare AI. Strengthened expertise in ML, ethical AI, backend systems, and data engineering.",
                  type: "Learning",
                },
                {
                  year: "2024 - 2025",
                  title: "Developer – AI Content & Research",
                  organization: "MindstormSoft, Ahmedabad",
                  description:
                    "Worked as a content and technical writer, contributing to AI documentation and research. Developed a real-time avatar animation system using deep learning, facial detection, and lip-sync integration in Python.",
                  type: "Internship",
                },
                {
                  year: "2025 - Present",
                  title: "Backend Developer – Fitness Community Platform",
                  organization: "iSyncEvolution Pvt. Ltd., Ahmedabad",
                  description:
                    "Developed scalable backend APIs and MySQL schemas for a multi-role fitness platform. Implemented secure authentication, role-based access, and collaborated with Flutter teams for API integration.",
                  type: "Professional Training",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20">
                      <div className="flex items-center mb-2">
                        <span className="text-cyan-400 font-semibold">{item.year}</span>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            item.type === "education"
                              ? "bg-blue-500/20 text-blue-400"
                              : item.type === "learning"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <h4 className="text-purple-400 mb-3">{item.organization}</h4>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full border-4 border-slate-900"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Let&apos;s Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Ready to turn ideas into reality? Whether you want to brainstorm, build, or innovate in data science and AI, I’m just a message away. Let’s make something extraordinary together!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.a
                href="mailto:krupanshii2308@gmail.com"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center space-x-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Email</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">krupanshii2308@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/krupanshipatel/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center space-x-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300">
                  <Linkedin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">LinkedIn</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">linkedin.com/in/krupanshipatel</p>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/krupanshii"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center space-x-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300">
                  <Github className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">GitHub</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">github.com/krupanshii</p>
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                    <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                    >
                    Thank you for reaching out! Your message has been sent and I’ll respond as soon as possible.
                    </motion.div>
                )}

                {submitStatus === "error" && (
                    <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                    >
                    Oops! Something went wrong. Please try again later or reach out via email.
                    </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? "bg-slate-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-cyan-400">Krupanshi Patel</span>
              <span className="mx-2 text-purple-400">|</span>
              <span className="italic">Empowering innovation by transforming data into actionable intelligence.</span>
            </p>
        </div>
      </footer>
    </div>
  )
}
