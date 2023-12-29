import { NextResponse } from "next/server"
import { Resend } from "resend"

import NewsLetterForm from "@/components/emails/newLetter"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "info@ecoassurance.ca",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      react: (NewsLetterForm) as unknown as React.ReactElement,
      headers: {
        'List-Unsubscribe': '<https://example.com/unsubscribe>',
      },
    })


    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
