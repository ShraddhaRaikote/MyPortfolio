export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'metaTitle', title: 'Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'Meta Description', type: 'text' },
    { name: 'contactEmail', title: 'Contact Email', type: 'string' },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url' },
    { name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' },
    { name: 'twitterUrl', title: 'Twitter/X URL', type: 'url' },
  ],
};
