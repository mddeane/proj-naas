import { Graphic } from './graphic.model';
import { Story } from "./story.model";

export class RundownItem {
    itemStory: Story;
    itemType: string;
    itemGraphics: Graphic[];


    constructor(itemStory: Story, itemType: string, itemGraphics: Graphic[]) {

        this.itemStory = itemStory;
        this.itemType = itemType;
        this.itemGraphics = itemGraphics;

    }
}