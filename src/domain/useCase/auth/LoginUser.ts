import { FirebaseAuthRepository } from "infrastructure/repositories/auth/authRepository";

interface FirebaseError extends Error {
    code?: string;
    customData?: any;
}

export class LoginUserUseCase {
    constructor(private authRepository: FirebaseAuthRepository) { }

    async execute(email: string, password: string): Promise<{ success: boolean } | void> {
        try {
            await this.authRepository.login(email, password);
        } catch (error: unknown) {
            if (this.isFirebaseError(error)) {
                if (error.code === 'auth/invalid-credential') {
                    throw new Error('auth.invalid_credential');
                }
            }
            throw new Error('common.something_went_wrong_please_try_again');
        }
    }

    private isFirebaseError(error: unknown): error is FirebaseError {
        return (error as FirebaseError).code !== undefined;
    }
}
