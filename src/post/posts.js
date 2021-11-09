import Post from "./post"
import './posts.css'

const Posts = ({
    openModal,
    removePosts,
    photo,
    pagesArray,
    page,
    setPage,
    changePage,
    lastElement
}) => {

 
    return <div>
        {photo.map(phot =>
          <Post
            pagesArray={pagesArray}
            openModal={openModal}
            phot={phot}
            removePosts={removePosts}
            title={phot.title}
            url={phot.url}
            thumbnailUrl={phot.thumbnailUrl}
            id={phot.id} />)}
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {pagesArray.map(p => 
            <button onClick={() => changePage(p)} key={p} className={page === p ?'page__current' : 'page'}>{p}</button>
        )}
    </div>
}


export default Posts