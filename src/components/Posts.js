import React, { useEffect, useState } from 'react'
import { useLinkClickHandler, useNavigate, Link } from 'react-router-dom';
import('./Post.css')

const postDescripton = (p, i) => {
    console.log("Inside post description");
    console.log("p", p);
    console.log("p", i);

}

const Posts = () => {
    const user = localStorage.getItem("jwt");
    console.log("inside posts");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/allposts", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((result) => {
                return result.posts;
            })
            .then((r) => {
                console.log("r", r );
               
                setData(r);

            })


            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            
            <div className='image-container'>


                {data && data.map((p, i) => (
                   <Link to={`/post/${p._id}`}>
                   <img className='post-image' src={p.photo} onClick={() => postDescripton(p, i)} />
                   
                   </Link>
                ))}

            </div>
        </div>
    )
}

export default Posts