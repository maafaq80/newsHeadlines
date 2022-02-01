import React, { Component } from 'react'
import { Button , Card } from 'react-bootstrap';


export default class Newsitem extends Component {
   
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source}=this.props; 
        
        return (
    <div>
    <Card>
      <Card.Img variant="top" src={imageUrl}/>
       <Card.Body>  
       <Card.Title>{title}<span style={{left:'90%' , zIndex:'1'}} class="position-absolute top-0  translate-middle badge rounded-pill bg-danger">{source}<span class="visually-hidden">unread messages</span></span>
      </Card.Title>
       <Card.Text>
       {description}   
       <p className="card-text"><small className="text-muted">By {!author?"Unknown":author}  on {new Date(date).toGMTString()}</small></p>         
       </Card.Text>
       <Button href={newsUrl} target="_blank" variant="dark">Read more</Button>
       </Card.Body>
     </Card>
    </div>
        )
    }
}
