import React, { useState, useRef, useEffect } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CircularProgress } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { sendComment } from "@/libs/actions/comment.actions";
import { getUserStatus } from "@/libs/actions/user.actions";

interface AddPostProps {
  onPostAdded: () => void;
  parentId?: string; // Añade esta prop opcional
}

const AddPost: React.FC<AddPostProps> = ({ onPostAdded, parentId }) => {
  const { user } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageValue, setimageValue] = useState()
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        const userStatus = await getUserStatus(user.primaryEmailAddress.emailAddress);
        if (userStatus) {
          setUserId(userStatus.id);
          setPhotoUrl(userStatus.photoUrl || null);
        }
      }
    };

    fetchUserStatus();
  }, [user]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];



    if (file) {
      setLoading(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Limit to 8MB
        if (file.size > 8 * 1024 * 1024 || !file.type.startsWith("image/")) {
          alert("El archivo debe ser una imagen y no superar los 8MB.");
          setImage(null);
          setLoading(false);
          event.target.value = ""
          return;
        }
        setImageUrl(reader.result as string);
        setLoading(false);
        console.log(file);
      };
      reader.readAsDataURL(file);
      event.target.value = ""
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userId) {

        const success = await sendComment(commentText, image, userId, parentId);

        if (success) {
          setCommentText("");
          setImage(null);
          setImageUrl(null);
          onPostAdded();
        }
      } else {
        console.error("No se pudo obtener el userId.");
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
            <Avatar src={photoUrl || user?.imageUrl} size="lg" />
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
          <div>
            <Button isIconOnly className="bg-transparent p-0 relative cursor-auto">
              <label htmlFor="file-upload" className="">
                <span className="material-symbols-outlined cursor-pointer">image</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden m-0 h-14 hover:cursor-pointer absolute top-0 left-0 w-14"
                disabled={loading}


                
                
                onChange={handleImageUpload}
              />
            </Button>
            {/* <p className="text-sm">(Imagenes no mayor a 8MB)</p> */}
          </div>
          <Button
            className={`bg-primary-500 text-md radius-lg font-bold text-white rounded-full ${!commentText ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading || !commentText}
          >
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPost;
