function isProfessionalEmail(email) {
    const freeEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|aol|icloud|protonmail|zoho|yandex|gmx)\.[a-z]{2,3}(\.[a-z]{2})?$/;
    return !freeEmailRegex.test(email);
  }
  
  // Test the function
  console.log(isProfessionalEmail("user@gmail.com"));  // false (not professional)
  console.log(isProfessionalEmail("user@company.com")); // true (professional)
  console.log(isProfessionalEmail("user@domain.co.uk")); // true (professional)
  