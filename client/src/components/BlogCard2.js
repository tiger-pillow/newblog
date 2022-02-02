import React, { useEffect, useState } from 'react';
import GridSystem from './gridSystem';
import { Card, Button } from 'react-bootstrap';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './components.css'
import axios from 'axios';

const BlogCard = () => {
  const [items, setItems] = useState([]);
  console.log("original items is", items);

  useEffect(() => { // get the list of cards to Items
    axios.get("http://localhost:4000/getAllBlogs")
      .then((response) => {
        setItems(response.data)
        console.log("useEffect setup", items);
      })
      .catch(() => {
        console.log('ERR inside useEffect');
      });
  }, []); 


  // setListOfFriends(
  //   listOfFriends.map((val) => {
  //     return val._id == id ? { _id: id, name: val.name, age: newAge } : val;
  //   })
  // );

  const upVote = (id) => {
    console.log("inside upVote function", id);
    axios.put('http://localhost:4000/incrementUpvote', { id: id })
      .then(()=>{
        setItems(
          items.map((item) => {
            if (item._id == id){
              item.upvotes = item.upvotes + 1; 
              return item;
            }
            else {
              return item;
            }
            //return item._id == id ? {_id:id, comments: item.comments, upvotes: item.upvotes+1 }: item
          })
        )
      })
      .catch(()=>{
        console.log("Upvote error ");
      })
      
  }

  const makeCard = (item) => {
    console.log("inside makeCard, item is", item);
    //setUpvotes(item.upvotes)
    return(
      <Card className='Card' key={item._id}>
        <Card.Header as="h5">{item.name}</Card.Header>
        <Card.Body>
          <Card.Text>
            by: {item.author} <br></br>
            comments: <ul> {item.comments.map(oneComment => <li> {oneComment}</li>
            )} </ul>
            upvotes: {item.upvotes}
          </Card.Text>
          <br></br>
          <Button onClick={() => { upVote(item._id) }}> <ThumbUpIcon /> Like! </Button>
        </Card.Body>
      </Card>
    )
  }

  return (
      <div>
        <GridSystem colCount={3} md={4}>
          {
            items.map((item) => {return makeCard(item)})
          }
        </GridSystem>
      </div>
  )
}

export default BlogCard; 

