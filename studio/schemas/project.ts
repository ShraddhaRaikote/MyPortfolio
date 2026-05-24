export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    { name: 'summary', title: 'Summary', type: 'text' },
    { name: 'body', title: 'Body', type: 'text' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'tech', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] },
    { name: 'liveUrl', title: 'Live URL', type: 'url' },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url' },
    { name: 'featured', title: 'Featured', type: 'boolean' },
    { name: 'order', title: 'Sort Order', type: 'number' },
  ],
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};
