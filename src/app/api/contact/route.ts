import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import pool from "../../../../lib/db" // adjust path based on your project

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const result = await pool.query(
      `INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id, timestamp`,
      [name, email, message]
    )

    const contact = result.rows[0]

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        // Email to you
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: "a16thakkar@gmail.com",
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          `,
        })

        // Auto-reply to sender
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Thank you for contacting me!",
          html: `
            <h2>Hi ${name},</h2>
            <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of your message:</p>
            <blockquote style="border-left: 4px solid #22d3ee; padding-left: 16px; margin: 16px 0; color: #666;">
              ${message}
            </blockquote>
            <p>Best regards,<br>Krupanshi Patel</p>
            <p style="color: #888; font-size: 12px;">This is an automated response. Please do not reply to this email.</p>
          `,
        })
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      id: contact.id,
      timestamp: contact.timestamp,
    }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY timestamp DESC")

    return NextResponse.json({
      success: true,
      contacts: result.rows,
      total: result.rowCount,
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
