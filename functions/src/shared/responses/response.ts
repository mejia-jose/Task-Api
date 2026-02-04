import { IMapResponse } from "./interfaces/response.interface";
export class MapResponse
{
    static ResultJson<T>(info: IMapResponse<T>)
    {
        const { type, messages, error, data } = info;
        const response: any = {
            success: type,
            messages: messages, 
        };

        if(data || error)
        {
            response.detail = { 
                error: error ?? null,
                data : data ?? [] 
            }
        }
        return response;
    }
}