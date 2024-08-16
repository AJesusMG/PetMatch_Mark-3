import React, { useState, useRef, useEffect } from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CircularProgress } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

const AddComment = () => {
  const { user } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setImage(file);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulate loading time
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <Card className="p-4" radius="none" shadow="none">
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
              style={{ minHeight: 'auto' }}
            />
          </div>
        </div>
        {image && (
          <div className="mt-4 relative">
            {loading ? (
              <CircularProgress size="lg" />
            ) : (
              <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full max-w-md h-auto object-cover mx-auto" style={{ maxHeight: '300px' }} />
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
        <Button className="bg-success-300 text-md" radius="lg">Post</Button>
      </CardFooter>
    </Card>
  );
};

export default AddComment;
