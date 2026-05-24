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
    {
      name: 'homeWelcomeText',
      title: 'Home Welcome Text',
      type: 'string',
      initialValue: 'Welcome',
    },
    {
      name: 'homeStoryEyebrow',
      title: 'Home Story Eyebrow',
      type: 'string',
      initialValue: 'My Story',
    },
    {
      name: 'homeStoryTitle',
      title: 'Home Story Title',
      type: 'string',
      initialValue: 'Who I am',
    },
    {
      name: 'projectsPageTitle',
      title: 'Projects Page Title',
      type: 'string',
      initialValue: 'My Projects',
    },
    {
      name: 'contactPageTitle',
      title: 'Contact Page Title',
      type: 'string',
      initialValue: "Let's connect",
    },
  ],
};
