export type NewsLetterProps = {
  active: boolean;
  created_at: string;
  email: string;
  id: string;
  locale: "fr-ca" | "en-ca";
}[] | null
import Link from "next/link";
const NewsLetterForm = (subscriber: NewsLetterProps) => {
  console.log(11, subscriber)
  if (!subscriber) return null

  const url = new URL(window.location.href)
  console.log(22, url)

  console.log(url)

  return <div>
    <h1> Confirmation de suscription </h1>
    <p>
      From <strong>info</strong> at
    </p>
    <h2> merci</h2>
    <p>
      en clickant sur le lien vous confirmez votre suscription à notre newsletter.
      veuillez cliquer sur le lien suivant pour confirmer votre suscription
      <Link href={{
        pathname: '/confirm',
        query: { id: subscriber[0].id, email: subscriber[0].email, locale: subscriber[0].locale },


      }}>confirmer</Link>


    </p>
  </div>


}

export default NewsLetterForm
