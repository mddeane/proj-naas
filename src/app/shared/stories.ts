import { Story } from "../models/story.model";

export const STORIES: Story[] = [
    new Story(1111, "Story A1 Slug", "These are the words in the body of Story A1.", "0:30", 30000, false),
    new Story(2222, "Story A2 Slug", "These are the words in the body of Story A2.", "0:20", 20000, true),
    new Story(3333, "Story A3 Slug", "These are the words in the body of Story A3.", "1:30", 90000, false),
    new Story(4444, "BREAK ONE", "", "3:00", 180000, false),
    new Story(5555, "Story B1 Slug", "These are the words in the body of Story B1.", ":50", 50000, false),
    new Story(6666, "Story B2 Slug", "These are the words in the body of Story B2.", "2:00", 120000, false)
];