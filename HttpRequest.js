import { METHOD } from "./choice.js"
import popupManager from "./popup.js"

class HttpRequest{


    #AcceptedMethod = [METHOD.POST, METHOD.GET, METHOD.DELETE, METHOD.PUT, METHOD.PATCH]

    constructor(){
        
    }



    #error(content){
        const popup = new popupManager()
        popup.toggle(false, content)
        return {
            success:false,
        }
    }

    async call(url, method = METHOD.GET, body = null){
        if(!this.#AcceptedMethod.find(acceptedMethod => method === acceptedMethod)){
            return this.#error(`La méthode utiliser n'est pas reconnu (${method})`)
        }else{
            let detail = null
            if(method === METHOD.POST){
                if(!body){
                    return this.#error(`Il manque le payload pour la méthode ${method}`)
                }else{
                    detail = {
                        method:METHOD.POST,
                        headers:{
                            "Content-type":"application/json"
                        },
                        body:JSON.stringify(body)
                    }
                }
            }
            const response = await fetch(url, detail)
            const data = await response.json()
            return {
                success:true,
                data:data
            }
        }
    }
}

export default HttpRequest