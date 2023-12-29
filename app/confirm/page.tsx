import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default function Confirm({
    searchParams,
}: {
    searchParams: { id: string, email: string, locale: string }
}) {
    console.log(searchParams)


    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">


            <div className="flex flex-col gap-2">
                <p>
                    Thank you for subscribing to our newsletter.
                </p>
            </div>
        </div>

    )
}
