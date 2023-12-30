import {

  Link

} from '@react-email/components';
import * as React from 'react';

export type NewsLetterProps = {
  active: boolean;
  created_at: string;
  email: string;
  id: string;
  locale: "fr-ca" | "en-ca";
}[] | null

const NewsLetterForm = (subscriber: NewsLetterProps) => {
  const env = process.env.NODE_ENV
  const baseUrl = env === 'development' ? 'http://localhost:3000' : process.env.SITE_URL

  console.log(subscriber)

  if (!subscriber) return null
  const { id, locale } = subscriber[0]
  const url = `${baseUrl}/confirm?id=${id}&locale=${locale}`



  return <div>
    <h1> Subscription confirmation</h1>
    <p>
      From <strong>info</strong> at
    </p>
    <h2> Thank you</h2>
    <p>
      by clicking on the link below, you are confirming your subscription to our newsletter.
    </p>
    <br />
    <Link href={url}>Confirm subscription</Link>
  </div >


}


export default NewsLetterForm
