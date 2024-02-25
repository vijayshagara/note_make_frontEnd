import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './pagination.css'
import { getNotes } from '../../../service/api/Notes';
import { useEffect } from 'react';

export default function BasicPagination(props: { setNotesData: Function,searchNotesData:string  }) {
    const { setNotesData,searchNotesData } = props    

    useEffect(() => {
        handlePagination(1);
    }, []);

    const searchData = async()=>{
        if(searchNotesData){
            try {
                const response = await getNotes(1,searchNotesData);
                response
                if (response && Array.isArray(response)) {
                    setNotesData(response);
                } else {
                    console.log('Invalid response:', response);
                }
            } catch (error) {
                console.log('Error fetching notes:', error);
            }
        }else{
            try {
                const response = await getNotes(1,'');
                if (response && Array.isArray(response)) {
                    setNotesData(response);
                } 
            } catch (error) {
                console.log('Error fetching notes:', error);
            }
        }
    }    

    useEffect(() => {
        const timeOut =setTimeout(()=>{
            searchData()
        },1000)
        return ()=>clearTimeout(timeOut)
    }, [searchNotesData]);

    const handlePagination = async (pageNumber: number) => {
        try {
            const response = await getNotes(pageNumber,'');
            if (response && Array.isArray(response)) {
                setNotesData(response);
            } else {
                console.log('Invalid response:', response);
            }
        } catch (error) {
            console.log('Error fetching notes:', error);
        }
    }

    return (
        <div className='footer'>
        <Stack className='page' spacing={10}>
            <Pagination count={10} onChange={(_, page) => handlePagination(page)} color="primary" />
        </Stack>
        </div>
    );
}