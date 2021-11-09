import { Link } from 'react-router-dom';
import s from './post.module.css'
import { useNavigate } from 'react-router-dom';


const Post = ({
    pagesArray,
    openModal,
    active,
    setActive,
    phot,
    title,
    thumbnailUrl,
    url,
    id,
    removePosts,
    
}) => {

    const router = useNavigate()
    


    return <div>
    <div className={s.main}>
        <h1>{id}</h1>
        <p>{title}</p>
        <img src={thumbnailUrl} className={s.image} />
        <button onClick={() => removePosts(phot.id)} className={s.btn}>delete</button>
            {/* <button className={s.btn1} onClick={() => openModal(phot.id)}>open</button> */}
            <button className={s.btn1} onClick={() => router(`/${phot.id}`)}>open</button>
    </div>
    
        
    </div>
}


export default Post;