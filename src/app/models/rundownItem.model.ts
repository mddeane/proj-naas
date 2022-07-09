import { Story } from "./story.model";

export class RundownItem {
    itemPageNumber: number;
    itemStory: Story;


    constructor(itemPageNumber: number, itemStory: Story) {
        this.itemPageNumber = itemPageNumber;
        this.itemStory = itemStory;
    }
}