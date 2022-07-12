import { GfxLowerThird } from './../models/gfxLowerThird.model';
import { STORIES } from './stories';
import { RundownItem } from './../models/rundownItem.model';
import { GfxFullScreen } from '../models/gfxFullScreen.model';
import { Story } from '../models/story.model';

export const RUNDOWN_ITEMS: RundownItem[] = [
    new RundownItem(
        STORIES[0],
        "STORY",
        [
            new GfxLowerThird(111, "First Name", "Title")
        ]
    ),
    new RundownItem(
        STORIES[1],
        "STORY",
        [
            new GfxLowerThird(222, "John Doe", "Man"),
            new GfxLowerThird(223, "Jane Doe", "Woman")
        ]
    ),
    new RundownItem(
        STORIES[2],
        "STORY",
        []
    ),
    new RundownItem(
        STORIES[3],
        "BREAK",
        []
    ),
    new RundownItem(
        STORIES[4],
        "STORY",
        [
            new GfxLowerThird(333, "Chief Bill Davis", "City Police Department")
        ]
    ),
    new RundownItem(
        STORIES[5],
        "STORY",
        [
            new GfxLowerThird(444, "Mayor Mary Johnson", "City"),
            new GfxFullScreen(
                555,
                "Title",
                "Subtitle",
                [
                    "FS Line 1", "FS Line 2", "FS Line 3", "FS Line 4"
                ]
            )
        ]
    ),
    new RundownItem(
        new Story(8888, "BREAK TWO", "", "3:00", 180000, false),
        "BREAK",
        []
    )
]