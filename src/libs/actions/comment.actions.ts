import Compressor from "compressorjs";

// fetchChildrenComments.ts
export async function fetchChildrenComments(id: string) {
    try {
        const response = await fetch(`/api/comments/children?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resBody = await response.json();

        if (!response.ok) {
            throw new Error(resBody.message || "Error fetching comments");
        }

        return resBody.data; // Asegúrate de que esto devuelva el comentario principal y sus childrenComments
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

export async function sendComment(
    commentText: string,
    image: File | null,
    userId: string,
    parentId?: string
  ): Promise<boolean> {
    try {
      let imgUrl = "";

      // alert("Enviando comentario...");
  
      if (image) {

        new Compressor(image, {
          quality: 0.2,
          async success(result) {
            const formData = new FormData();

            formData.append("image", result);

            const uploadResponse = await fetch("/api/uploadImage/community", {
              method: "POST",
              body: formData,
            });

            if (uploadResponse.ok) {
              const { url } = await uploadResponse.json();
              imgUrl = url;
              console.log("Imagen subida correctamente. URL:", url);
              // alert("Imagen subida correctamente. URL:" + url);
            } else {
              const response = await uploadResponse.json().catch(() => ({
                message: "Error al subir la imagen.",
              }));
              // alert(response.message);
              return false;
            }
            
          },
          error(err) {
            alert(err.message);
            console.error(err);
          },
        })
        

        // const formData = new FormData();
        // formData.append("image", image);


        // alert("Subiendo imagen...");
  
        // // Primera solicitud para subir la imagen al bucket de AWS
        // const uploadResponse = await fetch("/api/uploadImage/community", {
        //   method: "POST",
        //   body: formData,
        // });



        // alert("uploadResponse acabo");

        // alert(uploadResponse.status);
        // return false;
        // if (!uploadResponse.ok) {
        //   alert("no se pudo subir la imagen");
        //   const response = await uploadResponse.json().catch(() => ({
        //     message: "Error al subir la imagen.",
        //   }));
        //   alert(response.message);
        //   return false;
        // }
  
        

        // if (uploadResponse.ok) {
        //   const { url } = await uploadResponse.json();
        //   imgUrl = url;
        //   console.log("Imagen subida correctamente. URL:", url);
        //   alert("Imagen subida correctamente. URL:" + url);
        // } else {
        //   console.error("Error al subir la imagen. Estado:", uploadResponse.status);
        //   alert("Error al subir la imagen. Estado:");
        //   return false;
        // }
      }

      alert("Comentario enviado correctamente.");
  
      // Segunda solicitud para enviar el comentario
      const postFormData = {
        text: commentText,
        imgUrl,
        userId,
      };
  
      const postResponse = await fetch(parentId ? `/api/comments/children?id=${parentId}` : "/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postFormData),
      });
  
      if (postResponse.ok) {
        console.log("Comentario enviado correctamente.");
        return true;
      } else {
        console.error("Error al enviar el comentario. Estado:", postResponse.status);
        return false;
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      return false;
    }
  }
  
  
  
