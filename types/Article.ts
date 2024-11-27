import { PortableTextBlock } from "next-sanity";

export type Article = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  publishedAt: Date;
  authorImage: string;
  authorFirstname: string;
  authorLastname: string;
  authorTitle: string;
  coverImage: string;
  content: PortableTextBlock[];
  resume: string;
  attachementName: string;
  attatchment: string;
}