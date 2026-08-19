'use client'

import { CaptchaScript, getCaptchaToken } from '@/components/captcha/captcha'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Spinner } from '@/components/ui/spinner'
import { getAppointmentDates, getAppointmentTeachers, registerAppointment } from '@/lib/api'
import { toEventLocalDateTime } from '@/lib/dates'
import type { AppointmentDate, AppointmentHost, AppointmentRequest, AppointmentType } from '@/lib/models'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type ChangeEvent, type SubmitEvent, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  types: AppointmentType[]
}

type FormDataEntries = Omit<AppointmentRequest, 'captchaToken'>

export function PostParentsRegistrationForm({ types }: Props) {
  const t = useTranslations('request')
  const [submitting, setSubmitting] = useState(false)

  const [type, setType] = useState('')

  const [teacher, setTeacher] = useState('')
  const [teachers, setTeachers] = useState<AppointmentHost[]>([])
  const [teachersLoading, setTeachersLoading] = useState(false)

  const [date, setDate] = useState('')
  const [dates, setDates] = useState<AppointmentDate[]>([])
  const [datesLoading, setDatesLoading] = useState(false)
  const [registeredDates, setRegisteredDates] = useState<number[]>([])
  const availableDates = dates.filter((x) => !registeredDates.includes(x.id))

  const handleTypeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value

    setTeachersLoading(true)
    setType(newType)
    setTeacher('')
    setTeachers([])
    setDate('')
    setDates([])

    try {
      setTeachers(await getAppointmentTeachers(newType))
    } catch {
      toast.error(t('serverError'))
    } finally {
      setTeachersLoading(false)
    }
  }

  const handleTeacherChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newTeacher = e.target.value

    setDatesLoading(true)
    setTeacher(newTeacher)
    setDate('')
    setDates([])

    try {
      setDates(await getAppointmentDates(type, newTeacher))
    } catch {
      toast.error(t('serverError'))
    } finally {
      setDatesLoading(false)
    }
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const response = await registerAppointment({
        ...Object.fromEntries(formData.entries()) as unknown as FormDataEntries,
        captchaToken: await getCaptchaToken('parents'),
      })

      if ('errors' in response) {
        toast.error(response.errors.map((x) => x.reason).join('; '))
        return
      }

      toast.success('Registracija sėkminga', {
        description: `${response.hostName} @ ${toEventLocalDateTime(response.date, 'lt')}`,
      })
      setRegisteredDates((x) => [...x, response.dateId])
      setTeacher('')
      setDate('')
    } catch {
      toast.error(t('serverError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <CaptchaScript />

      <form onSubmit={handleSubmit}>
        <FieldGroup>

          <Field>
            <FieldLabel htmlFor="reg-type">Tipas *</FieldLabel>
            <NativeSelect
              id="reg-type"
              name={'typeId' satisfies keyof FormDataEntries}
              onChange={handleTypeChange}
              value={type}
              required
            >
              <NativeSelectOption disabled hidden />
              {types.map((x) => (
                <NativeSelectOption key={x.id} value={x.id}>
                  {x.description}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-teacher">Mokytojas *</FieldLabel>
            <NativeSelect
              id="reg-teacher"
              name={'hostId' satisfies keyof FormDataEntries}
              className={clsx({ 'cursor-wait': teachersLoading })}
              disabled={!type || teachersLoading}
              onChange={handleTeacherChange}
              value={teacher}
              required
            >
              <NativeSelectOption disabled hidden />
              {teachers.map((x) => (
                <NativeSelectOption key={x.id} value={x.id}>
                  {x.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-date">Laikas *</FieldLabel>
            <NativeSelect
              id="reg-date"
              name={'dateId' satisfies keyof FormDataEntries}
              className={clsx({ 'cursor-wait': datesLoading })}
              disabled={!teacher || datesLoading}
              onChange={(x) => setDate(x.target.value)}
              value={date}
              required
            >
              <NativeSelectOption disabled hidden />
              {availableDates.length === 0 && (
                <NativeSelectOption disabled>Laisvo laiko nėra</NativeSelectOption>
              )}
              {availableDates.map((x) => (
                <NativeSelectOption key={x.id} value={x.id}>
                  {toEventLocalDateTime(x.date, 'lt')}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-name">Jūsų vardas *</FieldLabel>
            <Input
              id="reg-name"
              name={'name' satisfies keyof FormDataEntries}
              autoComplete="name"
              maxLength={256}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-note">Vaiko vardas, pavardė ir klasė *</FieldLabel>
            <Input
              id="reg-note"
              name={'note' satisfies keyof FormDataEntries}
              autoComplete="on"
              maxLength={256}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-email">El. paštas (@gmail.com) *</FieldLabel>
            <Input
              id="reg-email"
              type="email"
              name={'email' satisfies keyof FormDataEntries}
              autoComplete="email"
              maxLength={256}
              pattern=".+@gmail.com"
              required
            />
          </Field>

          <Button
            type="submit"
            variant="outline"
            disabled={submitting}
          >
            {submitting ? <Spinner /> : 'Registruotis'}
          </Button>

        </FieldGroup>
      </form>
    </>
  )
}