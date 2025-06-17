import { Article } from '@/types/Article';
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

export async function getArticles(): Promise<Article[]> {
  const client = createClient({
    projectId: "8fzky4zl",
    dataset: "production",
    apiVersion: "1",
    })

    return client.fetch(
      groq`*[_type == "article"] | order(publishedAt desc){
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        publishedAt,
        "authorImage": author->image.asset->url,
        "authorFirstname": author->firstname,
        "authorLastname": author->lastname,
        "authorTitle": author->title,
        "coverImage": coverImage.asset->url,
        content,
        resume,
        attachementName,
        "attatchment": attatchment->url,
      }`
    );
}

export async function getLatestArticles(limit: number = 2): Promise<Article[]> {
  const client = createClient({
    projectId: "8fzky4zl",
    dataset: "production",
    apiVersion: "1",
    })

    return client.fetch(
      groq`*[_type == "article"] | order(publishedAt desc)[0...${limit}]{
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        publishedAt,
        "authorImage": author->image.asset->url,
        "authorFirstname": author->firstname,
        "authorLastname": author->lastname,
        "authorTitle": author->title,
        "coverImage": coverImage.asset->url,
        content,
        resume,
        attachementName,
        "attatchment": attatchment->url,
      }`
    );
} 

export async function getArticle(slug: string): Promise<Article> {

  const client = createClient({
    projectId: "8fzky4zl",
    dataset: "production",
    apiVersion: "1",
    })

    return client.fetch(
      groq`*[_type == "article" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        publishedAt,
        "authorImage": author->image.asset->url,
        "authorFirstname": author->firstname,
        "authorLastname": author->lastname, 
        "authorTitle": author->title,
        "coverImage": coverImage.asset->url,
        content,
        resume,
        attachementName,
        attatchment
      }`,
      {slug}
    );

}