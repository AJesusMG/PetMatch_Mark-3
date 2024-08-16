import React, { useState, useRef, useEffect } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CircularProgress } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import getUserId from "@/libs/actions/user.actions";

const AddPost = () => {
  const { user } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Obtenemos el userId basado en el email
      const userId = await getUserId(user?.primaryEmailAddress?.emailAddress || "");

      if (image && userId) {
        const formData = new FormData();
        formData.append("image", image);

        // Primera solicitud para subir la imagen al bucket de AWS
        const uploadResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json();
          console.log("Imagen subida correctamente. URL:", url);

          // Segunda solicitud para enviar el comentario
          const postFormData = {
            text: commentText,
            imgUrl: url,
            userId,
          };

          const postResponse = await fetch("/api/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postFormData),
          });

          if (postResponse.ok) {
            console.log("Comentario enviado correctamente.");
          } else {
            console.error("Error al enviar el comentario. Estado:", postResponse.status);
          }
        } else {
          console.error("Error al subir la imagen. Estado:", uploadResponse.status);
        }
      } else {
        console.error("No se pudo obtener el userId o la imagen es nula.");
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4" radius="none" shadow="none">
      <form onSubmit={handleSubmit}>
        <CardBody>
          <div className="flex flex-row gap-4 items-center">
            <Avatar src={user?.imageUrl} size="lg" />
            <div className="flex-grow relative">
              <textarea
                ref={textareaRef}
                placeholder="Pregunta algo a la comunidad"
                className="w-full p-2 bg-transparent border-none outline-none resize-none overflow-hidden"
                maxLength={300}
                rows={1}
                onInput={adjustTextareaHeight}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
          </div>
          {imageUrl && (
            <div className="mt-4 relative">
              {loading ? (
                <CircularProgress size="lg" />
              ) : (
                <img src={imageUrl} alt="Uploaded" className="w-full max-w-md h-auto object-cover mx-auto" style={{ maxHeight: '300px' }} />
              )}
            </div>
          )}
        </CardBody>
        <CardFooter className="w-full flex justify-between items-center">
          <Button isIconOnly className="bg-transparent p-0">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="material-symbols-outlined">image</span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </Button>
          <Button className="bg-success-300 text-md" radius="lg" type="submit" disabled={loading}>
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPost;
