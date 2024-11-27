const article = {
  name: 'article',
  type: 'document',
  title: 'Article',
  fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 200,
        },
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }], // Assuming you have an 'author' schema
      },
      {
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          { type: 'block' },
          { type: 'image' }, // You can include images in the content
        ],
      },
      {
        name: 'resume',
        title: 'Resume',
        type: 'text',
      },
      {
        name: 'attachementName',
        title: 'Attatchment Name',
        type: 'string',
      },
      {
        name: 'attatchment',
        title: 'Attatchment',
        type: 'file',
      },
    ],
}

export default article