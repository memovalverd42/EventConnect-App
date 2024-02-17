import { CreatedBy } from "../../types/types";

export interface EventResponse {
  "id": number;
  "name": string;
  "date": string;
  "location": string;
  "description": string;
  "image": string;
  "about": string;
  "assistants_count": number;
  "created_by": CreatedBy;
}

export interface EventsWithPaginationResponse {
  "count": number;
  "next": string;
  "previous": string;
  "results": EventResponse[];
}