'use server'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'
import { NewsLetterProps } from '@/components/emails/newLetter'


import { z } from "zod"
import { Resend } from "resend"
import NewsLetterForm from '@/components/emails/newLetter'
// import { resendAPI } from '@/utils/resendAPI'
const resend = new Resend(process.env.RESEND_API_KEY)
const schema = z.object({
  email: z.string().email(),
})

type Schema = z.infer<typeof schema>

export async function getUserByEmail(email: string) {
  const cookieStore = cookies()

  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('subscribers')
    .select()
    .eq('email', email)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}


export async function subscribe(formData: FormData) {


  const email = formData.get('email') as string;

  if (!schema.safeParse(email)) {
    return "Invalid email"
  }

  try {
    const { data, error } = await insertSubscriber(email)
    if (error) {
      throw error;
    }
    sendNewsLetter(data)
    return { success: true, data, message: 'You have successfully subscribed to our newsletter' }
  } catch (error) {
    console.error('Error inserting subscriber:', error)
    return { error: 'Unable to subscribe' }
  }

}

async function insertSubscriber(email: string) {
  const cookieStore = cookies()

  const supabase = createClient(cookieStore);

  return supabase
    .from('subscribers')
    .insert([
      {
        email,
        locale: "en-ca"
      }
    ])
    .select()

}





export async function sendNewsLetter(subscriber: NewsLetterProps) {
  // console.log(2, subscriber)
  try {
    const data = await resend.emails.send({
      from: "info@ecoassurance.ca",


      to: "loudmu@gmail.com",
      subject: "Contact form submission",

      react: NewsLetterForm(subscriber),
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}






