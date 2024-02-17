import { Button, Input, Textarea } from "@nextui-org/react";
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { deleteEvent, editEvent } from "../../store";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { PreviewEventCard } from ".";
import { Event } from "../../types/types";


interface EditEventFormProps {
  event: Event;
  setPreviewData: (data: PreviewEventCard) => void;
}

export const EditEventForm:FC<EditEventFormProps> = ({ event, setPreviewData }) => {

  const [imageFile, setImageFile] = useState<File>();

  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();

  const { 
    name,
    description,
    date,
    location: url,
    about,
    onInputChange,
   } = useForm<Event>(event);

  const onInputChangeFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  }

  const isUserEvent = event?.createdBy.id === user?.id;

  useEffect(() => {
    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setPreviewData({
        eventName: name,
        datetime: date,
        description,
        coverImg: imageURL
      });
      return () => URL.revokeObjectURL(imageURL);
    } else {
      setPreviewData({
        eventName: name,
        datetime: date,
        description,
        coverImg: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      });
    }
  }, [name, imageFile, date, description, setPreviewData]);

  const onDeleteClick = () => {
    dispatch( deleteEvent( event.id ) );
  }
  
  const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const formData = new FormData();

    const formFields = {
      name,
      date,
      location: url,
      description,
      about
    };

    Object.entries(formFields).forEach(( [fieldName, fieldValue] ) => {
      if (fieldValue !== '' && fieldValue !== event[fieldName as keyof Event]) {
        formData.append(fieldName, fieldValue);
      }
    });

    if (imageFile) {
      formData.append("image_data", imageFile);
    }

    console.log(formData.forEach( (value, key) => console.log(key, value) ));
    dispatch( editEvent({ eventId: event.id, formData}) );
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
          
          name="url"
          value={ url }
          onChange={ onInputChange }
        />
        <Input 
          className="p-2" 
          type="file"
          accept="image/jpeg, image/png, image/jpg"  
      
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
          { isUserEvent && (
            <Button 
              className="" 
              color="danger"
              onClick={ onDeleteClick }
            >
              Eliminar
            </Button>
          )}
        </div>

      </div>
    </form>
  );
};