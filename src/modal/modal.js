import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import PostService from '../api/PostService'
import { useFetching } from '../hooks/useFetching'
import './modal.css'

const Modal = ({ url, active, setActive }) => {

    const params = useParams()
    const [post, setPost] = useState({})
    const [fetchPostById] = useFetching(async(id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
    }, [])

    


    console.log(post)
    return <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(true)}>
        <div className='modal__content' onClick={e => e.stopPropagation()}>
            <Link to='/'>
                <button>close</button>
            </Link>
            <img className='image' src={post.url} />
            
        </div>
    </div>
}

{/* <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(true)}> */}
export default Modal