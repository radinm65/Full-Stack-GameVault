interface ISignupValues {
  // Step 1 - Account Info
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Step 2 - Personal Info
  displayName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  gender: string;
  // Step 3 - Gaming Identity
  avatarUrl: string;
  bio: string;
}

export default ISignupValues;
