import { PostParentsRegistrationForm } from '@/components/markdown/post-parents-registration-form'
import { Card, CardContent } from '@/components/ui/card'
import { getAppointmentTypes } from '@/lib/api'

export async function PostParentsRegistration() {
  const types = await getAppointmentTypes()

  return (
    <Card className="mx-auto w-125 max-w-full shadow-md border mt-6">
      <CardContent>
        {types.length ?
          <PostParentsRegistrationForm types={types} /> :
          <div className="text-center text-base">Registracijos laikas baigėsi</div>
        }
      </CardContent>
    </Card>
  )
}