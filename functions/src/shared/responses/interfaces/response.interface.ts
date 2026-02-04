/** Se define la interfaz, para el tipo de responses de los casos de uso **/
export interface IMapResponse<T>
{
 type:boolean;
 messages: string;
 error?: string | string[];
 data?: T | T[] ;
}