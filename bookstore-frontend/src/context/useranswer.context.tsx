// app/contexts/UserAnswersContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserAnswersContextType {
    userAnswers: Record<number, string>;
    setUserAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

const UserAnswersContext = createContext<UserAnswersContextType | undefined>(undefined);

export const UserAnswersProvider = ({ children }: { children: ReactNode }) => {
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

    return (
        <UserAnswersContext.Provider value={{ userAnswers, setUserAnswers }}>
            {children}
        </UserAnswersContext.Provider>
    );
};

export const useUserAnswers = () => {
    const context = useContext(UserAnswersContext);
    if (!context) {
        throw new Error('useUserAnswers must be used within a UserAnswersProvider');
    }
    return context;
};

