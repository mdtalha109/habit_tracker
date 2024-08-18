import { FirebaseAuthRepository } from "infrastructure/repositories/auth/authRepository";

interface FirebaseError extends Error {
  code?: string;
  customData?: any; 
}

export class RegisterUserUseCase {
  constructor(private userRepository: FirebaseAuthRepository) {}

  async execute(email: string, username: string, password: string): Promise<{ success: boolean } | void> {
    try {
      await this.userRepository.createUser(username, email, password);
      return { success: true };
    } catch (error: unknown) {
      if (this.isFirebaseError(error)) {
        if (error.code === 'auth/email-already-in-use') {
          throw new Error('auth.email_is_already_in_used');
        }
        throw new Error('common.something_went_wrong_please_try_again');
      } else {
        console.error('Unexpected error:', error);
        throw new Error('common.something_went_wrong_please_try_again');
      }
    }
  }

  private isFirebaseError(error: unknown): error is FirebaseError {
    return (error as FirebaseError).code !== undefined;
  }
}