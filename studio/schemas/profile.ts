export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'title', title: 'Job Title', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'shortBio', title: 'Short Bio', type: 'text' },
    { name: 'fullBio', title: 'Full Bio', type: 'text' },
    { name: 'avatar', title: 'Avatar', type: 'image' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'yearsExp', title: 'Years of Experience', type: 'number' },
    { name: 'openToWork', title: 'Open to Work', type: 'boolean' },
  ],
};
