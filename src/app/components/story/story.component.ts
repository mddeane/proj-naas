import { MessageService } from './../../services/message.service';
import { StoryService } from './../../services/story.service';
import { STORIES } from './../../shared/stories';
import { Story } from './../../models/story.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  stories: Story[] = [];  // array of Story objects which holds Stories from Observable 
  selectedStory: Story = new Story(0, "", "", 0, false);  // variable will hold the story being viewed

  saveIsDisabled: boolean = true; // disables the save button
  redoIsDisabled: boolean = true; // disables the redo button
  undoIsDisabled: boolean = true; // disables the undo button
  approvalStatus: boolean = false;  // toggles the approval status of the script 
  // this may be changed to hold states, such as "empty (gray)", "working (yellow)", "marked for approval (blue)", "approved (green)" 

  constructor(private storyService: StoryService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStories();
    this.selectedStory = this.stories[2];
  }

  getStories(): void {
    this.storyService.getStories().subscribe(storyData => this.stories = storyData);
  }

  scriptVersions: string[] = [this.selectedStory.storyScript];
  currentVersion: number = 0;
  undoVersion: number = 1;

  savedScriptVersions: string[] = [this.selectedStory.storyScript];

  onEachInput(previousVersion: string) {
    this.approvalStatus = false;
    this.currentVersion = this.scriptVersions.length;
    this.scriptVersions.push(previousVersion);
    this.currentVersion++;
    this.enableButtons();
    console.log(this.scriptVersions[(this.scriptVersions.length - 1)]);
  }

  saveChanges() {
    this.saveIsDisabled = true;
    if (this.selectedStory.storyScript !== this.savedScriptVersions[this.savedScriptVersions.length - 1]) {
      this.savedScriptVersions.push(this.selectedStory.storyScript);
    } else {
      console.log("This version is the same as the last saved version.")
    }
  }

  undoScript() {
    if (this.currentVersion > 0) {
      this.enableButtons();
      --this.currentVersion;
      this.selectedStory.storyScript = this.scriptVersions[this.currentVersion];
    } else {
      this.undoIsDisabled = true;
    }
  }

  redoScript() {
    if (this.currentVersion < (this.scriptVersions.length - 1)) {
      // this.redoIsDisabled = false;
      // this.undoIsDisabled = false;
      this.enableButtons();
      ++this.currentVersion;
      this.selectedStory.storyScript = this.scriptVersions[this.currentVersion];
    } else {
      this.redoIsDisabled = true;
    }
  }

  createScriptVersion(newScriptVersion: string) {
    this.selectedStory.storyScript = newScriptVersion;
    //    this.savedScriptVersions.push(newScriptVersion);
  }

  noScriptUnapprove(story: Story): boolean {
    let result: boolean = false;
    if ((!story.storyScript && story.storyApproval) || !story.storyApproval) {
      story.storyApproval = false;
      result = false;
    } else {
      result = true;
    }
    return result;
  }

  enableButtons() {
    this.saveIsDisabled = false;
    this.undoIsDisabled = false;
    this.redoIsDisabled = false;
  }

  checkApproval(story: Story): string {
    if (story.storyScript && story.storyScript === this.savedScriptVersions[this.savedScriptVersions.length - 1]) {
      this.approvalStatus = story.storyApproval;
    } else {
      this.approvalStatus = false;
      story.storyApproval = false;
    }

    let returnClass: string = "fill-secondary";

    if (story.storyScript && this.approvalStatus) {
      returnClass = "fill-success";
    } else if (story.storyScript && !this.approvalStatus) {
      returnClass = "fill-warning";
    }
    return returnClass;
  }
}
