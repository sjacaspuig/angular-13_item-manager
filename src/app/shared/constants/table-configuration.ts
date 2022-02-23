import { TableConfiguration } from "src/app/shared/models/table-configuration.interface";

export const TABLE_CONFIGURATION: TableConfiguration[] = [
    {id: 'title', title: 'Title', type: 'text'},
    {id: 'description', title: 'Description', type: 'text'},
    {id: 'price', title: 'Price', type: 'number', textToAdd: '€'},
    {id: 'email', title: 'Contact',type: 'text'},
    {id: 'image', title: 'Photo', type: 'img'},
  ]