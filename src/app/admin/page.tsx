"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, User, Calendar, MessageSquare, RefreshCw } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/contact")
      const data = await response.json()

      if (data.success) {
        setContacts(data.contacts)
      } else {
        setError("Failed to fetch contacts")
      }
    } catch (err) {
      setError("Error fetching contacts")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Contact Form Submissions
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-6"></div>
          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-300">Total Submissions: {contacts.length}</p>
            <motion.button
              onClick={fetchContacts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg text-cyan-400 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="inline-block"
            >
              <RefreshCw className="text-cyan-400" size={32} />
            </motion.div>
            <p className="text-gray-300 mt-4">Loading contacts...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-400 bg-red-500/10 p-6 rounded-lg border border-red-500/20"
          >
            {error}
          </motion.div>
        ) : contacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 bg-slate-800/50 p-12 rounded-lg border border-purple-500/20"
          >
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-500" />
            <p>No contact submissions yet.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 p-6 rounded-lg border border-purple-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <User size={16} />
                      <span className="font-semibold">{contact.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <Mail size={16} />
                      <a href={`mailto:${contact.email}`} className="hover:text-purple-300 transition-colors">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar size={14} />
                    <span>{formatDate(contact.timestamp)}</span>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <MessageSquare size={16} />
                    Message:
                  </h4>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <motion.a
                    href={`mailto:${contact.email}?subject=Re: Your message from portfolio&body=Hi ${contact.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0ABest regards,%0D%0AAyush Thakkar`}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Reply via Email
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
