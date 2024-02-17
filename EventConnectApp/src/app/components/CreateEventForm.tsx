import { Button, Input, Textarea } from "@nextui-org/react";
import { useAppDispatch, useForm } from "../../hooks";
import { createEvent } from "../../store";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { PreviewEventCard } from ".";
import { Event, CreatedBy } from '../../types/types';
import { getFormattedDatetime } from "../../helpers/getFormattedDatetime";

const initilaState: Event = {
  id: 0,
  name: "",
  description: "",
  date: "",
  location: "",
  image: "",
  about: "",
  assistantsCount: 0,
  createdBy: {} as CreatedBy
};

interface CreateEventFormProps {
  setPreviewData: (data: PreviewEventCard) => void;
}

export const CreateEventForm:FC<CreateEventFormProps> = ({ setPreviewData }) => {

  const [imageFile, setImageFile] = useState<File>();

  const dispatch = useAppDispatch();

  const { name,description,date,location,about,onInputChange } = useForm<Event>(initilaState);

  const onInputChangeFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  }

  useEffect(() => {
    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setPreviewData({
        eventName: name,
        datetime: getFormattedDatetime(date),
        description,
        coverImg: imageURL
      });
      return () => URL.revokeObjectURL(imageURL);
    } else {
      setPreviewData({
        eventName: name,
        datetime: getFormattedDatetime(date),
        description,
        coverImg: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      });
    }
  }, [name, imageFile, date, description, setPreviewData]);
  
  const onSubmit = ( event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name); 
    formData.append("date", date);
    formData.append("location", location);
    formData.append("description", description);

    if (imageFile) {
      formData.append("image_data", imageFile);
    }

    formData.append("about", about);
    console.log(formData.forEach( (value, key) => console.log(key, value) ));
    dispatch( createEvent(formData) );
  }

  return (
    <form onSubmit={ onSubmit } >
      <div className="p-2">
        <Input
          className="p-2"
          type="text"
          label="Nombre del evento"
          isRequired

          name="name"
          value={name}
          onChange={ onInputChange }
        />
        <Textarea
          maxRows={3}
          className="p-2"
          label="Description"
          placeholder="Enter your description"
          isRequired

          name="description"
          value={ description }
          onChange={ onInputChange }
        />
        <Input 
          className="p-2" 
          isRequired type="datetime-local"
          
          name="date"
          value={ date }
          onChange={ onInputChange }
        />
        <Input 
          className="p-2" 
          type="url" 
          isRequired 
          label="URL del Evento"
          
          name="location"
          value={ location }
          onChange={ onInputChange }
        />
        <Input 
          className="p-2" 
          type="file"
          accept="image/jpeg, image/png, image/jpg" 
          isRequired
      
          onChange={ event => onInputChangeFile(event) }
        />
        <Textarea
          className="p-2"
          label="Sobre el evento"
          placeholder="Descripción sobre el evento, puedes poner todo lo necesario"
          isRequired

          name="about"
          value={ about }
          onChange={ onInputChange }
        />

        <div className="flex justify-between p-2">
          <Button 
            color="primary"
            type="submit"
          >
            Crear evento
          </Button>
        </div>

      </div>
    </form>
  );
};