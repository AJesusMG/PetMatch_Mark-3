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
  const currentDateUTC = new Date();

  // Offset en minutos para la zona horaria de México (restar 6 horas)
  const offset = -6 * 60;

  // Fecha y hora local en México restando el offset
  const currentDateLocal = new Date(currentDateUTC.getTime() + offset * 60000);

  // Convertir la fecha a formato ISO 8601
  const formattedDate = currentDateLocal.toISOString();

  try {
    let imgUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      // Primera solicitud para subir la imagen al bucket de AWS
      const uploadResponse = await fetch("/api/uploadImage/community", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        imgUrl = url;
        alert("Imagen subida correctamente. URL:" + url);
      } else {
        console.error("Error al subir la imagen. Estado:", uploadResponse.status);
        alert("Error al subir la imagen. Estado:" + uploadResponse);
        return false;
      }
    }

    // Segunda solicitud para enviar el comentario
    const postFormData = {
      text: commentText,
      imgUrl,
      userId,
      createdAt: formattedDate, // Utilizamos la fecha formateada
    };

    const postResponse = await fetch(parentId ? `/api/comments/children?id=${parentId}` : "/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postFormData),
    });

    if (postResponse.status === 200) {
      return true;
    } else {
      const errorData = await postResponse.json();
      console.error("Error al enviar el comentario. Estado:", postResponse.status, "Mensaje:", errorData.message);
      return false; // Devuelve false en caso de error
    }

  } catch (error) {
    console.error("Error al enviar el comentario:", error);
    return false;
  }
}

  
  
  
