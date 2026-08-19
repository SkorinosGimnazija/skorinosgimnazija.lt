'use client'

import { CaptchaScript, getCaptchaToken } from '@/components/captcha/captcha'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { reportBully } from '@/lib/api'
import type { BullyRequest } from '@/lib/models'
import { useTranslations } from 'next-intl'
import { type SubmitEvent, useState } from 'react'
import { toast } from 'sonner'

type FormDataEntries = Omit<BullyRequest, 'captchaToken'>

export function PostBullyReport() {
  const t = useTranslations('request')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const response = await reportBully({
        ...Object.fromEntries(formData.entries()) as unknown as FormDataEntries,
        captchaToken: await getCaptchaToken('bullies'),
      })

      if ('errors' in response) {
        toast.error(response.errors.map((x) => x.reason).join('; '))
        return
      }

      toast.success('Sėkmingai pranešta')
      form.reset()
    } catch {
      toast.error(t('serverError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <CaptchaScript />

      <Card className="mx-auto w-150 max-w-full shadow-md border mt-6">
        <CardHeader>
          <CardTitle className="text-center">Pranešti apie patyčias</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="bully-victimName">Kas patyrė patyčias? *</FieldLabel>
                <Input
                  id="bully-victimName"
                  name={'victimName' satisfies keyof FormDataEntries}
                  autoComplete="off"
                  maxLength={256}
                  placeholder="Vardas, Pavardė, klasė"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bully-bullyName">Kas tyčiojosi? *</FieldLabel>
                <Input
                  id="bully-bullyName"
                  name={'bullyName' satisfies keyof FormDataEntries}
                  autoComplete="off"
                  maxLength={256}
                  placeholder="Vardas, Pavardė, klasė"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bully-observers">Kas stebėjo patyčias?</FieldLabel>
                <Input
                  id="bully-observers"
                  name={'observers' satisfies keyof FormDataEntries}
                  autoComplete="off"
                  maxLength={256}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bully-location">Kur įvyko patyčios? *</FieldLabel>
                <Input
                  id="bully-location"
                  name={'location' satisfies keyof FormDataEntries}
                  autoComplete="off"
                  maxLength={256}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bully-date">Kada įvyko patyčios? *</FieldLabel>
                <Input
                  id="bully-date"
                  type="date"
                  name={'date' satisfies keyof FormDataEntries}
                  autoComplete="off"
                  maxLength={256}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bully-details">Papasakok plačiau, kas nutiko *</FieldLabel>
                <Textarea
                  id="bully-details"
                  name={'details' satisfies keyof FormDataEntries}
                  autoComplete="off"
                  rows={3}
                  maxLength={1024}
                  required
                />
              </Field>

              <Button
                type="submit"
                variant="outline"
                disabled={submitting}
              >
                {submitting ? <Spinner /> : 'Siųsti pranešimą'}
              </Button>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  )
}