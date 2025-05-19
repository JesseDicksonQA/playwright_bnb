/**
 * Test data for contact form tests
 * This file contains data sets used for testing the contact form
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Valid contact form data sets
 */
export const validContactData: ContactFormData[] = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '12345678970',
    subject: 'General Inquiry',
    message: 'This is a test message for the contact form. Please ignore.'
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '98765432710',
    subject: 'Booking Question',
    message: 'I would like to know more about your booking process. This is a test message.'
  }
];

/**
 * Invalid contact form data sets (for negative testing)
 */
export const invalidContactData: ContactFormData[] = [
  {
    name: '',
    email: 'invalid-email',
    phone: '12345',
    subject: '',
    message: 'This is a test with invalid data.'
  }
];
