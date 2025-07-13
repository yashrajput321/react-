import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'

const GitHub = () => {

    const data = useLoaderData();
    // const [data,setData] = useState([]);
    // useEffect(() => {
    //     // Simulating a GitHub API call
    //     const fetchGitHubData = async () => {
    //         try {
    //             fetch('https://api.github.com/users/yashrajput321',{
    //                 headers: {
    //                     "Authorization": "API_Token",  
    //                 }
    //             })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //                 setData(data);
    //             });
    //         } catch (error) {
    //             console.error('Error fetching GitHub data:', error);
    //         }
    //     };
    //     fetchGitHubData();
    // }, []);
    return (
        <>
        <div className='text-center m-4 bg-gray-700 text-white p-4 text-3xl' >
            <p>GitHub Followers: {data.followers}</p>
        <img src={data.avatar_url} alt="Git Picture" className=' w-[300px] border-2 border-white' />
        </div>
        </>
    )
}

export default GitHub

export const GitHubInfoLoader = async ()=>{
    const response = await fetch('https://api.github.com/users/yashrajput321',{
        headers: {
            "Authorization": "API_Token",  
        }
    });
    return response.json();
}