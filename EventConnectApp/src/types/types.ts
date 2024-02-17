export interface Event {
  "id": number;
  "name": string;
  "date": string;
  "location": string;
  "description": string;
  "image": string;
  "about": string;
  "assistantsCount": number;
  "createdBy": CreatedBy;
}

export interface EventsWithPagination {
  "count": number;
  "next": string | null;
  "previous": string | null;
  "results": Event[];
}

export interface CreatedBy {
  id: number;
  first_name: string;
  last_name: string;
}