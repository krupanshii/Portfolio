"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, Users, Mail, TrendingUp, Calendar } from "lucide-react"

interface DashboardStats {
  totalContacts: number
  thisMonth: number
  thisWeek: number
  recentContacts: Array<{
    id: string
    name: string
    email: string
    timestamp: string
  }>
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    thisMonth: 0,
    thisWeek: 0,
    recentContacts: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contact")
        const data = await response.json()

        if (data.success) {
          const contacts = data.contacts
          const now = new Date()
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

          const thisWeek = contacts.filter((contact: any) => new Date(contact.timestamp) > oneWeekAgo).length

          const thisMonth = contacts.filter((contact: any) => new Date(contact.timestamp) > oneMonthAgo).length

          setStats({
            totalContacts: contacts.length,
            thisMonth,
            thisWeek,
            recentContacts: contacts.slice(0, 5),
          })
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      title: "This Month",
      value: stats.thisMonth,
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      change: "+8%",
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      icon: TrendingUp,
      color: "from-green-500 to-teal-500",
      change: "+23%",
    },
    {
      title: "Response Rate",
      value: "94%",
      icon: Mail,
      color: "from-orange-500 to-red-500",
      change: "+5%",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block mb-4"
          >
            <BarChart3 className="text-cyan-400" size={48} />
          </motion.div>
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio Dashboard
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mb-4"></div>
          <p className="text-gray-300">Overview of your portfolio performance and contact submissions</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Mail className="text-cyan-400" size={24} />
            Recent Contacts
          </h2>

          {stats.recentContacts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No recent contacts</p>
          ) : (
            <div className="space-y-4">
              {stats.recentContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{contact.name}</p>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">{new Date(contact.timestamp).toLocaleDateString()}</div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <motion.a
              href="/admin"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              View All Contacts
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
