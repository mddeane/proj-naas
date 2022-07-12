export class Story {
    storyId: number;
    storySlug: string;
    storyScript: string;
    storyEstTime: string;               // time in string form
    storyEstTimeMilliseconds: number;   // milliseconds
    storyApproval: boolean;

    constructor(storyId: number,
        storySlug: string,
        storyScript: string,
        storyEstTime: string,
        storyEstTimeMilliseconds: number,
        storyApproval: boolean
    ) {
        this.storyId = storyId;
        this.storySlug = storySlug;
        this.storyScript = storyScript;
        this.storyEstTime = storyEstTime;
        this.storyEstTimeMilliseconds = storyEstTimeMilliseconds;
        this.storyApproval = storyApproval;
    }
}