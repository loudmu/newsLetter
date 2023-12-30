'use server'
import { createClient } from '@/utils/supabase/server'

import { cookies } from 'next/headers'
import { NewsLetterProps } from '@/components/emails/newLetter'


import { z } from "zod"
import { Resend } from "resend"
import NewsLetterForm from '@/components/emails/newLetter'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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


export async function subscribe(prevState: {
  message: string,
  success: boolean,

},

  formData: FormData

) {



  const email = formData.get('email') as string;

  if (!schema.safeParse(email)) {
    return { message: 'invalid email adress', success: false }
  }

  try {
    const { data, error } = await insertSubscriber(email)
    if (error) {
      return { success: false, message: 'you are already subscribed' }

    }
    sendNewsLetter(data)
    revalidatePath('/')


    return { success: true, message: 'Please check your email for confirmation' }
  } catch (error) {

    return { success: false, message: 'your subsription have failed' }
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

  if (!subscriber) return null
  try {
    const data = await resend.emails.send({
      from: "me@to.you",


      to: subscriber[0].email,
      subject: "subscription confirmation",

      react: NewsLetterForm(subscriber),
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function confirmSubscriber(id: string) {
  const cookieStore = cookies()

  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .update({ active: true })
      .eq('id', id)
      .single()

    if (error) {
      return { success: false, error, message: 'Unable to confirm your subscription' }
    }
    return { success: true, data, message: 'You have successfully subscribed to our newsletter' }


  } catch (error: any) {

    throw new Error(error.message)




  }


}


export async function unsubscribe(id: string) {
  const cookieStore = cookies()

  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', id)
      .single()

    if (error) {
      return { success: false, error, message: 'Unable to unsubscribe' }
    }
    return { success: true, data, message: 'You have successfully unsubscribed from our newsletter' }
  }
  catch (error: any) {

    throw new Error(error.message)
  }
}