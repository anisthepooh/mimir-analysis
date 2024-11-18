import { Author } from '@/types/Author';
import { Faq } from '@/types/Faq';
import {createClient, groq} from 'next-sanity'

export async function getFaqs(): Promise<Faq[]> {
  const client = createClient({
    projectId: "8fzky4zl",
    dataset: "production",
    apiVersion: "1",
    })

    return client.fetch(
      groq`*[_type == "faq"]{
      _id,
      _createdAt,
      question,
      answer
      }`
    )

}

export async function getAuthors(): Promise<Author[]> {
  const client = createClient({
    projectId: "8fzky4zl",
    dataset: "production",
    apiVersion: "1",
    })

    return client.fetch(
      groq`*[_type == "author"]{
        _id,
        _createdAt,
        firstname,
        lastname,
        title,
        phone,
        mail,
        "image": image.asset->url,
        website
      }`
    );

}