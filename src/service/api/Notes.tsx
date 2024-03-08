import http from ".";
// import { useNavigate } from "react-router-dom";

interface Note {
    _id: string; // Assuming your API returns "_id" instead of "_Id"
    title: string;
    notes: string;
    isActive: boolean;
}

type ApiResponse = Note[];
// const navigate = useNavigate()

export const getNotes = async (PaginationData:number,searchNotesData:string) => {    
    try {
        if(PaginationData&&searchNotesData){
            console.log();
            
            const response = await http.get<ApiResponse>(`all-notes?page=${PaginationData}&notes=${searchNotesData}`);
            return response.data;
        }else{
            const response = await http.get<ApiResponse>(`all-notes?page=${PaginationData}`);
            return response.data;  
        }
    } catch (error:any) {
        console.log('Error fetching notes:', error);
        if(error.response.data.message){
        }
        throw error;
    }
}

export const singleNotes = async (id:string) => {    
    try {
        const response = await http.get<ApiResponse>(`/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching notes:', error);
        throw error;
    }
}

export const deleteNotes = async (id:string) => {    
    try {
        const response = await http.delete<ApiResponse>(`/delete-notes/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching notes:', error);
        throw error;
    }
}

export const updateNotes = async (id:string,payload:{}) => {    
    try {
        const response = await http.put<ApiResponse>(`/update-notes/${id}`,payload);
        return response.data;
    } catch (error) {
        console.log('Error fetching notes:', error);
        throw error;
    }
} 

export const addNotes = async (payload:{}) => {    
    try {
        const response = await http.post<ApiResponse>('/add-notes',JSON.stringify(payload));
        return response.data;
    } catch (error) {
        console.log('Error fetching notes:', error);
        throw error;
    }
}

export const loginUser = async (payload:{}) => {    
    try {
        const response = await http.post<ApiResponse>('/login',JSON.stringify(payload));
        return response.data;
    } catch (error) {
        console.log('Error fetching notes:', error);
        throw error;
    }
}

export const signUser = async (payload:{}) => {    
    try {
        const response = await http.post<ApiResponse>('/signup',JSON.stringify(payload));        
        return response.data;
    } catch (error) {
        console.log('Error fetching notes:', error);
        throw error;
    }
}

export const getUserInfo = async () => {    
    try {
        const response = await http.get<ApiResponse>('/info');
        return response.data;
    } catch (error) {
        console.log('Error fetching notes:', error);
        throw error;
    }
}
