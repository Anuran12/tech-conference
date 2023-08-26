import React, { useEffect, useState } from 'react'

function Conferences() {
    let API = "https://gdscdev.vercel.app/api";
    const [data, setData] = useState([]);

    const fetchApiData = async (url) => {
        try {
            let result = await fetch(url);
            result = await result.json();
            setData(result.content.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchApiData(API);
    }, []);
    console.log(data)

  return (
    <div>
        <h2>Tech Conferences</h2>
        <div>
            {data.map(item => (
            <div key={item.id}>
                <img src={item.banner_image} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
            ))}
        </div>
        

    </div>

  )
}

export default Conferences