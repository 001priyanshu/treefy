import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import jsPDF from 'jspdf'
import ("./PostDetails.css")
export const PostDetails = () => {
    console.log("Hiii");
    const { id } = useParams();
    // console.log("id",id);
    const [post, setPost] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/postDetails/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => { 
                return res.json();
            }) 
            .then((r) => {     
                return r;
            })
            .then((po)=>{
                setPost(po.post);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
     const generatePDF = () => {
         var doc = new jsPDF("p","pt","a4");
         doc.html(document.querySelector("#downpdf"),{
            callback: function(pdf){
                pdf.save("mypdf.pdf");
            }
         });
     };
    return (
        <div id='downpdf' className='post-details-container'>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
            <img src={post.photo} />
          <button onClick={generatePDF} type="primary">Generate PDF</button>
        </div>
    )
}