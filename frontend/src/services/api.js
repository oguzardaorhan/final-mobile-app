import { API_BASE_URL } from '@env';
import axios from 'axios';


const BASE_URL = API_BASE_URL;

// Registration (photo upload dahil)
export const submitRegistration = async (data) => {
    try {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('contact', data.contact);
        formData.append('address', data.address);
        formData.append('caseDescription', data.caseDescription);

        if (data.photo) {
            formData.append('photo', {
                uri: data.photo.uri,
                name: data.photo.fileName || 'photo.jpg',
                type: data.photo.type || 'image/jpeg',
            });
        }

        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Registration submission failed:', error);
        throw new Error('Unable to submit registration. Please try again later.');
    }
};

// Case Entry (proof file yükleme)
export const submitCaseEntry = async ({ proofFile, isInCourt, isInPolice }) => {
    try {
        const formData = new FormData();

        formData.append('isInCourt', isInCourt);
        formData.append('isInPolice', isInPolice);

        if (proofFile) {
            formData.append('proofFile', {
                uri: proofFile.uri,
                name: proofFile.name || 'proof-file',
                type: proofFile.mimeType || 'application/octet-stream',
            });
        }

        const response = await axios.post(`${BASE_URL}/case-entry`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Case entry submission failed:', error);
        throw new Error('Unable to submit case entry. Please try again later.');
    }
};

// Agreement oluşturma
export const submitAgreement = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/agreement/create`, data);
        return response.data;
    } catch (error) {
        console.error('Agreement submission failed:', error);
        throw new Error('Unable to create agreement.');
    }
};

// Verify case
export const verifyCaseAPI = async (type, caseNumber) => {
    try {
        const response = await axios.post(`${BASE_URL}/verify-case`, {
            type,
            caseNumber,
        });
        return response.data;
    } catch (error) {
        console.error('Verification failed:', error);
        throw new Error(error.response?.data?.message || 'Verification failed.');
    }
};


export const fetchEducationalResources = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/resources`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching educational resources:', error);
        throw new Error('Unable to fetch educational resources.');
    }
};
