import { AlertService } from './../../services/alert.service';
import { MessageService } from './../../services/message.service';
import { StoryService } from './../../services/story.service';
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

  constructor(private storyService: StoryService, public alertService: AlertService) { }

  ngOnInit(): void {
    this.getStories();
    this.selectedStory = this.stories[2];
    this.savedScriptVersions.push(this.selectedStory.storyScript);
  }

  getStories(): void {
    this.storyService.getStories().subscribe(storyData => this.stories = storyData);
  }

  scriptVersions: string[] = [this.selectedStory.storyScript];
  currentVersion: number = 0;
  undoVersion: number = 1;

  savedScriptVersions: string[] = [];

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
      this.alertService.showAlert("Script saved.");
      console.log("savedVersion: " + (this.selectedStory.storyScript));
      // } else {
      //   this.alertService.showAlert("This version is the same as the last saved version.", "warning");
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

  // this is not working correctly
  //  createScriptVersion(newScriptVersion: string) {
  createScriptVersion(index: number) {
    //this.selectedStory.storyScript = newScriptVersion;
    this.selectedStory.storyScript = this.savedScriptVersions[index];
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

  onApproval(): void {
    this.selectedStory.storyApproval = !this.selectedStory.storyApproval;
    this.saveChanges();
    this.checkApproval(this.selectedStory);
    if (this.selectedStory.storyApproval) {
      this.alertService.showAlert("Story approved.", "success");
    } else {
      this.alertService.showAlert("Story unapproved.", "warning");
    }
  }
}
