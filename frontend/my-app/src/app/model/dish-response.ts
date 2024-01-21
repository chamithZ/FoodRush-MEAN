import {dish} from './dish.model';

export interface DishResponse{
    message:string;
    data: dish[];
}