import axios from 'axios'
import _ from 'lodash'
import config from '../config'

/**
 * @fileOverview rpc module provides a clean rpc interface for JSON-based
 * api with the server.
 */

// important for using with passport.js
// https://stackoverflow.com/questions/40941118/axios-wont-send-cookie-ajax-xhrfields-does-just-fine
axios.defaults.withCredentials = true

export default {

  rpcRun (fnName, ...args) {
    let payload = {fnName, args}
    console.log('>> rpc.rpcRun', payload)
    return axios.post(`${config.apiUrl}/api/rpc-run`, payload)
  },

  rpcUpload (fnName, files, ...args) {
    let formData = new FormData()
    formData.append('fnName', fnName)
    formData.append('args', JSON.stringify(args))
    _.each(files, f => {
      formData.append('uploadFiles', f, f.name)
    })
    console.log('>> rpc.rpcUpoad', fnName, args, _.map(files, 'name'))
    return axios.post(`${config.apiUrl}/api/rpc-upload`, formData)
  }

}
