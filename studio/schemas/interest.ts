export default {
  name: 'interest',
  title: 'Interest',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    {
      name: 'icon',
      title: 'Material Symbol Name',
      type: 'string',
      description: 'Google Material Symbols name, e.g. palette, architecture, terminal, cloud',
    },
    { name: 'order', title: 'Sort Order', type: 'number' },
  ],
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};
