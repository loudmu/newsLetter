import Link from 'next/link'
// import { headers, cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/server'

import { confirmSubscriber } from "../apis/actions"

// import { redirect } from 'next/navigation'


export default async function Confirm({
    searchParams,
}: {
    searchParams: { id: string, email: string, locale: string }
}) {
    const id = searchParams.id
    const { message, success } = await confirmSubscriber(id)

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">


            <div className="flex flex-col gap-2">
                {success && <div className="text-green-500">
                    {message}
                    <Link href="/" className='text-blue-500'>
                        ok
                    </Link>
                </div>}
                {!success && <div className="text-red-500">
                    {message}
                    <Link href="/" className='text-blue-500'>
                        ok
                    </Link>
                    <div className="text-gray-500">
                        <Link href={`/confirm?id=${id}&email=${searchParams.email}&locale=${searchParams.locale}`}>

                            Resend confirmation email

                        </Link>
                    </div>
                </div>}

            </div>
        </div>



    )
}
