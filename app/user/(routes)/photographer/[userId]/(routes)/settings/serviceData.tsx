'use server'

import axios from 'axios'

export const fetchCategories = async() => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/getallcategories`);
        return res.data;
    } catch (e) {
        console.log("Error fetching photographer categories");
        throw e;
    }
} 

export const updateCategories = async (selectedCategories: string[] ,userId:string|string[]) => {
    try{
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}/categories`, {
            category: selectedCategories,
        });
    }catch(e){
        console.log("Error updating photographer categories");
        throw e;
    }
}

export const fetchUserId = async(userId:string|string[]) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${userId}`);
        return res.data.category;

    }catch(e){
        console.log("Error fetching user id");
        throw e;
    }
}