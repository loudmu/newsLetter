'use client'

import { useFormState, useFormStatus } from 'react-dom'


import { subscribe } from '@/app/apis/actions'
import { useEffect, useState } from 'react'
import { set } from 'zod'



const initialState = {

    message: '',
    success: false,

}

function SubmitButton() {

    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending} className="rounded-md px-4 py-2 bg-btn-background border">
            Subscribe
        </button>
    )
}

export default function FormSubmit() {

    const [emailInput, setEmailInput] = useState('')


    const [state, formAction] = useFormState(subscribe, initialState)
    console.log(state)
    useEffect(() => {


        setTimeout(() => {
            setEmailInput('')
        }, 3000)

    }
        , [state])

    return (
        <form action={formAction}>
            <label htmlFor="email">email</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmailInput(e.target.value)} value={emailInput} required className="rounded-md px-4 py-2 bg-inherit border mb-6" />
            <SubmitButton />
            {state.success && <p className={state.success ? `text-green-600` : `text-red-600s`}>{state.message}</p>}
        </form>
    )
}
