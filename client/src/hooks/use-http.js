import React, { useState, useCallback } from 'react'


export default function useHttp() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        try {
            setIsLoading(true);
            setError(null);


            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: { 'Content-Type': 'application/json' },
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            }
            );

            // const response = await axios.post(requestConfig.url, requestConfig.body)

            if (!response.ok) {
                throw new Error("Request Failed");
            }  else {
                const data = await response.json();
                applyData(data);
            }


        } catch (error) {
            throw new Error(error);
        }

        setIsLoading(false);
    }, []);

    return { isLoading, error, sendRequest };
}
