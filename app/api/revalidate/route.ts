import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the webhook secret from environment variables
    const secret = process.env.REVALIDATE_SECRET
    const providedSecret = request.nextUrl.searchParams.get('secret')

    // Verify the secret
    if (!secret || providedSecret !== secret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Get the webhook payload to determine what to revalidate
    const body = await request.json()
    const documentType = body._type

    // Revalidate based on document type
    switch (documentType) {
      case 'article':
        // Revalidate all articles pages
        revalidatePath('/[locale]/articles', 'page')
        revalidatePath('/[locale]/articles/[article]', 'page')
        console.log('Revalidated article pages')
        break
      
      case 'faq':
        // Revalidate FAQ page
        revalidatePath('/[locale]/faq', 'page')
        console.log('Revalidated FAQ page')
        break
      
      case 'author':
        // Revalidate contact page and article pages (as they include author info)
        revalidatePath('/[locale]/contact', 'page')
        revalidatePath('/[locale]/articles', 'page')
        revalidatePath('/[locale]/articles/[article]', 'page')
        console.log('Revalidated contact and article pages')
        break
      
      default:
        // Revalidate all pages for unknown document types
        revalidatePath('/[locale]/articles', 'page')
        revalidatePath('/[locale]/articles/[article]', 'page')
        revalidatePath('/[locale]/faq', 'page')
        revalidatePath('/[locale]/contact', 'page')
        console.log('Revalidated all CMS-dependent pages')
    }

    return NextResponse.json({ 
      message: 'Revalidation successful',
      documentType,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating' }, 
      { status: 500 }
    )
  }
}