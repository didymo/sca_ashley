/**
 * App-level configuration
 */

export const Config = {

  // Whether to display debug info
  debug: true,

  // Fake error. Turn on to simulate server error
  error: false,

  // API related
  api:
  {
    auth:
    {
      base64: 'ZnJvbnRlbmQ6cmVzdDEyMw=='
    },

    // URLs
    questionGet:  'http://bluemaxstudios.com/questionnaire/questions?_format=json',
    questionPost: 'http://bluemaxstudios.com/questionnaire/submit?_format=json'
  }
};
