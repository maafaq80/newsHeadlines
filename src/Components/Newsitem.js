import React from 'react'
import { Button , Card } from 'react-bootstrap';


export default function Newsitem(props) {
   
    
        let {title,description,imageUrl,newsUrl,source,author,date}=props; 
        
        return (
   
    <Card>
      <Card.Img variant="top" src={imageUrl} />
       <Card.Body>  
       <Card.Title>{title}<span style={{left:'90%' , zIndex:'1'}} className="position-absolute top-0  translate-middle badge rounded-pill bg-danger">{source}<span className="visually-hidden">unread messages</span></span>
      </Card.Title>
       <Card.Text>
       {description} 
       <span className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></span>        
       </Card.Text>
       <Button href={newsUrl} target="_blank" variant="dark">Read more</Button>
       </Card.Body>
     </Card>
    
        )
    
}
