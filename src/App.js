import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import PostService from './api/PostService'
import Posts from './post/posts';
import { Route, Routes } from 'react-router-dom';
import ModalContainer from './modal/modalContainer';
import { useNavigate } from 'react-router-dom';
import { getPageCount, getPagesArray } from './utils/pages';
import { useFetching } from './hooks/useFetching';
import MySelect from './mySelect/MySelect';

const App = () => {
  
  // const router = useNavigate()
  // console.log(router)
  const [selectedSort, setSelectedSort] = useState('')
  const [photo, setPhoto] = useState([])
  const [modalActive, setModalActive] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [albumId, setAlbumId] = useState([]) 
  const [selectedAlbumIds, setSelectedAlbumIds] = useState([]) 
  
  const lastElement = useRef()
  const observer = useRef()
  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading] = useFetching(async (selectedLimit, selectedPage, filter) => {
    const response = await PostService.getAll(selectedLimit, selectedPage, filter)
      setPhoto([...photo, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
  })
  
  useEffect(async ()=>{
    setAlbumId(await PostService.getAlbumIds())
  },[])

  useEffect(() => {
  if(isPostsLoading) return;
  if(observer.current) observer.current.disconnect()
  var callback = function(entries, observer) {
    if(entries[0].isIntersecting && page < totalPages){
      // console.log(page)
      setPage(page + 1)
      // console.log('its work')
    }
  };

  observer.current = new IntersectionObserver(callback); 
  observer.current.observe(lastElement.current) 
  }, [isPostsLoading])


  useEffect(() => {

    fetchPosts(limit, page, selectedAlbumIds.length &&{albumId:selectedAlbumIds})
  }, [page])

  useEffect(() => {
    setPhoto([])

    fetchPosts(limit, page, selectedAlbumIds.length &&{albumId:selectedAlbumIds})
  }, [selectedAlbumIds])

  const removePosts = (id) => {
    const newPhoto = photo.filter((phot) => phot.id !== id)
    setPhoto(newPhoto)
  }

  const changePage = (page) => {
    setPage(page)
    // fetchPosts(limit, page)
  }

  const openModal = (id) => {
    console.log(id)
    setModalActive(true)
  }


  const sortPosts = (albumId) => {
    setSelectedSort(albumId)
    console.log(albumId)
    setPhoto(photo.sort((a, b) => console.log(a.albumId - b.albumId)))
  }

  // response.sort((a, b) => a.albumId - b.albumId)
  console.log(photo)
  return (

    <div className="App">
      <MySelect
        value={selectedSort}
        onSort={sortPosts}
        onSelect={(selected)=>{setSelectedAlbumIds(selected)}}
        options={albumId}/>
      <Routes>
        <Route exact path='/:id' element={<ModalContainer
          photo={photo}
          active={modalActive}
          setActive={setModalActive}
        />} />
        <Route exact path='/' element={<Posts
          lastElement={lastElement}
          changePage={changePage}
          setPage={setPage}
          page={page}
          openModal={openModal}
          removePosts={removePosts}
          photo={photo} 
          pagesArray={pagesArray}/>} />
      </Routes>
    </div>
  );
}


export default App;
