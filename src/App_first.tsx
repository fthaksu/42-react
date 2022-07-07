import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { postService } from './Services/Services';
import { IPost } from './models/IPost';
import { idText } from 'typescript';

function App_first() {
const [effectNumber, setEffectNumber] = useState(0);
const [postArr, setPostArr] = useState<IPost[]>([]);
const [status, setStatus] = useState(true);

useEffect( () => {
  postService("").then(res => {
    setStatus(false);
    const postItems: IPost[] = res.data.map( (val:any): IPost => ({
      author: val.author,
      id: val.id,
      title: val.title
    }));

    setTimeout( function() {
      console.log("Time out");
      setStatus(true);
    },3000 );

    setPostArr(postItems);
  })
},[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {status ? (postArr.map( (val:IPost)  => 
        <div>
          <p>ID : {val.id} </p>
          <p>Author : {val.author} </p>
          <p>Title : {val.title} </p>
        </div> )) : 
        "Loading.."}
        <p>
          Edit <code>src/App.tsx</code> and save to reload - {effectNumber}.
        </p>
        <a href='#' onClick={ () => {setEffectNumber(effectNumber + 1)} }
        >
          Effect Number Arttır
        </a>
      </header>
    </div>
  );
}

