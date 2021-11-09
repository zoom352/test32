import axios from 'axios'




export default class PostService {
    static async getAlbumIds(){
        const response = await axios.get('http://jsonplaceholder.typicode.com/photos')
        return Array.from(new Set(response.data.map(p=>p.albumId)));
    }
    static async getAll(limit = 10, page = 1, filter ={}) {
        const params = Object.assign({
            _limit: limit,
            _page: page
        }, filter)
        const response = await axios.get('http://jsonplaceholder.typicode.com/photos', {
            params
        })
        return response;
    }
    static async getById(id) {
        const response = await axios.get('http://jsonplaceholder.typicode.com/photos/' + id)
        return response
    }
}