import Text from '@components/atoms/Text';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { View } from 'react-native';

interface APIContextProps {
    isLoading: boolean;
    uiData: string;
    initSession: () => Promise<void>;
    simulateLoading: () => Promise<void>;
    resetContext: () => void;
    storeData: (name: string, value: string) => Promise<void>;
    submitRequest: () => Promise<void>;
    sessionId: string;

}

interface ComponentData {
    // Add any specific properties your dynamic components expect
    type: string;
    props?: Record<string, any>;
}

const APIContext = createContext<APIContextProps | undefined>(undefined);

export const APIProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uiData, setUiData] = useState('');

    const [sessionId, setSessionId] = useState('');
    const [formData, setFormData] = useState({});

    //let formData: Record<string, string> = {}

    useEffect(() => {
        initSession()
    }, [])


    const simulateLoading = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }
            , 4000);
    };
    const resetContext = () => {
        setUiData('');
    }


    const initSession = async () => {
        try {
            setSessionId('');
            setIsLoading(true);
            const response = await fetch('https://api.lab49-james-ai-comp-du-temp.com/api/talk/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'NEW',
                    session_id: 'NEW'
                })
            });
            const data = await response.json();

            // Reset state before setting new UI data
            setFormData({});
            setSessionId(data.session_id);

            console.log(data.message);
            // Use a slight delay to ensure proper re-rendering
            // This forces React to see the component as "new" even if structure is similar
            setUiData('');
            // setTimeout(() => {
            //     //setUiData(data.message);
            // }, 10);
        } catch (error) {
            console.log('ERROR')
            console.error('Error fetching UI data:', error);
            setUiData('');
        } finally {
            setIsLoading(false);
        }
    };

    const storeData = async (name: string, value: string) => {
        console.log('storeData', name, value);
        // formData[name] = value;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitRequest = async () => {
        console.log('JSON.stringify(formData):', JSON.stringify(formData))
        setIsLoading(true);
        try {
            console.log('will handleSubmit with data', formData);
            const response = await fetch('https://api.lab49-james-ai-comp-du-temp.com/api/talk/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: JSON.stringify(formData),
                })
            });
            const data = await response.json();
            console.log(data.message, '<<<<');
            // Reset form data
            setFormData({});

            // Force re-render with empty state briefly to clean the component tree and 
            // ensure state is reset
            setUiData('');
            setTimeout(() => {
                setUiData(data.message);
            }, 10);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <APIContext.Provider value={{ isLoading, uiData, sessionId, submitRequest, storeData, resetContext, initSession, simulateLoading }}>
            {children}
        </APIContext.Provider>
    );
};

export const useAPI = () => {
    const context = useContext(APIContext);
    if (!context) throw new Error('useAPI must be used within a APIProvider');
    return context;
};
