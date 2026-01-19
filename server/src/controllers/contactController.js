import { query } from '../config/database.js'
import sgMail from '@sendgrid/mail'
import notificationService from '../services/notificationService.js'

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@techstore.com'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY)
}

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (String(message).length < 10) {
      return res.status(400).json({ message: 'Message is too short' })
    }

    // Store the message
    const result = await query(
      `INSERT INTO contact_messages (name, email, subject, message, status)
       VALUES ($1, $2, $3, $4, 'new')
       RETURNING id, created_at`,
      [name, email, subject, message]
    )

    const saved = { id: result.rows[0].id, created_at: result.rows[0].created_at }

    // Notify admins in real-time
    notificationService.notifyNewContact({
      id: saved.id,
      name,
      email,
      subject,
      message,
      created_at: saved.created_at
    })

    // Send email if configured
    if (SENDGRID_API_KEY) {
      const mail = {
        to: SUPPORT_EMAIL,
        from: SUPPORT_EMAIL, // verified sender
        subject: `[Contact] ${subject}`,
        text: `New contact message\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
        html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong></p>
               <pre style="white-space:pre-wrap">${message}</pre>`
      }
      try {
        await sgMail.send(mail)
      } catch (err) {
        // Log but don't fail the request if email fails
        console.warn('SendGrid email failed:', err?.message || err)
      }
    }

    res.status(201).json({ message: 'Message received', id: saved.id })
  } catch (error) {
    next(error)
  }
}
