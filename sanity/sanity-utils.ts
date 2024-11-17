import {createClient, groq} from 'next-sanity'

export async function getFaqs() {
  const client = createClient({
    projectId: "8fzky4zl",
    dataset: "production",
    apiVersion: "1",
    })

    return client.fetch(
      groq`*[_type == "faq"]{
      _id,
      _created_at,
      question,
      answer
      }`
    )

}