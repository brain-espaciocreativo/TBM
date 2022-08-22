import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../redux/slices/userSlice';

export default function Home() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllUsers());
    },[dispatch]);

  return (
    <div>Home</div>
  )
}
