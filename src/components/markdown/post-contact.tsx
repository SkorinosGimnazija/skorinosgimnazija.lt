import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type LucideIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { type ReactNode } from 'react'

interface Props {
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  children?: ReactNode;
}

export async function PostContact({ children, name, phone, email, description }: Props) {
  const t = await getTranslations('contacts')

  return (
    <Card className="shadow-sm border mb-5 text-base md:text-lg">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ContactLine icon={PhoneIcon} name={t('phone')} value={phone} />
        <ContactLine icon={MailIcon} name={t('email')} value={email} />
        {children}
      </CardContent>
    </Card>
  )
}

interface ContactLineProps {
  icon: LucideIcon;
  name: string;
  value?: string;
}

function ContactLine({ icon: Icon, name, value }: ContactLineProps) {
  if (!value) return null

  return (
    <p>
      <Icon className="inline size-5 mr-1" />
      <span className="select-none">{name}: </span><span className="break-all">{value}</span>
    </p>
  )
}