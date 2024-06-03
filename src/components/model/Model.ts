import { IModel } from "../../types";
import { IEvents } from "../base/events";
export abstract class Model implements IModel {
    events: IEvents;
    constructor(events: IEvents) {
        this.events = events;
    }
}