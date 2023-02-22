import instance from "axios";

const axios = instance.create({
  baseURL: 'http://localhost:5000'
})

export default axios


