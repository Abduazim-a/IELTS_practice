import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { mockUsers, adminNumbers } from '../data/mockData';

export const validatePhoneNumber = async (phoneNumber: string): Promise<boolean> => {
  try {
    // For MVP, check against mock data and admin numbers
    const isValidUser = mockUsers.some(user => user.phoneNumber === phoneNumber);
    const isAdmin = adminNumbers.includes(phoneNumber);
    
    return isValidUser || isAdmin;
  } catch (error) {
    console.error('Phone validation error:', error);
    return false;
  }
};

export const getUserData = async (phoneNumber: string) => {
  try {
    // For MVP, return mock data
    const user = mockUsers.find(user => user.phoneNumber === phoneNumber);
    
    if (user) {
      return user;
    }
    
    // Check if it's an admin number
    if (adminNumbers.includes(phoneNumber)) {
      return {
        phoneNumber,
        name: 'Admin',
        surname: 'User',
        isAdmin: true,
        deviceCount: 1,
        createdAt: new Date()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Get user data error:', error);
    return null;
  }
};

export const registerDevice = async (phoneNumber: string): Promise<boolean> => {
  try {
    // For MVP, simulate device registration
    // In production, this would call the Firebase Function
    const deviceId = generateDeviceId();
    
    console.log('Registering device:', { phoneNumber, deviceId });
    
    // Simulate successful registration
    return true;
  } catch (error) {
    console.error('Device registration error:', error);
    return false;
  }
};

const generateDeviceId = (): string => {
  // Simple device ID generation for MVP
  const userAgent = navigator.userAgent;
  const timestamp = Date.now();
  return btoa(`${userAgent}-${timestamp}`).slice(0, 32);
};