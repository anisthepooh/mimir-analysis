import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { CalendarDays, Link, Mail, MailIcon, Phone } from 'lucide-react'
import React from 'react'

const ContactCard = ({author}: {author: any}) => {
  return (
    <Card className="flex gap-4 p-8 w-full">
    <Avatar>
      {author.image ? (
        <AvatarImage src={author.image} alt={`${author.firstname} ${author.lastname}`} />
      ) : (
        <AvatarFallback>
          {author.firstname[0]}
          {author.lastname[0]}
        </AvatarFallback>
      )}
    </Avatar>
    <div className="">
      <h4 className="text-sm font-semibold">
        {author.firstname} {author.lastname}
      </h4>
      <p className="text-sm font-medium text-muted-foreground">{author.title}</p>
      <div className="flex items-center pt-2 gap-2">
        <Phone size={12} className='text-muted-foreground' /> 
        <p className="text-sm">{author.phone}</p>
      </div>
      <div className="flex items-center pt-2 gap-2">
        <MailIcon size={12} className='text-muted-foreground' /> 
        <p className="text-sm">{author.mail}</p>
      </div>
      <div className="flex items-center pt-2 gap-2">
        <Link size={12} className='text-muted-foreground' /> 
        <a href={author.website} className="text-sm text-blue-500 hover:underline">
          {author.website}
        </a>
      </div>
    </div>
  </Card>
  )
}

export default ContactCard