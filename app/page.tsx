import DeployButton from '../components/DeployButton'
import AuthButton from '../components/AuthButton'

import Header from '@/components/Header'
import { subscribe } from "../app/apis/actions"
export default async function Index() {




  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">


      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Newsletter</h2>
          <form action={subscribe} method="POST">
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <button className="rounded-md px-4 py-2 bg-btn-background border">Subscribe</button>
          </form>
          <p className="text-sm text-foreground/50">
            By subscribing you agree to our{' '}
            <a
              href="https://supabase.io/privacy"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://supabase.io/terms"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Terms of Service
            </a>
          </p>
          <p className="text-sm text-foreground/50">
            We will never share your email address with a third-party.
          </p>
          <p className="text-sm text-foreground/50">
            You can unsubscribe at any time.
          </p>






        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )
}
