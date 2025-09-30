import axios  from "axios";
import { API_BASE_URL, IP } from '@env'

const base_url = API_BASE_URL || `http://${IP}/api/repositories`

const getAllRepositories = async() => {

    const request = await axios.get(base_url);
    return request.data
}

export default {getAllRepositories};