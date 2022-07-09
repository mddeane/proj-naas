export class Story {
    storyId: number;
    storySlug: string;
    storyScript: string;
    storyEstTime: number; // seconds
    storyApproval: boolean;

    constructor(storyId: number,
        storySlug: string,
        storyScript: string,
        storyEstTime: number,
        storyApproval: boolean
    ) {
        this.storyId = storyId;
        this.storySlug = storySlug;
        this.storyScript = storyScript;
        this.storyEstTime = storyEstTime;
        this.storyApproval = storyApproval;
    }
}