export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'string' },
    { name: 'endDate', title: 'End Date', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'order', title: 'Sort Order', type: 'number' },
  ],
  orderings: [{ title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};
