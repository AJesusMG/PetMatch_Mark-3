import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Page = async ({params}:{params:{id:string}}) => {
    if(!params) return null

    const user = await currentUser()
    if(!user) return null


    return(
        <section className="relative">
            <div className="">
                
            </div>
            
        </section>
    )
    
  
}

export default Page