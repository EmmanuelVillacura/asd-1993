export interface ApiResponse<type>
{
    error:boolean;
    data:type[];
    message:string;
    innerExceptions?:string[];
    redirect?: string;
}